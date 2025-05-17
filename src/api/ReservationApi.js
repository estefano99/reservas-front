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

export const getSlots = async (spaceId, date) => {
  console.log(spaceId, date);
  const { data } = await clienteAxios.get("/reservations/by-space", {
    params: {
      space_id: spaceId,
      date,
    },
  });
  console.log(data.data);
  return data.data;
};

export const createReservation = async (values) => {
  try {
    const { data } = await clienteAxios.post(routes.reservations, values);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const cancelReservation = async (id) => {
  try {
    const { data } = await clienteAxios.delete(`${routes.reservations}/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};
