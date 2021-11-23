import { useState } from "react";
import axios from "axios"
import DownwardTrend from "./components/DownwardTrend";
import HighestVolume from "./components/HighestVolume";
import OptimalDay from "./components/OptimalDay";
import "./App.css"

const BitcoinData = ({ fetchedData })  => {
  
  if (Object.keys(fetchedData).length === 0 || (fetchedData.prices.length === 1)) {
    return <p>Not enough fetched data</p>  
  } 

  const getDayMonthYear = (timestamp) => {
    const date = new Date(timestamp)

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  return (
    <div>
     <ul>
       {fetchedData.prices.map(item =>
         <li key={item[0]}>{getDayMonthYear(item[0])} - {item[1]} </li>)}
     </ul>
     <div className="content_wrapper">
      <DownwardTrend fetchedData={fetchedData}/>
      <HighestVolume fetchedData={fetchedData} getDayMonthYear={getDayMonthYear} />
      <OptimalDay fetchedData={fetchedData} getDayMonthYear={getDayMonthYear}/>
     </div>
    </div>
  )
}


const App = () => {
  
  const [fetchedData, setFetchedData] = useState({})
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const fetchData = async () => {

    const oneHour = 3600

    const fromQuery = new Date(fromDate).getTime() / 1000
    const toQuery = new Date(toDate).getTime() / 1000

    if (fromQuery > toQuery) {
      alert('"To" date can not be before "from" date')
      setFromDate('')
      setToDate('')
      return
    }

    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${fromQuery}&to=${toQuery + oneHour}`)

    const { data } = res
    
    console.log(data)

    let tempObj = {}

    Object.keys(data).forEach(key => tempObj[key] = data[key])

    console.log(tempObj)

    const timestampDifference = toQuery*1000 - fromQuery*1000
    const differenceInDays = timestampDifference / (1000 * 3600 * 24)
    
    if (differenceInDays < 2) {
      for (const property in data) {
        if (Array.isArray(tempObj[property])) {
          tempObj[property] = []
          tempObj[property].push(data[property][0])
          tempObj[property].push(data[property][24])
        }
      }
    } else if (differenceInDays >= 2 && differenceInDays <= 90) {
      for (const property in data) {
        if (Array.isArray(tempObj[property])) {
          tempObj[property] = []
          for (let i = 0; i < data[property].length; i += 24) {
            tempObj[property].push(data[property][i])
          }
        }
      }
    }

    setFetchedData(tempObj)

    console.log(tempObj)

    setFromDate('')
    setToDate('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!fromDate || !toDate) {
      setFromDate('')
      setToDate('')
      return
    }

    fetchData()
  }

  return (
    <div className="container">
      <h1>Bitcoin info app</h1>

      <h2>Enter the desired time interval </h2>
      
      <form onSubmit={handleSubmit} >
        <div>
          from
          <input
            type="date"
            value={fromDate}
            placeholder="YYYY-MM-DD"
            onChange = {({ target }) => setFromDate(target.value)} 
          />
          to
          <input 
            type="date"
            value={toDate}
            placeholder="YYYY-MM-DD"
            onChange = {({ target }) => setToDate(target.value)} 
          />
        </div>
        <button type='submit'>search</button>
      </form>

    <BitcoinData fetchedData={fetchedData} />

    </div>
  );
}

export default App;
