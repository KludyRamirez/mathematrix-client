import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

const SinglePlayerGame = () => {
  const { user } = useSelector((state) => state.auth);
  const [gameId, setGameId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [timer, setTimer] = useState(900);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [gameCanceled, setGameCanceled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    startGame();

    const handleExit = async () => {
      if (!gameOver && gameId) {
        await cancelGame();
      }
    };

    window.addEventListener("beforeunload", handleExit);

    return () => {
      window.removeEventListener("beforeunload", handleExit);
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      endGame();
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const startGame = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/singleplayer/start`,
        { username: user.username }
      );
      setGameId(response.data.gameId);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  const submitAnswer = async (answer) => {
    if (!gameId || currentQuestionIndex >= questions.length) return;

    setSelectedAnswer(answer); // Show selected answer immediately

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/singleplayer/answer`,
        {
          gameId,
          questionIndex: currentQuestionIndex,
          answer,
        }
      );

      if (response.data.correct) {
        setCorrectAnswers((prev) => prev + 1);
        setAnswerFeedback("correct");
      } else {
        setIncorrectAnswers((prev) => prev + 1);
        setAnswerFeedback("incorrect");
      }

      // Wait 1 second before moving to the next question
      setTimeout(() => {
        setSelectedAnswer(null);
        setAnswerFeedback(null);

        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          endGame();
        }
      }, 1000);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const endGame = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/singleplayer/end`,
        {
          gameId,
        }
      );

      setGameOver(true);
    } catch (error) {
      console.error("Error ending game:", error);
    }
  };

  const cancelGame = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/singleplayer/cancel`,
        {
          gameId,
        }
      );
      setGameCanceled(true);
    } catch (error) {
      console.error("Error canceling game:", error);
    }
  };

  const quitGame = async () => {
    await cancelGame();
    navigate("/");
  };

  const restartGame = () => {
    setGameId(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setTimer(900);
    setGameOver(false);
    setSelectedAnswer(null);
    setAnswerFeedback(null);
    setGameCanceled(false);
    startGame();
  };

  if (!questions.length)
    return <h2 className="loading">Loading questions...</h2>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 text-gray-800 p-6">
      {!gameOver && !gameCanceled ? (
        <>
          <div className="self-end py-2 px-4"></div>
          <div className="mb-6">{questions[currentQuestionIndex].category}</div>

          <span className="text-[72px] font-semibold">
            {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
            {timer % 60}
          </span>

          {/* Question Display */}
          <h3 className="text-xl font-[extra-light] my-6">
            Question {currentQuestionIndex + 1}
          </h3>

          {/* Timer Bar */}

          <div className="w-full max-w-lg bg-white rounded-full shadow-md overflow-hidden mb-4">
            <div
              className="h-4 bg-gradient-to-r from-blue-300 to-blue-500 transition-all duration-500"
              style={{ width: `${(timer / 900) * 100}%` }}
            ></div>
          </div>

          <p className="w-[512px] bg-white shadow-lg rounded-lg p-4 text-center text-lg mt-4">
            <BlockMath math={questions[currentQuestionIndex].question} />
          </p>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-lg">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => submitAnswer(option)}
                className={`py-3 px-6 rounded-lg font-semibold text-lg shadow-md transition-all duration-300 ${
                  selectedAnswer === option
                    ? answerFeedback === "correct"
                      ? "bg-green-400 text-white"
                      : "bg-red-400 text-white"
                    : "bg-white hover:bg-blue-600 text-gray-900 hover:text-white"
                }`}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        /* Game Over Screen */
        <div className="text-center">
          {gameCanceled ? (
            <h2 className="text-2xl font-bold text-red-500">Game Canceled</h2>
          ) : (
            <>
              <h2 className="text-[86px] font-[semi-bold] text-red-500">
                Game Over
              </h2>
              <div className="spacer-small"></div>
              <span className="font-[extra-light] text-[18px]">
                Thank you for playing.
              </span>
              <div className="spacer-xs"></div>
              <div className="spacer-medium"></div>
              <div className="w-full flex justify-center items-center gap-16">
                <div>
                  <p className="text-[56px]">{correctAnswers}</p>
                  <p className="text-lg">Correct</p>
                </div>
                <div className="w-[1px] h-[140px] bg-gray-300"></div>
                <div>
                  <p className="text-[56px]">{incorrectAnswers}</p>
                  <p className="text-lg">Incorrect</p>
                </div>
              </div>
            </>
          )}
          <div className="spacer-medium"></div>
          <div className="spacer-medium"></div>
          <div className="flex flex-col gap-4 justify-center">
            <button
              onClick={restartGame}
              className="bg-blue-500 text-white py-3 px-6 shadow-md hover:bg-blue-600"
            >
              Restart
            </button>
            <button
              onClick={quitGame}
              className="bg-gray-500 text-white py-3 px-6 shadow-md hover:bg-gray-600"
            >
              Quit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePlayerGame;
