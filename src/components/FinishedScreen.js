import React from 'react'

const FinishedScreen = ({points, maxPoints, highScore}) => {
    const percentage = Math.round(points / maxPoints * 100)
  return (
    <>
    <p className='result'> 
        You scored <strong>{points}</strong> out  of {maxPoints} points!
        {Math.ceil(percentage) >= 80 ? '🎉' : '😢'}
    </p>

    <p className='highscore'>(Highscore: {highScore} points)</p>
    </>
  )
}

export default FinishedScreen