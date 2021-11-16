import { useState } from "react";
import axios from "axios"

const App = () => {
  

  const [data, setData] = useState([])
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  
  const handleSubmit = (event) => {
    event.preventDefault()

    const fromQuery = new Date(fromDate).getTime() / 1000
    const toQuery = new Date(toDate).getTime() / 1000

    if (!fromDate || !toDate) {
      
      setFromDate('')
      setToDate('')
      return
    }

    const fetchData = async () => {
      const res = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${fromQuery}&to=${toQuery}`)

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
      <form onSubmit={handleSubmit}>
        <div>
          from
          <input 
            value={fromDate} 
            onChange = {({ target }) => setFromDate(target.value)} 
          />
          to
          <input 
            value={toDate} 
            onChange = {({ target }) => setToDate(target.value)} 
          />
        </div>
        <button type='submit'>search</button>
      </form>
    </div>
  );
}

export default App;
