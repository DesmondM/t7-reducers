import React, {useEffect, useReducer} from 'react';
import DateCounter from './DateCounter';
import Counter from './Counter';
import Header from './Header';
import Loader from './Loader';
import Error from './Error';
import { Main } from './Main';
import StartScreen from './StartScreen';
import { Question } from './Question';

const initialState   = {
    questions: [],
    //'loading', 'ready', 'error', 'active', 'finished'
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
}
const reducer = (state,action)=>{
    switch(action.type){
        case 'dataReceived' : return{
            ...state,
            questions: action.payload,
            status: 'ready',
        }
        case 'dataFailed':
            return{
                ...state,
                status: 'error',
            }
        case 'start':
            return{
                ...state, 
                status: 'active',
            }
        case 'newAnswer': 
            const question = state.questions.at(state.index)
            return{
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points,
            
            }
       default:  throw new Error('Unknown action')
    }

}

export default function App() {
    const [{questions, status, index, answer}, dispatch] = useReducer(reducer, initialState)

    const numQuestions = questions.length;
    useEffect(() => {
            fetch('http://localhost:8000/questions')
            .then((res)=>res.json())
            .then((data)=>dispatch({type:'dataReceived', payload:data}))
            .catch((err)=>dispatch({type:'dataFailed'}))
    }, []);
    return (
        <div className='app'>
            <Header/>
            <Main>
                {status==='loading' && <Loader/>}
                {status==='ready' && <StartScreen numQuestions ={numQuestions} dispatch={dispatch}/>}
                {status==='error' && <Error/>}
                {status==='active' && <Question 
                question={questions[index]} dispatch={dispatch} answer={answer}/>}

                {/* <p>1/15</p>
                <p>Question</p> */}
                </Main>
        {/* <div><DateCounter/></div> */}
        {/* <div><Counter/></div> */}
        </div>
    );
}