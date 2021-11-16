import { useState } from "react";
import axios from "axios"

const App = () => {
  

  const [data, setData] = useState([])
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const oneHour = 3600

    const fromQuery = new Date(fromDate).getTime() / 1000
    const toQuery = new Date(toDate).getTime() / 1000

    if (!fromDate || !toDate) {
      
      setFromDate('')
      setToDate('')
      return
    }

    const fetchData = async () => {
      const res = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${fromQuery}&to=${toQuery + oneHour}`)

      const { data } = res
      
      setData(data)
      console.log(data)
      
      console.log(fromQuery)
      console.log(toQuery)
      setFromDate('')
      setToDate('')
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
    </div>
  );
}

export default App;
