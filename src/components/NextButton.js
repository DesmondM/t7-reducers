
import React from 'react'

const NextButton = ({dispatch, answer}) => {
    if (answer === null) return 
  return (
    <button  className='btn btn-ui' onClick={()=>dispatch({type:'nextQuestion'})}>
        Next Question
    </button>
  )
}

export default NextButton