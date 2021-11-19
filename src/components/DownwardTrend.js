const DownwardTrend = ({ fetchedData }) => {

    let streak = 1
    let currentBest = 0
    const tempArr = fetchedData.prices.slice(1)

    for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i][1] < fetchedData.prices[i][1]) streak++;
        else {
          if (streak > currentBest) currentBest = streak
          streak = 1;
        }
      }

    return (
        <div>
            <h3>The maximum amount of days bitcoin´s price was decreasing in a row</h3>
            <p>Amount of days: {currentBest}</p>
        </div>
    )
}

export default DownwardTrend