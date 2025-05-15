import { getReservations } from "@/api/ReservationApi";
import HeaderPages from "@/components/Header";
import TableReservation from "@/components/reservations/TableReservation";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Reservations = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  });
  console.log(response)
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <HeaderPages title={'Reservas'}/>
      {isLoading
        ? "Cargando..."
        : response && <TableReservation reservations={response?.data || []} />}
    </div>
  );
};

export default Reservations;
