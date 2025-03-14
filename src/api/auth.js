import { api } from "./axios";

export const postRegister = async (email, username, password, role) => {
  await api.post("/auth/register", {
    email,
    username,
    password,
    role,
  });
};

export const postLogin = async (username, password) => {
  await api.post("/auth/login", {
    username,
    password,
  });
};

export const postLogout = async () => {
  await api.post("/auth/logout");
};

export const postRefreshToken = async () => {
  await api.post("/auth/refresh");
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/current-user");
  return response;
};
