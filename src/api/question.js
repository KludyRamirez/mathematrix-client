import { api } from "./axios";

export const postQuestion = async (
  question,
  category,
  options,
  correctAnswer
) => {
  const response = await api.post("/question/add", {
    question,
    category,
    options,
    correctAnswer,
  });
  return response;
};

export const getAllQuestions = async () => {
  const response = await api.get("/question/get");
  return response;
};

// export const getQuestionById = async (id) => {
//   const response = await api.get(`/question/get/${id}`);
//   return response;
// };

export const putQuestion = async (id) => {
  const response = await api.put(`/question/update/${id}`);
  return response;
};

export const deleteQuestion = async (id) => {
  const response = await api.delete(`/question/delete/${id}`);
  return response;
};
