const DownwardTrend = ({ fetchedData }) => {
  
  const streak = countStreak(fetchedData)

    return (
        <div className="content">
            <h3>The maximum amount of days bitcoin´s price was decreasing in a row</h3>
            <p>Amount of days: {streak}</p>
        </div>
    )
}

export const decreasing = (obj, index) => {
  let streak = 1
  const tempArr = obj.prices.slice(1)

  for (let i = index; i < tempArr.length; i++) {
    if (tempArr[i][1] < obj.prices[i][1]) streak++
    else break    
  }

    return streak
}

export const countStreak = obj => {
  let currentBest = 0
  let streak = 1

  for (let i = 0; i < obj.prices.length; i+=streak) {
    streak = decreasing(obj, i)
    if (streak > currentBest) currentBest = streak
  }

  return currentBest
}

export default DownwardTrend