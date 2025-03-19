import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import Loading from "../components/Loading";

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

    setSelectedAnswer(answer);
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

  if (!questions.length) return <Loading />;
  return (
    <div className="flex flex-col items-center relative justify-center min-h-screen">
      <div className="absolute top-0 left-0 w-[100vw] h-[100vh]">
        <div className="wave"></div>
      </div>
      {!gameOver && !gameCanceled ? (
        <>
          <div className="relative z-20 flex flex-col items-center justify-center">
            {/* <div className="w-full p-4 bg-gradient-to-b from-blue-100 via-white to-blue-100 flex justify-center items-center shadow-2xl rounded-2xl">
              <div className="font-[mighty] text-6xl text-blue-950">
                Single Player
              </div>
            </div>
            <div className="spacer-medium" /> */}
            {/* <div className="mb-6">{questions[currentQuestionIndex]?.category}</div> */}

            {/* <span className="text-[72px] font-semibold">
            {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
            {timer % 60}
          </span> */}

            {/* Question Display */}
            {/* <h3 className="text-xl font-[extra-light] my-6">
            Question {currentQuestionIndex + 1}
          </h3> */}

            {/* Timer Bar */}

            <div className="bg-blue-600 rounded-3xl text-white w-[480px] flex flex-col justify-center items-center text-4xl shadow-2xl">
              <div className="w-full flex justify-between items-center px-6 py-6 shadow-2xl shadow-blue-700">
                <span className="font-[extra-light] text-[24px]">Solve:</span>
                <div className="flex justify-center items-center">
                  <div className="w-[4px] h-[10px] bg-white"></div>
                  <div className="w-[26px] h-[18px] border-[2px] border-white">
                    <div className="w-full bg-blue-500 overflow-hidden transform scale-x-[-1]">
                      <div
                        className="h-[14px] bg-white transition-all duration-500"
                        style={{ width: `${(timer / 900) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center items-center font-[extra-light] px-6 pt-10 pb-12 text-3xl">
                {questions[currentQuestionIndex]?.question ? (
                  <BlockMath math={questions[currentQuestionIndex].question} />
                ) : (
                  <span className="font-[mighty]">
                    You have finished the game!
                  </span>
                )}
              </div>
            </div>
            <div className="spacer-xs"></div>
            <div className="spacer-small"></div>
            <div className="w-[480px] bg-gradient-to-b from-blue-100 via-white to-blue-100 shadow-2xl rounded-3xl p-6 relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex justify-center items-center z-20">
                <div className="w-[10px] h-[10px] border-[1px] rounded-tl-[4px] rounded-bl-[4px] shadow-sm bg-gradient-to-b from-blue-200 to-white"></div>
                <div className="w-[30px] h-[40px] border-[1px] rounded-tl-[4px] rounded-bl-[4px] shadow-md bg-gradient-to-b from-gray-200 to-white"></div>
                <div className="w-[40px] h-[46px] rounded-[4px] border-[1px] border-gray-200 shadow-md bg-gradient-to-b from-gray-200 to-white"></div>
                <div className="w-[30px] h-[40px] border-[1px] rounded-tr-[4px] rounded-br-[4px] shadow-md bg-gradient-to-b from-gray-200 to-white"></div>
                <div className="w-[10px] h-[10px] rounded-tr-[4px] rounded-br-[4px] shadow-sm bg-gradient-to-b from-blue-200 to-white"></div>
              </div>
              <div className="spacer-small"></div>
              <div className="w-full h-[fit-content] flex justify-between items-center px-4">
                <div className="flex justify-center items-end gap-6">
                  <div
                    className="flex flex-col items-center gap-4"
                    onClick={() => quitGame()}
                  >
                    <div className="cursor-pointer w-[40px] h-[40px] rounded-[50%] shadow-md bg-gradient-to-b from-[#ff4f88] to-[#9a2257] transform -rotate-[30deg] shadow-md"></div>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="cursor-pointer w-[40px] h-[40px] rounded-[50%] shadow-md bg-gradient-to-b from-[#ff4f88] to-[#9a2257] transform -rotate-[30deg] shadow-md"></div>
                  </div>
                </div>
              </div>
              <div className="spacer-xs"></div>
              <div className="spacer-small"></div>

              <div className="w-full h-[fit-content] flex flex-col justify-center items-center gap-4">
                <div
                  onClick={() =>
                    submitAnswer(questions[currentQuestionIndex]?.options[0])
                  }
                  className={`w-[fit-content] min-w-[188px] min-h-[58px] py-4 px-6 shadow-md shadow-gray-100 rounded-[8px] text-center border-[1px] text-[16px] cursor-pointer transition-all duration-300 ${
                    selectedAnswer ===
                    questions[currentQuestionIndex]?.options[0]
                      ? answerFeedback === "correct"
                        ? "bg-green-400 text-white"
                        : "bg-red-400 text-white"
                      : "bg-white border-gray-300/80 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {questions[currentQuestionIndex]?.options[0]}
                </div>

                <div className="w-full flex justify-center items-center gap-4">
                  <div
                    onClick={() =>
                      submitAnswer(questions[currentQuestionIndex]?.options[1])
                    }
                    className={`w-[fit-content] min-w-[188px] min-h-[58px] py-4 px-6 shadow-md shadow-gray-100 rounded-[8px] text-center border-[1px] text-[16px] cursor-pointer transition-all duration-300 ${
                      selectedAnswer ===
                      questions[currentQuestionIndex]?.options[1]
                        ? answerFeedback === "correct"
                          ? "bg-green-400 text-white"
                          : "bg-red-400 text-white"
                        : "bg-white border-gray-300/80 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                    }`}
                    disabled={selectedAnswer !== null}
                  >
                    {questions[currentQuestionIndex]?.options[1]}
                  </div>

                  <div
                    onClick={() =>
                      submitAnswer(questions[currentQuestionIndex]?.options[2])
                    }
                    className={`w-[fit-content] min-w-[188px] min-h-[58px] py-4 px-6 shadow-md shadow-gray-100 rounded-[8px] text-center border-[1px] text-[16px] cursor-pointer transition-all duration-300 ${
                      selectedAnswer ===
                      questions[currentQuestionIndex]?.options[2]
                        ? answerFeedback === "correct"
                          ? "bg-green-400 text-white"
                          : "bg-red-400 text-white"
                        : "bg-white border-gray-300/80 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                    }`}
                    disabled={selectedAnswer !== null}
                  >
                    {questions[currentQuestionIndex]?.options[2]}
                  </div>
                </div>

                <div
                  onClick={() =>
                    submitAnswer(questions[currentQuestionIndex]?.options[3])
                  }
                  className={`w-[fit-content] min-w-[188px] min-h-[58px] py-4 px-6 shadow-md shadow-blue-100 rounded-[8px] text-center border-[1px] text-[16px] cursor-pointer transition-all duration-300 ${
                    selectedAnswer ===
                    questions[currentQuestionIndex]?.options[3]
                      ? answerFeedback === "correct"
                        ? "bg-green-400 text-white"
                        : "bg-red-400 text-white"
                      : "bg-white border-gray-300/80 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {questions[currentQuestionIndex]?.options[3]}
                </div>
              </div>

              <div className="spacer-xs"></div>
              <div className="spacer-small"></div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center relative z-20">
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
              onClick={() => navigate("/")}
              className="bg-gray-500 text-white py-3 px-6 shadow-md hover:bg-gray-600"
            >
              Go back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePlayerGame;
