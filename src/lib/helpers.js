import { format } from "date-fns";

export const fomatDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

export const reservationStatus = {
  pending: {
    label: "Pendiente",
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  approved: {
    label: "Aprobado",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  canceled: {
    label: "Cancelado",
    color: "text-gray-600",
    bg: "bg-gray-100",
  },
  rejected: {
    label: "Rechazado",
    color: "text-red-600",
    bg: "bg-red-100",
  },
};
