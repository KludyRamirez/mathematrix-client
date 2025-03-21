import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findMatch } from "../store/actions/matchActions";

const Matchmaking = ({ socket }) => {
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

  useEffect(() => {
    if (matchId) {
      navigate(`/multiplayer/${matchId}`);
    }
  }, [matchId, navigate]);

  const handleFindMatch = () => {
    if (!user) return;
    dispatch(findMatch(socket, user.username));
  };

  return (
    <div>
      {matchId && opponent ? (
        <div>
          <h3>Opponent Found: {opponent}!</h3>
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
