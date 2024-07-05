//import React, { useRef, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
//import { Link,usesLocation } from "react-router-dom";
import './About.css';
// import home from "./Home";
export default function About () {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timer, setTimer] = useState(60);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

  
    //useEffect(() => {
      // Fetch quiz data from API
    // fetch('http://localhost:3006/sms/qa?limit=2')
     //  .then((response) => response.json())
      //  .then((data) => setQuestions(data))
      //  .catch((error) => console.error('Error fetching quiz data:', error));
    //}, []);
  
    //const handleAnswer = (questionIndex, option, correctAnswer) => {
      //if (option === correctAnswer) {
      //  console.log('Correct!');
      //} else {
       // console.log('Wrong!');
     // }
      //setCurrentQuestion(questionIndex);
    //};
  
    //if (questions.length === 0) {
     // return <div>Loading...</div>;
    //}
  
  

 const questions = [
      { question: "What is the capital of Kerala?", options: ["Salem", "Tiruvanantapuram", "New Delhi", "Nainital"], correct: 1 },
      { question: "Who among the following ruler was defeated by Seleucus?", options: ["Chandra Gupta Maurya", "Vikramaditya", "Chanakya", "None of the above"], correct: 0 },
      { question: " Who wrote Bande Mataram?", options: ["Rabindranath Tagore", " Bankimchandra Chatterjee", " Sharat chandra chattopadhyay", "None of the above"], correct:1 },
      { question: "Where did ‘Tebhega’ movement occur in 1946?", options: ["Maharashtra", " Tamil Nadu", " Karnataka", "Bengal"], correct: 3},
      { question: " When was Indian National song sung for the first time?", options: ["1896 session of the Indian National Congress", "1857 revolt", " 1919 - Jallianwala Bagh Massacre", "None of the above"], correct:0 },
      { question: "When Indian national Anthem was first sung?", options: ["August 15, 1947, Independence of Indian", "1857 revolt", "December 27, 1911 Calcutta", " None of the Above"], correct: 2 },
      // Add more questions as needed
  ];

  useEffect(() => {
      const interval = setInterval(() => {
          setTimer((prevTimer) =>{
           if (prevTimer ===1) {
                handleNextQuestion();
                return 60;//Reset the timer
            }
            return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => {
        const nextQuestion = prevQuestion + 1 < questions.length ? prevQuestion + 1 : prevQuestion;
        if (nextQuestion === prevQuestion) {
            setTimer(0); // Stop the timer if it's the last question
        } else {
            setTimer(60); // Reset the timer for the next question
        }
        return nextQuestion;
    });
     setSelectedAnswer(null);
      setIsCorrect(null);
  };
  const handlePreviousQuestion = () => {
    setCurrentQuestion((prevQuestion) => {
        const prev = prevQuestion > 0 ? prevQuestion - 1 : prevQuestion;
        setTimer(60); // Reset the timer for the previous question
        return prev;
    });
    setSelectedAnswer(null);
     setIsCorrect(null);
  };

  const handleAnswerClick = (index) => {
      setSelectedAnswer(index);
      setIsCorrect(index === questions[currentQuestion].correct);
  };
return (
            <>
            <main>
            <div className="quiz-container">
            <div className="quiz-header">
                <h1 className="quiz-title">ONLINE TEST</h1>
                <span className="timer">{timer} sec ⏱️</span>
            </div>
            <div className="question-container">
                <h2>Question {currentQuestion + 1} of {questions.length}</h2>
                <h3>{questions[currentQuestion].question}</h3>
                <div className="options-container">
                    {questions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            className={`option-button ${selectedAnswer === index ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                            onClick={() => handleAnswerClick(index)}
                        >
                            {index + 1}. {option}
                        </button>
                    ))}
                </div>
                <div className="navigation-buttons">
                    <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>Previous</button>
                    <button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1}>Next</button>
                </div>
            </div>
        </div>
     </main>
            </>
               
        );
    }










    



