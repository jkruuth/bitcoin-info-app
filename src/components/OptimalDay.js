import { countStreak } from "./DownwardTrend"

const OptimalDay = ({ fetchedData, getDayMonthYear }) => {

    let tempObj = {
        prices: [],
        date: []
    }

    for (let i = 0; i < fetchedData.prices.length; i++) {
        tempObj.prices.push(fetchedData.prices[i][1])
        tempObj.date.push(fetchedData.prices[i][0])
    }

    console.log(tempObj)
    let highestPrice = tempObj.prices[0]
    let lowestPrice = tempObj.prices[0]

    let highestDay = tempObj.date[0]
    let lowestDay = tempObj.date[0]


    for (let i = 1; i < tempObj.prices.length; i++) {
        if (tempObj.prices[i] < lowestPrice) { 
            lowestPrice = tempObj.prices[i]
            lowestDay = tempObj.date[i]
        }
    }
    
    for (let i = tempObj.prices.indexOf(lowestPrice); i < tempObj.prices.length; i++) {
        if (tempObj.prices[i] > highestPrice) {
            highestPrice = tempObj.prices[i]
            highestDay = tempObj.date[i]
        } 
    }

    

    const streak = countStreak(fetchedData)

    const showData = streak === fetchedData.prices.length 
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