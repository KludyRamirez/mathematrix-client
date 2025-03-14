export const findMatch = (socket, username) => (dispatch) => {
  dispatch({ type: "MATCH_FIND_REQUEST" });

  socket.emit("find_match", username);

  socket.on("match_found", ({ matchId, opponent }) => {
    dispatch({ type: "MATCH_FOUND", payload: { matchId, opponent } });
  });

  socket.on("match_error", (error) => {
    dispatch({ type: "MATCH_FIND_FAIL", payload: error });
  });
};
