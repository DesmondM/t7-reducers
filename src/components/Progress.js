import React from 'react'

const Progress = ({index, numQuestions, points, maxPoints, answer}) => {
  return (
    <header className='progress'>
        <progress value={index + Number(answer!==null)} max={numQuestions}></progress>
        <p>
            Question <strong>{index+1}</strong>/ {numQuestions}
        </p>
        <p>
           <strong>{points}</strong> / {maxPoints} points
        </p>
    </header>
  )
}

export default Progress