import React, { useEffect, useReducer } from 'react';
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
import Footer from './Footer';
import Timer from './Timer';

const SECS_PER_QUESTION = 30;

const initialState = {
    questions: [],
    //'loading', 'ready', 'error', 'active', 'finished'
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: null,
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'dataReceived': return {
            ...state,
            questions: action.payload,
            status: 'ready',
        }
        case 'dataFailed':
            return {
                ...state,
                status: 'error',
            }
        case 'start':
            return {
                ...state,
                status: 'active',
                secondsRemaining: SECS_PER_QUESTION*state.questions.length,
            }
        case 'newAnswer':
            const question = state.questions.at(state.index)
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points,

            }
        case 'nextQuestion':
            return {
                ...state,
                index: state.index + 1,
                answer: null,
            }
        case 'finish':
            return {
                ...state,
                status: 'finish',
                highScore: state.points > state.highScore ? state.points : state.highScore,
            }

        case 'restart':
                return {
                    ...state,
                    status: 'ready',
                    index: 0,
                    answer: null,
                    points: 0,
                }
        case 'tick':
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining <= 1 ? 'finished' : state.status,
            }

        default: throw new Error('Unknown action')
    }

}

export default function App() {
    const [{ questions, status, index, answer, points, highScore, secondsRemaining }, dispatch] = useReducer(reducer, initialState)

    const numQuestions = questions.length;
    const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0)
    useEffect(() => {
        fetch('http://localhost:8000/questions')
            .then((res) => res.json())
            .then((data) => dispatch({ type: 'dataReceived', payload: data }))
            .catch((err) => dispatch({ type: 'dataFailed' }))
    }, []);

    const renderContent = () => {
        switch (status) {
            case "loading":
                return <Loader />;
            case "ready":
                return <StartScreen numQuestions={numQuestions} dispatch={dispatch} />;
            case "error":
                return <Error />;
            case "active":
                return (
                    <>
                        <Progress
                            index={index}
                            numQuestions={numQuestions}
                            points={points}
                            maxPoints={maxPoints}
                            answer={answer}
                        />
                        <Question question={questions[index]} dispatch={dispatch} answer={answer} />
                        <Footer>
                            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
                            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}  />
                        </Footer>
                    </>
                );
            case "finish":
                return <FinishedScreen points={points} 
                maxPoints={maxPoints} 
                highScore={highScore} 
                dispatch= {dispatch}/>;
            default:
                return <Error />;
        }
    };

    return (
        <div className="app">
            <Header />
            <Main>{renderContent()}</Main>
            <Footer />
        </div>
    )
}
