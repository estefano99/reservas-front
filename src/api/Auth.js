import clienteAxios from "@/config/axios";
import { routes } from "@/lib/routes";
import { isAxiosError } from "axios";

export const login = async (user) => {
  try {
    const { data } = await clienteAxios.post(routes.login, user);
    localStorage.setItem("AUTH_TOKEN", data.access_token);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const register = async (user) => {
  try {
    const { data } = await clienteAxios.post(routes.register, user);
    localStorage.setItem("AUTH_TOKEN", data.access_token);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const getUser = async () => {
  try {
    const { data } = await clienteAxios(routes.getUser);
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const logoutAuth = async () => {
  try {
    const { data } = await clienteAxios.post(routes.logout);
    localStorage.removeItem("AUTH_TOKEN");
    console.log(data);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};
