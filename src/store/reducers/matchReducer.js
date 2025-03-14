const initialState = {
  matchId: null,
  opponent: null,
  loading: false,
  error: null,
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MATCH_FIND_REQUEST":
      return { ...state, loading: true, error: null };
    case "MATCH_FOUND":
      return {
        ...state,
        matchId: action.payload.matchId,
        opponent: action.payload.opponent,
        loading: false,
      };
    case "MATCH_FIND_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default matchReducer;
