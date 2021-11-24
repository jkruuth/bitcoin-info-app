/* 
    Component finds the date with highest trading volume from the user given date range
*/
const HighestVolume = ({ fetchedData, getDayMonthYear }) => {
    const highestTradingVol = {
        date: fetchedData.total_volumes[0][0],
        price: fetchedData.total_volumes[0][1]
    }

    for (let i = 1; i < fetchedData.total_volumes.length; i++) {
        if (fetchedData.total_volumes[i][1] > highestTradingVol.price) {
            highestTradingVol.date = fetchedData.total_volumes[i][0]
            highestTradingVol.price = fetchedData.total_volumes[i][1]
        }
      }

    return (
        <div className="content">
         <h3>The date with the highest trading volume and the volume on that day in euros</h3>
         <p>Date: {getDayMonthYear(highestTradingVol.date)}</p>
         <p>Volume in euros: {highestTradingVol.price}</p>
        </div>
    )
}

export default HighestVolume