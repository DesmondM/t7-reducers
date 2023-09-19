import React from 'react'
import Options from './Options'

export const Question = ({question, dispatch, answer}) => {
    console.log(question.question)
  return (
    <div>
        <h4>{question.question}</h4>
         <div className='options'>
          <Options question={question} dispatch={dispatch} answer={answer}/>
  </div>
  </div>
  )
}