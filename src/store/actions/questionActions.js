import {
  postQuestion,
  getAllQuestions,
  putQuestion,
  deleteQuestion,
} from "../../api/question";
import toast from "react-hot-toast";

export const addQuestion =
  (question, category, options, correctAnswer) => async (dispatch) => {
    try {
      const result = await postQuestion(
        question,
        category,
        options,
        correctAnswer
      );
      toast.success(result?.data?.message);
      console.log(result?.data);
      dispatch(fetchAllQuestions());
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "An error occurred"
      );
    }
  };

export const fetchAllQuestions = () => async (dispatch) => {
  dispatch({ type: "FETCH_QUESTIONS" });

  try {
    const result = await getAllQuestions();
    dispatch({ type: "FETCH_QUESTIONS_SUCCESS", payload: result.data });
  } catch (error) {
    dispatch({
      type: "FETCH_QUESTIONS_FAIL",
      payload:
        error?.response?.data?.message || error?.message || "An error occurred",
    });
    toast.error(
      error?.response?.data?.message || error?.message || "An error occurred"
    );
  }
};

export const updateQuestion = (id) => async (dispatch) => {
  try {
    const result = await putQuestion(id);
    toast.success(result?.data?.message);
    dispatch(fetchAllQuestions());
  } catch (error) {
    toast.error(
      error?.response?.data?.message || error?.message || "An error occurred"
    );
  }
};

export const removeQuestion = (id) => async (dispatch) => {
  try {
    const result = await deleteQuestion(id);
    toast.success(result?.data?.message);
    dispatch(fetchAllQuestions());
  } catch (error) {
    toast.error(
      error?.response?.data?.message || error?.message || "An error occurred"
    );
  }
};
