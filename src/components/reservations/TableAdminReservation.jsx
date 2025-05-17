import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CancelModal } from "./CancelModal";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateReservation } from "@/api/ReservationApi";
import { BadgeStatus } from "../Badge";

const TableAdminReservation = ({ reservations }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  console.log(reservations);

  const mutation = useMutation({
    mutationFn: updateReservation,
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Hubo un error al actualizar la reserva");
    },
    onSuccess: (data) => {
      toast.success(data.message || "Reserva actualizada correctamente");
      queryClient.invalidateQueries({ queryKey: ["reservationsPending"] });
    },
  });

  const handleStatusChange = async (reservation, newStatus) => {
    await mutation.mutateAsync({
      id: reservation.id,
      status: newStatus,
    });
  };

  return (
    <div className="w-11/12 mx-auto overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Usuario
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Espacio
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Inicio
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Fin
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Estado
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {reservations.length ? (
            reservations.map((res) => (
              <tr
                key={res.id}
                className={`${
                  res.status === "cancelled" ? "bg-red-100" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-4 py-2 text-sm text-gray-700">
                  {res.user.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {res.space?.name ?? "Sin espacio"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {res.start_time}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {res.end_time}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 capitalize">
                  {<BadgeStatus status={res.status} />}
                </td>
                <td
                  className={`space-x-2 space-y-2 md:space-y-0 py-2 text-sm hover:underline ${
                    res.status === "cancelled"
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <Button
                    onClick={() => handleStatusChange(res, "approved")}
                    variant="success"
                    className="cursor-pointer bg-green-500 hover:bg-green-400"
                  >
                    Aprobar
                  </Button>
                  <Button
                    onClick={() => handleStatusChange(res, "rejected")}
                    variant="destructive"
                    className="cursor-pointer"
                  >
                    Rechazar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-4 text-center text-sm text-gray-500"
              >
                No se encontraron reservas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {modalOpen && (
        <CancelModal
          isOpen={modalOpen}
          reservation={selectedReservation}
          onClose={() => {
            setModalOpen(false);
            setSelectedReservation(null);
          }}
        />
      )}
    </div>
  );
};

export default TableAdminReservation;
