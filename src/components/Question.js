import React from 'react'
import Options from './Options'

export const Question = ({question}) => {
    console.log(question.question)
  return (
    <div>
        <h4>{question.question}</h4>
         <div className='options'>
          <Options question={question}/>
  </div>
  </div>
  )
}