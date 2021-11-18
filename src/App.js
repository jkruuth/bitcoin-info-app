import { useState } from "react";
import axios from "axios"

const BitcoinData = ({ fetchedData })  => {
  if (Object.keys(fetchedData).length === 0) return <p>No fetched data</p>

  if (Object.keys(fetchedData).length === 1) return <p>Not enough data</p>

  let streak = 1

  const tempArr = fetchedData.prices.slice(1)

  for (let i = 0; i < tempArr.length; i++) {
    if (tempArr[i][1] < fetchedData.prices[i][1]) streak++;
    else {
      streak = 0;
    }
  }

  const highestVolume = {
    date: fetchedData.total_volumes[0][0],
    price: fetchedData.total_volumes[0][1]
  }

  for (let i = 1; i < fetchedData.total_volumes.length; i++) {
    if (fetchedData.total_volumes[i][1] > highestVolume.price) {
      highestVolume.date = fetchedData.total_volumes[i][0]
      highestVolume.price = fetchedData.total_volumes[i][1]
    }
  }

  const getDayMonthYear = (timestamp) => {
    const date = new Date(timestamp)

    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
  }

  return (
    <div>
     <ul>
       {fetchedData.prices.map(item =>
         <li key={item[0]}>{getDayMonthYear(item[0])} - {item[1]} </li>)}
     </ul>
     <p>The maximum amount of days bitcoin´s price was decreasing in a row: {streak}</p>
     <p>The date with the highest trading volume and the volume on that day in euros: {getDayMonthYear(highestVolume.date)} - {highestVolume.price}e</p>
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

    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${fromQuery}&to=${toQuery + oneHour}`)

    const { data } = res
    
    let tempObj = {}

    Object.keys(data).forEach(key => tempObj[key] = data[key])

    console.log(tempObj)

    for (const property in data) {
      if (Array.isArray(tempObj[property])) {
        tempObj[property] = []
        for (let i = 0; i < data[property].length; i += 24) {
          tempObj[property].push(data[property][i])
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
    <div className="App">
      <h1>Bitcoin info app</h1>

      <h2>Enter the desired time interval </h2>
      
      <form onSubmit={handleSubmit}>
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
