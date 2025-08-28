import { useEffect, useState } from "react";
import questionsData from "./Quiz Questions.json";

function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);
  const [progress, setProgress] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && !showScore) {
      // Move to next question automatically if time runs out
      if (currentQuestion < questionsData.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setTimer(10);
      } else {
        setShowScore(true);
      }
    }
    return () => clearInterval(interval);
  }, [timer, showScore, currentQuestion]);

  // Animate progress bar
  useEffect(() => {
    const newProgress = ((currentQuestion + 1) / questionsData.length) * 100;
    setProgress(newProgress);
  }, [currentQuestion, showScore]);

  const handleCheckOption = (option) => {
    if (option === questionsData[currentQuestion].correctOption) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(10);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
    setProgress(0);
  };

  const getProgressColor = () => {
    if (progress < 40) return "bg-red-500";
    if (progress < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getTimerColor = () => {
    if (timer > 6) return "bg-green-500";
    if (timer > 3) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6 md:p-10 text-center relative">

        {/* Question Progress Bar */}
        <div className="w-full bg-gray-200 h-6 rounded-full mb-5 relative overflow-hidden">
          <div
            className={`h-6 ${getProgressColor()} transition-all duration-700 ease-in-out`}
            style={{ width: `${progress}%` }}
          ></div>
          <span className="absolute inset-0 flex items-center justify-center text-xs md:text-sm font-semibold drop-shadow">
            {currentQuestion + 1} / {questionsData.length}
          </span>
        </div>

        {/* Timer Progress Bar */}
        {!showScore && (
          <div className="w-full bg-gray-200 h-3 rounded-full mb-6 relative overflow-hidden">
            <div
              className={`h-3 ${getTimerColor()} transition-all duration-1000 ease-linear 
                ${timer <= 2 ? "flash" : ""}`}
              style={{ width: `${(timer / 10) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Timer Text */}
        {!showScore && (
          <h3
            className={`text-lg font-semibold mb-4 ${
              timer <= 2 ? "text-red-600 flash" : "text-gray-800"
            }`}
          >
            You have {timer} {timer === 1 ? "second" : "seconds"} left
          </h3>
        )}

        {/* Show Score or Questions */}
        {showScore ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎉 Your Score:{" "}
              <span className="text-indigo-600">
                {score}/{questionsData.length}
              </span>
            </h2>
            <button
              onClick={handleRestartQuiz}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-indigo-700 mb-4">
              Question {currentQuestion + 1} of {questionsData.length}
            </h1>
            <h2 className="text-lg md:text-xl text-red-600 font-medium mb-6">
              {questionsData[currentQuestion].question}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {questionsData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleCheckOption(option)}
                  className="bg-gray-100 hover:bg-indigo-100 text-gray-800 font-medium py-3 px-4 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-400 transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizApp;