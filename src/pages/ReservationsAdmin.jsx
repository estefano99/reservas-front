import { getReservations, getReservationsPending } from "@/api/ReservationApi";
import HeaderPages from "@/components/Header";
import TableAdminReservation from "@/components/reservations/TableAdminReservation";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ReservationsAdmin = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["reservationsPending"],
    queryFn: getReservationsPending,
  });
  console.log(response);
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <HeaderPages title={"Reservas Pendientes"} />
      {isLoading
        ? "Cargando..."
        : response && <TableAdminReservation reservations={response?.data || []} />}
    </div>
  );
};

export default ReservationsAdmin;
