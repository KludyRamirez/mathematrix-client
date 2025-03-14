import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_API);

const MultiPlayerGame = () => {
  const { matchId } = useParams();
  const [question, setQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(180);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameOverData, setGameOverData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("new_question", (data) => {
      setQuestion(data.question);
      setTimeLeft(180);
      setSelectedAnswer(null);
    });

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    socket.on("game_over", ({ winner, scores, answers, message }) => {
      setGameOverData({ winner, scores, answers, message });
    });

    return () => {
      socket.off("game_over");
    };
  }, []);

  const submitAnswer = () => {
    socket.emit("answer", { matchId, answer: selectedAnswer });
  };

  return (
    <div>
      {question ? (
        <>
          <h3>{question.text}</h3>
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedAnswer(option)}
              style={{
                background: selectedAnswer === option ? "lightblue" : "white",
              }}
            >
              {option}
            </button>
          ))}
          <button onClick={submitAnswer} disabled={!selectedAnswer}>
            Submit
          </button>
          <p>Time left: {timeLeft}s</p>
        </>
      ) : (
        <p>Waiting for question...</p>
      )}

      {/* 🔹 Game Over Modal */}
      {gameOverData && (
        <div className="modal">
          <h2>Game Over!</h2>
          <p>{gameOverData.message || `Winner: ${gameOverData.winner}`}</p>

          <h3>Game Stats</h3>
          {gameOverData.answers &&
            gameOverData.answers.map((q, index) => (
              <div key={index}>
                <p>
                  <strong>Question {index + 1}:</strong> {q.question}
                </p>
                <p>Correct Answer: {q.correctAnswer}</p>
                <p>
                  ✅ {q.player1.username}:{" "}
                  {q.player1.answer === q.correctAnswer
                    ? "✔ Correct"
                    : "❌ Wrong"}
                </p>
                <p>
                  ✅ {q.player2.username}:{" "}
                  {q.player2.answer === q.correctAnswer
                    ? "✔ Correct"
                    : "❌ Wrong"}
                </p>
              </div>
            ))}

          <button onClick={() => navigate("/")}>Return to Home</button>
        </div>
      )}
    </div>
  );
};

export default MultiPlayerGame;
