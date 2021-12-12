
/* 
    Component finds the date with highest trading volume from the user given date range
*/
const HighestVolume = ({ fetchedData, getDayMonthYear }) => {

    const maxValue = fetchedData.total_volumes.reduce((prev, current) => (prev[1] > current[1]) ? prev : current)

    return (
        <div className="content">
         <h3>The date with the highest trading volume and the volume on that day in euros</h3>
         <p>Date: {getDayMonthYear(maxValue[0])}</p>
         <p>Volume in euros: {maxValue[1]}</p>
        </div>
    )
}

export default HighestVolume