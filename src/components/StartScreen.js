import React from 'react'

const StartScreen = ({numQuestions, dispatch}) => {
  return (
    <div className='start'>
        <h2>Welcome to React Quiz</h2>
        <h3>{numQuestions} questions to test react Skills</h3>
        <button btn btn-ui onClick={()=>dispatch({type:'start'})}>Start</button>
    </div>
  )
}

export default StartScreen