const initialState = {
  questions: [],
  error: null,
  loading: false,
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_QUESTIONS":
      return { ...state, loading: true };
    case "FETCH_QUESTIONS_SUCCESS":
      return {
        ...state,
        questions: action.payload,
        error: null,
        loading: false,
      };
    case "FETCH_QUESTIONS_FAIL":
      return {
        ...state,
        questions: null,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default questionReducer;
