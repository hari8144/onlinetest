import React, { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";

 import './Home.css';


export default function Home()
{
    const nameRef = useRef();
    const questionCountRef = useRef();
    const navigate = useNavigate();

    const handleStartClick = () => {
        const name = nameRef.current.value;
        const questionCount = questionCountRef.current.value;
        if (name && questionCount) {
            navigate(`/about?name=${name}&questions=${questionCount}`);
        }
    };
   return(
        <>
        <main>

        <div className="welcome-container">
            <div className="header">
                <h1 className="title">ONLINE TEST</h1>
            </div>
            <h2>Welocme to Online Test</h2>
           <nav>
                <Link to="/about">about</Link>
            </nav>
            <div className="rules">
                <p>Rules:</p>
                <ul>
                    <li>You will have 60 sec to answer each question</li>
                    <li>Refreshing the page will reset the Quiz</li>
                </ul>
            </div>
            <div className="selection">
                <p>Please select number of questions:</p>
                <div>
                    <input type="radio" id="five" name="questions" value="5" ref={questionCountRef} />
                    <label htmlFor="five">5</label>
                    <input type="radio" id="ten" name="questions" value="10" ref={questionCountRef} />
                    <label htmlFor="ten">10</label>
                    <input type="radio" id="twenty" name="questions" value="20" ref={questionCountRef} />
                    <label htmlFor="twenty">20</label>
                </div>
            </div>
            <input
                type="text"
                placeholder="Enter your name"
                className="name-input"
                ref={nameRef}
            /> <br></br>
            <button className="start-button" onClick={handleStartClick}>
                Start the Quiz!!
            </button>
            <h2>All the best!!</h2>
            </div>
        </main>
      
      </>
    );
    };
    