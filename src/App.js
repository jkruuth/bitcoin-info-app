import { useState } from "react";
import axios from "axios"

const BitcoinData = ({ fetchedData })  => {
  if (Object.keys(fetchedData).length === 0) return <p>No fetched data</p>

  return (
    <ul>
      {fetchedData.prices.map(item =>
        <li key={item[0]}>{item[0]}</li>)}
    </ul>
  )
}


const App = () => {
  
  const [fetchedData, setFetchedData] = useState({})
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')


  /* function editData (array) {
    let prices = []
    let market_caps = []
    let total_volumes = []

    for (let i = 0; i < data.prices.length; i+=24) {
      prices.push(array.prices[i])
      market_caps.push(array.market_caps[i])
      total_volumes.push(array.total_volumes[i])
    }

    setData({
      market_caps: market_caps,
      prices: prices,
      total_volumes: total_volumes
    })
  } */

  const fetchData = async () => {

    const oneHour = 3600

    const fromQuery = new Date(fromDate).getTime() / 1000
    const toQuery = new Date(toDate).getTime() / 1000

    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${fromQuery}&to=${toQuery + oneHour}`)

    const { data } = res
    
    let tempObj = {
      prices: [],
      market_caps: [],
      total_volumes: []
    }

    for (let i = 0; i < data.prices.length; i += 24) {
      tempObj.prices.push(data.prices[i])
      tempObj.market_caps.push(data.market_caps[i])
      tempObj.total_volumes.push(data.total_volumes[i])
    }

    console.log(tempObj)

    console.log(typeof fetchedData)
    console.log(typeof tempObj)

    setFetchedData(tempObj)


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

    console.log(fetchedData)
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
