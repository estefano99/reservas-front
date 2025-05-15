import clienteAxios from "@/config/axios";
import { routes } from "@/lib/routes";
import { isAxiosError } from "axios";

export const login = async (user) => {
  try {
    const { data } = await clienteAxios.post(routes.login, user);
    console.log(data)
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
    const { data } = await clienteAxios(obtenerUsuarioRoute);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};
