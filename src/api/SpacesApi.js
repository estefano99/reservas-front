import clienteAxios from "@/config/axios";
import { routes } from "@/lib/routes";
import { isAxiosError } from "axios";

export const getSpaces = async () => {
  try {
    const { data } = await clienteAxios.get(routes.spaces);
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const createSpace = async (space) => {
  try {
    const { data } = await clienteAxios.post(routes.spaces, space);
    return data;
  } catch (error) {
    console.log("[ERROR] crearSpace: ", error);
    if (isAxiosError(error) && error.response?.data.message) {
      throw new Error(error.response.data.message);
    }
    if (isAxiosError(error) && error.response?.data.errors) {
      throw new Error(
        error.response.data.errors.map((err) => err.msg).join(", ")
      );
    }
    throw error;
  }
};

export const editSpace = async (space) => {
  try {
    const { data } = await clienteAxios.put(
      `${routes.spaces}/${space.id}`,
      space
    );
    return data;
  } catch (error) {
    console.log("[ERROR] editSpace: ", error);
    if (isAxiosError(error) && error.response?.data.message) {
      throw new Error(error.response.data.message);
    }
    if (isAxiosError(error) && error.response?.data.errors) {
      throw new Error(
        error.response.data.errors.map((err) => err.msg).join(", ")
      );
    }
    throw error;
  }
};

export const deleteSpace = async (space) => {
  try {
    const { data } = await clienteAxios.delete(`${routes.spaces}/${space.id}`);
    return data;
  } catch (error) {
    console.log("[ERROR] deleteSpace: ", error);
    if (isAxiosError(error) && error.response?.data.message) {
      throw new Error(error.response.data.message);
    }
    if (isAxiosError(error) && error.response?.data.errors) {
      throw new Error(
        error.response.data.errors.map((err) => err.msg).join(", ")
      );
    }
    throw error;
  }
};
