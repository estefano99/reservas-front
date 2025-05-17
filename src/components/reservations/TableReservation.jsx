import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { CircleX } from "lucide-react";
import { useState } from "react";
import { CancelModal } from "./CancelModal";

const TableReservation = ({ reservations }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/reservas/crear");
  };

  const handleCancel = (reservation) => {
    if (reservation.status === "cancelled") {
      return;
    }
    setSelectedReservation(reservation);
    setModalOpen(true);
  };

  return (
    <div className="w-11/12 mx-auto overflow-x-auto">
      <div onClick={handleClick} className="flex justify-end mb-4">
        <Button variant={"secondary"} className="cursor-pointer">
          Reservar turno
        </Button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 border rounded-md">
        <thead className="bg-gray-100">
          <tr>
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
                  {res.space?.name ?? "Sin espacio"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {res.start_time}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {res.end_time}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 capitalize">
                  {res.status}
                </td>
                <td
                  onClick={() => handleCancel(res)}
                  className={`px-4 py-2 text-sm text-red-600 hover:underline ${
                    res.status === "cancelled"
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <CircleX className="h-6 w-6" />
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

export default TableReservation;
