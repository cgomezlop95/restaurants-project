import { api } from "./api";

const postLogin = async ({ email, password }) => {
  const { data } = await api.post("/api/user/login", {
    email,
    password,
  });
  return data;
};

const postRegister = async ({ email, password, username }) => {
  const { data } = await api.post("/api/user/signup", {
    email,
    password,
    username,
  });
  return data;
};

const isUserLoggedIn = async () => {
  const { data } = await api.get("/api/user/logged-in");
  return data;
};

const clearCookie = async () => {
  const { data } = await api.get("/api/user/logout");
  return data;
};

export { postLogin, postRegister, isUserLoggedIn, clearCookie };
