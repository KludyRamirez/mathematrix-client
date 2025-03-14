import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { findMatch } from "../store/actions/matchActions";

const socket = io(process.env.REACT_APP_SOCKET_API);

const Matchmaking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { matchId, opponent, loading } = useSelector((state) => state.match);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    return () => {
      socket.off("match_found");
      socket.off("match_error");
    };
  }, []);

  const handleFindMatch = () => {
    if (!user) return;
    dispatch(findMatch(socket, user.username));
  };

  const startGame = () => {
    if (matchId && opponent) {
      navigate(`/multiplayer/${matchId}`);
    }
  };

  return (
    <div>
      {matchId && opponent ? (
        <div>
          <h3>Opponent Found: {opponent}!</h3>
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : loading ? (
        <h3>Waiting for an opponent...</h3>
      ) : (
        <button onClick={handleFindMatch}>Find Match</button>
      )}
    </div>
  );
};

export default Matchmaking;
