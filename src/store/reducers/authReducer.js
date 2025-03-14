const initialState = {
  user: null,
  error: null,
  loading: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return { ...state, loading: true };
    case "FETCH_USER_SUCCESS":
      return { ...state, user: action.payload, error: null, loading: false };
    case "FETCH_USER_FAIL":
      return { ...state, user: null, error: action.payload, loading: false };
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
};

export default authReducer;
