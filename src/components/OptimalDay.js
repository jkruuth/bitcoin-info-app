import { countStreak } from "./DownwardTrend"

/*
    Component finds optimal days to buy and sell bitcoin based on days price
*/
const OptimalDay = ({ fetchedData, getDayMonthYear }) => {

    let tempObj = {
        prices: [],
        date: []
    }

    for (let i = 0; i < fetchedData.prices.length; i++) {
        tempObj.prices.push(fetchedData.prices[i][1])
        tempObj.date.push(fetchedData.prices[i][0])
    }

    let lowestPrice = tempObj.prices[0]
    let lowestDay = tempObj.date[0]


    for (let i = 1; i < tempObj.prices.length; i++) {
        if (tempObj.prices[i] < lowestPrice) { 
            lowestPrice = tempObj.prices[i]
            lowestDay = tempObj.date[i]
        }
    }
    
    let highestPrice = tempObj.prices.indexOf(lowestPrice)
    let highestDay = tempObj.date.indexOf(lowestDay)

    for (let i = tempObj.prices.indexOf(lowestPrice); i < tempObj.prices.length; i++) {
        if (tempObj.prices[i] > highestPrice) {
            highestPrice = tempObj.prices[i]
            highestDay = tempObj.date[i]
        } 
    }

    const streak = countStreak(fetchedData)
    const showData = streak === fetchedData.prices.length || lowestDay === highestDay
        ? 'You should not buy or sell on any given day' 
        : getDayMonthYear(lowestDay) + ' and ' + getDayMonthYear(highestDay)

    return (
        <div className="content">
            <h3>A pair of days: The day to buy and the day to sell</h3>
            <p>{showData}</p>
        </div>
    )
}

export default OptimalDay