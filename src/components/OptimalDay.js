import { countStreak } from "./DownwardTrend"

/*
    Component finds optimal days to buy and sell bitcoin based on days price
*/
const OptimalDay = ({ fetchedData, getDayMonthYear }) => {

    const minValue = fetchedData.prices.reduce((prev, current) => (prev[1] < current[1]) ? prev : current)
    console.log(minValue)

    let tempObj = {
        prices: [],
        date: []
    }

    fetchedData.prices.forEach(data => {
        tempObj.prices.push(data[1])
        tempObj.date.push(data[0])
    })

    console.log(tempObj)

    let lowestPrice = minValue[1]
    let lowestDay = minValue[0]
    
    let highestPrice = tempObj.prices.indexOf(lowestPrice)
    let highestDay = tempObj.date.indexOf(lowestDay)

    for (let i = tempObj.prices.indexOf(lowestPrice); i < tempObj.prices.length; i++) {
        if (tempObj.prices[i] > highestPrice) {
            highestPrice = tempObj.prices[i]
            highestDay = tempObj.date[i]
        } 
    }

    const streak = countStreak(fetchedData)
    console.log(streak)
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