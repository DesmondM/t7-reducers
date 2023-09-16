import React from 'react';
import DateCounter from './DateCounter';
import Counter from './Counter';
import Header from './Header';
export default function App() {
    return (
        <div className='app'>
            <Header/>
            <main className='main'>
                <p>1/15</p>
                <p>Question</p>
                </main>
        {/* <div><DateCounter/></div> */}
        {/* <div><Counter/></div> */}
        </div>
    );
}