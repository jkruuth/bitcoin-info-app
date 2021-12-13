import { countStreak } from "./DownwardTrend"

/*
    Component finds optimal days to buy and sell bitcoin based on days price
*/
const OptimalDay = ({ fetchedData, getDayMonthYear }) => {

    const minValue = fetchedData.prices.reduce((prev, current) => (prev[1] < current[1]) ? prev : current)

    //let lowestPrice = minValue[1]
    const lowestDay = minValue[0]

    const tempLength = fetchedData.prices.filter(elem => elem[0] > lowestDay).length

    const maxValue = (tempLength > 0) ? fetchedData.prices
    .filter(elem => elem[0] > lowestDay)
    .reduce((prev, current) => (prev[1] > current[1]) ? prev : current) : minValue

    //let highestPrice = maxValue[1]
    const highestDay = maxValue[0]

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