import { countStreak } from "./DownwardTrend"

const OptimalDay = ({ fetchedData, getDayMonthYear }) => {
    let highestPrice = fetchedData.prices[0][1]
    let lowestPrice = fetchedData.prices[0][1]

    let highestDay = fetchedData.prices[0][0]
    let lowestDay = fetchedData.prices[0][0]


    
    for (let i = 1; i < fetchedData.prices.length; i++) {
        if (fetchedData.prices[i][1] > highestPrice) {
            highestPrice = fetchedData.prices[i][1]
            highestDay = fetchedData.prices[i][0]
        } 
        if (fetchedData.prices[i][1] < lowestPrice) { 
            lowestPrice = fetchedData.prices[i][1]
            lowestDay = fetchedData.prices[i][0]
        }
    }

    const streak = countStreak(fetchedData)

    const showData = streak === fetchedData.prices.length 
        ? 'You should not buy nor sell on any day in given time interval' 
        : getDayMonthYear(lowestDay) + ' and ' + getDayMonthYear(highestDay)


    return (
        <div>
            <h3>A pair of days: The day to buy and the day to sell</h3>
            <p>{showData}</p>
        </div>
    )
}

export default OptimalDay