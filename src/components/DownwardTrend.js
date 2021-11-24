/*
  Component counts the maximum amount of days  bitcoin's price was decreasing in a row
*/
const DownwardTrend = ({ fetchedData }) => {
  
  const streak = countStreak(fetchedData)

    return (
        <div className="content">
            <h3>The maximum amount of days bitcoin´s price was decreasing in a row</h3>
            <p>Amount of days: {streak}</p>
        </div>
    )
}

/*
  Calculates the length of a bearish trend
*/
export const decreasing = (obj, index) => {
  let streak = 1
  for (let i = index; i < obj.prices.length-1; i++) {
    if (obj.prices[i][1] >= obj.prices[i+1][1]) streak++
    else break    
  }

    return streak
}

/*
  Finds the length of the longest descending subset from the array
*/
export const countStreak = obj => {
  let currentBest = 0
  let streak = 1

  for (let i = 0; i < obj.prices.length; i+=streak) {
    streak = decreasing(obj, i)
    if (streak > currentBest) currentBest = streak
  }

  return currentBest > 0 ? currentBest - 1 : currentBest
}

export default DownwardTrend