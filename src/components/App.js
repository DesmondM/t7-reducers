import React, {useEffect, useReducer} from 'react';
import DateCounter from './DateCounter';
import Counter from './Counter';
import Header from './Header';
import Loader from './Loader';
import Error from './Error';
import { Main } from './Main';
import StartScreen from './StartScreen';
import { Question } from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishedScreen from './FinishedScreen';

const initialState   = {
    questions: [],
    //'loading', 'ready', 'error', 'active', 'finished'
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highScore:0,
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
        case 'nextQuestion':
            return{
                ...state,
                index: state.index+1,
                answer: null,
            }
            case 'finish':
                return{
                    ...state,
                    status: 'finished',
                    highScore: state.points > state.highScore ? state.points : state.highScore,
                }

            
       default:  throw new Error('Unknown action')
    }

}

export default function App() {
    const [{questions, status, index, answer, points, highScore}, dispatch] = useReducer(reducer, initialState)

    const numQuestions = questions.length;
    const maxPoints = questions.reduce((prev, curr)=>prev+curr.points, 0)
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
                {status==='active' && 
                <>
                <Progress index={index} numQuestions={numQuestions} points={points} maxPoints={maxPoints} answer={answer}/>
                <Question question={questions[index]} dispatch={dispatch} answer={answer} /><NextButton dispatch={dispatch} answer={answer} /></>
                }

                {status==='finished' && <p><FinishedScreen points={points} maxPoints={maxPoints} highScore={highScore}/></p>}
                </Main>
        {/* <div><DateCounter/></div> */}
        {/* <div><Counter/></div> */}
        </div>
    );
}