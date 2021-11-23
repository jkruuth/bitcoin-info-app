import '@testing-library/jest-dom/extend-expect'
import { countStreak } from './DownwardTrend'


test('Testing countStreak function', () => {
    const testObj1 = {
        prices: [[1,9],[1,8],[1,7],[1,6],[1,5],[1,4],[1,3]]
    }

    const testObj2 = {
        prices: [[1,9],[1,10],[1,11],[1,12],[1,16],[1,29],[1,49]]
    }

    const testResult1 = countStreak(testObj1)

    const testResult2 = countStreak(testObj2)

    expect(testResult1).toBe(6)

    expect(testResult2).toBe(0)

})