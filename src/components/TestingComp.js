import React from 'react'

const number1 = 8
const TestingComp = () => {

    function test() {
       if(number1>10){
        return <div>Number is greater than 10</div>
       }
       else if(number1>5){
        return <div>Number is greater than 5</div>
       }
       else if(number1>0){
        return <div>Number is greater than 0</div>
       }
       else{
        return <div>Number is less than or equal to 0</div>
       }
    }

  return (
    <div>TestingComp</div>
  )
}

export default TestingComp