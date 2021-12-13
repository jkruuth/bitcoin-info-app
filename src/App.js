import { useState } from "react";
import axios from "axios"
import DownwardTrend from "./components/DownwardTrend";
import HighestVolume from "./components/HighestVolume";
import OptimalDay from "./components/OptimalDay";
import "./App.css"

/* 
  Initializes components with functionality. Component also checks 
*/
const BitcoinData = ({ fetchedData })  => {
  
  if (Object.keys(fetchedData).length === 0 || (fetchedData.prices.length === 1)) {
    return <p>Not enough fetched data</p>  
  } 

  /*
    Converts timestamp to valid (YYYY-MM-DD) format 
  */
  const getDayMonthYear = (timestamp) => {
    const date = new Date(timestamp)

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  return (
    <div>
     <div className="content_wrapper">
      <DownwardTrend fetchedData={fetchedData}/>
      <HighestVolume fetchedData={fetchedData} getDayMonthYear={getDayMonthYear} />
      <OptimalDay fetchedData={fetchedData} getDayMonthYear={getDayMonthYear}/>
     </div>
    </div>
  )
}

/*
  Initializes application. App() includes current states and passes them to components.
*/
const App = () => {
  
  const [fetchedData, setFetchedData] = useState({})
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  /*
    Fetches data from the API 
  */
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
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${fromQuery}&to=${toQuery + oneHour}`)
      const { data } =  res
    
      let tempObj = {}

      Object.keys(data).forEach(key => tempObj[key] = data[key])

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
    } catch (error) {
      console.log(error)
    }
    
    setFromDate('')
    setToDate('')
  }

  /*
    Function handles the user given input and updates the right states
  */
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
