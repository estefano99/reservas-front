import clienteAxios from "@/config/axios";
import { routes } from "@/lib/routes";
import { isAxiosError } from "axios";

export const getReservations = async () => {
  try {
    const { data } = await clienteAxios.get(routes.reservations);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};