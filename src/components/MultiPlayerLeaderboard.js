import React, { useEffect, useState } from "react";
import axios from "axios";

const MultiplayerLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/multiplayer/leaderboard`
        );
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Multiplayer Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player._id}</td>
              <td>{player.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MultiplayerLeaderboard;
