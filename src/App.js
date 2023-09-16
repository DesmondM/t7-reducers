import React, {useEffect, useReducer} from 'react';
import DateCounter from './DateCounter';
import Counter from './Counter';
import Header from './Header';
import { Main } from './Main';

const initialState   = {
    questions: [],
    //'loading', 'ready', 'error', 'active', 'finished'
    status: 'loading',
}
const reducer = (state,action)=>{
    switch(action.type){
        case 'dataReceived' : return{
            ...state,
            questions: action.payload,
            status: 'ready',
        }
       
    }

}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
            fetch('http://localhost:8000/questions')
            .then((res)=>res.json())
            .then((data)=>dispatch({type:'dataReceived', payload:data}))
    }, []);
    return (
        <div className='app'>
            <Header/>
            <Main>
                {state.status==='ready' && <p>Ready..</p>}
                <p>1/15</p>
                <p>Question</p>
                </Main>
        {/* <div><DateCounter/></div> */}
        {/* <div><Counter/></div> */}
        </div>
    );
}