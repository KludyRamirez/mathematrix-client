import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/authReducer";
import matchReducer from "./store/reducers/matchReducer";
import questionReducer from "./store/reducers/questionReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  match: matchReducer,
  question: questionReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
