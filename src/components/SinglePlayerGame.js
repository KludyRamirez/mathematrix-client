import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import Loading from "../components/Loading";
import OtherMatrixRain from "../utils/OtherMatrixRain";
import logo from "../assets/images/logo.png";
import snowflake from "../assets/images/snowflake.png";
import hourglass from "../assets/images/hourglass.png";
import MatrixRain from "../utils/MatrixRain";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { BsHouse } from "react-icons/bs";

const SinglePlayerGame = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
  const [powerUps, setPowerUps] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const timerInterval = useRef(null);

  useEffect(() => {
    startGame();

    const handleExit = async () => {
      if (!gameOver && gameId) await cancelGame();
    };

    const disableBack = () => {
      window.history.pushState(null, "", window.location.pathname);
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", disableBack);
    window.addEventListener("beforeunload", handleExit);

    return () => {
      window.removeEventListener("popstate", disableBack);
      window.removeEventListener("beforeunload", handleExit);
      clearInterval(timerInterval.current);
    };
  }, []);

  useEffect(() => {
    if (timer === 0) endGame();

    if (!isPaused) {
      timerInterval.current = setInterval(() => {
        setTimer((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }

    return () => clearInterval(timerInterval.current);
  }, [timer, isPaused]);

  useEffect(() => {
    if (powerUps.length < 2) {
      const spawnTime = Math.random() * (15000 - 5000) + 5000;
      const powerUpType = Math.random() > 0.5 ? "extra_time" : "freeze_time";

      const spawnPowerUp = () => {
        setPowerUps((prev) => [...prev, { id: Date.now(), type: powerUpType }]);
      };

      const powerUpTimeout = setTimeout(spawnPowerUp, spawnTime);
      return () => clearTimeout(powerUpTimeout);
    }
  }, [powerUps]);

  const startGame = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/singleplayer/start`,
        { username: user.username }
      );
      setGameId(data.gameId);
      setQuestions(data.questions);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  const submitAnswer = async (answer) => {
    if (!gameId || currentQuestionIndex >= questions.length) return;

    setSelectedAnswer(answer);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/singleplayer/answer`,
        { gameId, questionIndex: currentQuestionIndex, answer }
      );

      if (data.correct) {
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
        { gameId }
      );
      setGameOver(true);
    } catch (error) {
      console.error("Error ending game:", error);
    }
  };

  const handlePowerUp = (id, type) => {
    if (type === "extra_time") {
      setTimer((prev) => prev + 30);
    } else if (type === "freeze_time") {
      setIsPaused(true);
      clearInterval(timerInterval.current);

      setTimeout(() => {
        setIsPaused(false);
        timerInterval.current = setInterval(() => {
          setTimer((prev) => Math.max(prev - 1, 0));
        }, 1000);
      }, 60000);
    }

    setPowerUps((prev) => prev.filter((powerUp) => powerUp.id !== id));
  };

  const cancelGame = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/singleplayer/cancel`,
        { gameId }
      );
      setGameCanceled(true);
    } catch (error) {
      console.error("Error canceling game:", error);
    }
  };

  const quitGame = async () => {
    await cancelGame();
    navigate("/", { replace: true });

    setTimeout(() => {
      window.addEventListener("popstate", () => {
        window.history.pushState(null, "", "/");
      });
    }, 0);
  };

  const goBackToHome = () => {
    navigate("/", { replace: true });

    setTimeout(() => {
      window.addEventListener("popstate", () => {
        window.history.pushState(null, "", "/");
      });
    }, 0);
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
    setPowerUps([]);
    setIsPaused(false);
    clearInterval(timerInterval.current);

    timerInterval.current = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    startGame();
  };

  if (!questions.length) return <Loading color="#007bff" />;

  return (
    <div className="flex flex-col items-center relative justify-center w-full h-screen">
      <div className="absolute top-8 left-8 w-[100px] h-[100px] z-20 hidden xl:block shadow-3xl rounded-[50%]">
        <img src={logo} alt="" className="w-full h-full" />
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-10 block shadow-2xl rounded-[50%] border border-blue-500">
        {gameOver ? (
          <div className="metal-wave"></div>
        ) : (
          <div className="wave"></div>
        )}
      </div>
      {!gameOver && !gameCanceled ? (
        <>
          <div className="relative w-full xl:w-[fit-content] h-full">
            <div className="absolute top-0 left-0 w-full h-full">
              <OtherMatrixRain />
            </div>
            <div className="relative z-20 flex flex-col items-center justify-start xl:justify-center h-full px-4 xl:px-20 backdrop-blur-sm xl:border-l xl:border-r border-blue-200 relative py-8 xl:py-0">
              <div
                onClick={() => quitGame()}
                className="cursor-pointer absolute top-1 xl:top-[220px] right-6 xl:-right-[140px] w-[70px] xl:w-[100px] h-[70px] xl:h-[100px] flex justify-center items-center xl:border-[1px] border-red-400 rounded-[50%] font-[tarrgethalfital] text-[26px] xl:bg-gradient-to-br from-red-400 via-red-600 to-red-500 text-red-600 xl:text-white xl:shadow-2xl"
              >
                <span className="mr-2">Quit</span>
              </div>
              {/* <div className="absolute top-[220px] -left-[140px] flex flex-col justify-start items-center gap-6">
                {powerUps.map((powerUp) => (
                  <button
                    key={powerUp.id}
                    onClick={() => handlePowerUp(powerUp.id, powerUp.type)}
                    className="w-[100px] h-[100px] flex justify-center items-center border-[1px] border-blue-300 rounded-[50%] bg-gradient-to-tl from-red-300 via-blue-500 via-blue-400 via-blue-300 to-[#efffff] shadow-2xl"
                  >
                    {powerUp.type === "extra_time" ? (
                      <img
                        src={hourglass}
                        alt=""
                        className="w-[70px] h-[70px]"
                      />
                    ) : (
                      <img
                        src={snowflake}
                        alt=""
                        className="w-[70px] h-[70px]"
                      />
                    )}
                  </button>
                ))}
              </div> */}
              <div className="w-full hidden xl:flex justify-center items-center">
                <div
                  className={`font-[tarrgethalfital] text-6xl text-blue-700 w-[120px] h-[120px] border-[1px] border-blue-400 rounded-[50%] flex justify-center items-center bg-gradient-to-b from-red-100 via-white to-[#efffff] shadow-lg ${
                    answerFeedback === null ? "block" : "hidden"
                  }`}
                >
                  <span className="mr-5">1p</span>
                </div>
                <div
                  className={`font-[tarrgethalfital] text-6xl text-green-600 ${
                    answerFeedback === "correct" ? "block" : "hidden"
                  }`}
                >
                  Correct
                </div>
                <div
                  className={`font-[tarrgethalfital] text-6xl text-red-600 ${
                    answerFeedback === "incorrect" ? "block" : "hidden"
                  }`}
                >
                  Wrong
                </div>
              </div>
              <div className="spacer-medium" />
              <div className="w-full flex justify-center items-center gap-2 relative">
                <span className="text-[56px] font-[tarrget3d] text-blue-900">
                  {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
                  {timer % 60}
                </span>
              </div>
              <div className="spacer-medium" />

              <div
                className={`${
                  answerFeedback === "correct"
                    ? "bg-green-400"
                    : answerFeedback === "incorrect"
                    ? "bg-red-400"
                    : "bg-blue-600"
                } rounded-3xl text-white w-full xl:w-[480px] flex flex-col justify-center items-center text-4xl shadow-2xl`}
              >
                <div
                  className={`w-full flex justify-between items-center px-6 py-6 shadow-2xl rounded-tl-3xl rounded-tr-3xl ${
                    answerFeedback === "correct"
                      ? "shadow-green-500"
                      : answerFeedback === "incorrect"
                      ? "shadow-red-500"
                      : "shadow-blue-700"
                  }`}
                >
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
                <div className="w-full flex justify-center items-center font-[extra-light] px-6 pt-9 pb-12 text-3xl">
                  {questions[currentQuestionIndex]?.question ? (
                    <BlockMath
                      math={questions[currentQuestionIndex].question}
                    />
                  ) : (
                    <span className="font-[mighty]">
                      You have finished the game!
                    </span>
                  )}
                </div>
              </div>
              <div className="spacer-small"></div>
              <div className="spacer-medium"></div>
              <div className="w-full xl:w-[480px] flex flex-wrap justify-center items-center gap-4">
                {questions[currentQuestionIndex]?.options.map(
                  (option, index) => (
                    <div
                      key={index}
                      onClick={() => submitAnswer(option)}
                      className={`w-[47%] h-[74px] rounded-lg flex justify-center items-center xl:w-[230px] xl:py-6 px-6 shadow-xl xl:rounded-xl text-center border-[1px] text-[16px] cursor-pointer transition-hover duration-300 
                          ${
                            selectedAnswer === option
                              ? answerFeedback === "correct"
                                ? "bg-gradient-to-b from-green-400 to-green-500 border-green-400 text-white"
                                : "bg-gradient-to-b from-red-400 to-red-500 border-red-400 text-white"
                              : "bg-gradient-to-b from-white via-white via-blue-100 via-blue-100 to-red-100 border-blue-400 hover:border-blue-500 hover:from-blue-500 hover:to-blue-600 hover:text-white"
                          }`}
                      disabled={selectedAnswer !== null}
                    >
                      {option}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="relative w-full md:w-[fit-content] h-full">
          {/* {gameCanceled ? (
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
          )} */}

          <div className="absolute top-0 left-0 w-full h-full">
            <MatrixRain />
          </div>
          <div className="relative z-20 flex flex-col items-center justify-center h-screen xl:h-full px-4 xl:px-20 backdrop-blur-sm relative py-8 xl:py-0">
            <div className="w-full flex justify-center items-center">
              <div
                className={`font-[tarrgethalfital] text-center mr-5 xl:mr-0 text-7xl xl:text-6xl text-red-500`}
              >
                Game Over
              </div>
            </div>
            <div className="spacer-medium" />
            <div className="spacer-medium" />
            <div className="spacer-small"></div>
            <div className="spacer-small"></div>

            <div
              className={`text-white w-full flex flex-col justify-center items-center`}
            >
              <div className="w-full flex justify-around items-center font-[extra-light] text-3xl">
                <div className="flex flex-col justify-center items-center gap-6 font-[vip-bold]">
                  <p className="text-[48px] xl:text-[64px]">{correctAnswers}</p>
                  <p className="text-xl">Correct</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-6 font-[vip-bold]">
                  <p className="text-[48px] xl:text-[64px]">
                    {incorrectAnswers}
                  </p>
                  <p className="text-xl">Incorrect</p>
                </div>
              </div>
            </div>
            <div className="spacer-xs"></div>
            <div className="spacer-small"></div>
            <div className="spacer-small"></div>
            <div className="spacer-small"></div>
            <div className="spacer-medium"></div>

            <div className="cursor-pointer w-full flex flex-col gap-4 justify-center items-center px-4 xl:px-0">
              {/* Restart Section */}
              <div
                onClick={restartGame}
                className="w-full p-1 flex justify-center items-center gap-2 rounded-xl bg-gradient-to-b from-white to-gray-300 group"
              >
                <span className="font-[vip-regular] text-[18px] xl:text-[24px] text-blue-950 pl-4">
                  Restart
                </span>
                <div className="p-4 rounded-[50%] flex justify-center items-center">
                  <FaArrowRotateLeft
                    size={24}
                    className="text-blue-950 group-hover:transform group-hover:rotate-[360deg] transition-hover duration-300"
                  />
                </div>
              </div>

              {/* Home Section */}
              <div
                onClick={goBackToHome}
                className="cursor-pointer w-full p-1 flex justify-center items-center gap-2 bg-red-100/10 border-[1px] border-white rounded-xl hover:bg-red-100/20"
              >
                <span className="font-[vip-regular] text-[18px] xl:text-[24px] text-white pl-4">
                  Home
                </span>
                <div className="p-4 rounded-[50%] flex justify-center items-center">
                  <BsHouse size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePlayerGame;
