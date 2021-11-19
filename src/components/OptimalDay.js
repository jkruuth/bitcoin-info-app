import { countStreak } from "./DownwardTrend"

const OptimalDay = ({ fetchedData }) => {
    let highestPrice = fetchedData.prices[0][1]
    let lowestPrice = fetchedData.prices[0][1]

    for (let i = 1; i < fetchedData.prices.length; i++) {
        if (fetchedData.prices[i][1] > highestPrice) highestPrice = fetchedData.prices[i][1]
        if (fetchedData.prices[i][1] < lowestPrice) lowestPrice = fetchedData.prices[i][1]
    }

    const streak = countStreak(fetchedData)

    const showData = streak === fetchedData.prices.length 
        ? 'You should not buy nor sell on any day in given time interval' 
        : highestPrice + ' and ' + lowestPrice


    return (
        <div>
            <h3>A pair of days: The day to buy and the day to sell</h3>
            <p>{showData}</p>
        </div>
    )
}

export default OptimalDay