import React from 'react'

const Options = ({question}) => {
  return (
    <div className='options'>
                {question.options.map((option, index)=>{
                return(
                    <button key={index} className='btn btn-option'> 
                        
                       {option}
                    </button>
                )
        
            }
            )}
    </div>
  )
}

export default Options