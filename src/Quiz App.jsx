import { useEffect, useState } from 'react'
import './App.css'
import questionsData from './Quiz Questions.json'

function QuizApp() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [timer, setTimer] = useState(10)
    const [startQuiz, setStartQuiz] = useState(false)

    useEffect(()=>{
      let interval;
      if(timer > 0 && !showScore){
        interval = setInterval(() => {
          setTimer((prevTimer)=> prevTimer - 1)
        }, 1000);
        console.log(interval)
      }
      else{
        clearInterval(interval)
        setShowScore(true)
      }
      return ()=> clearInterval(interval)
    },[timer, showScore, startQuiz])

    const handleCheckOption = (option) =>{
        if(option == questionsData[currentQuestion].correctOption){
            setScore((prevScore)=> prevScore + 1)
        }
        if(currentQuestion < questionsData.length - 1){
            setCurrentQuestion((prevQuestion) => prevQuestion + 1)
            setTimer(10)
        }
        else{
            setShowScore(true)
        }

    }
    const handleRestartQuiz = () =>{
      setCurrentQuestion(0)
      setScore(0)
      setShowScore(false)
      setTimer(10)
    }

  return (
    <>
    <div className="content">

      <div className="quiz-container">
      
      {!showScore && <h3 className='timer'>You have {timer}s left</h3>}

        {showScore ? (<div className="restartQuiz">
            <h2>Your Score is : {score}/{questionsData.length}</h2>
            <button onClick={handleRestartQuiz} className='restart'>Restart</button>
          </div>) : 
        (<div className="quiz-questions">
            <h1>Question {currentQuestion + 1}</h1>
            <h2>
                {questionsData[currentQuestion].question}
            </h2>
            {
                questionsData[currentQuestion].options.map((option, index) =>{
                return <button key={index} className='quiz-options' onClick={() => handleCheckOption(option)}>{option}</button>
            })} 
        </div>)
        }
        
      </div>

      </div>
      
    </>
  )
}

export default QuizApp
