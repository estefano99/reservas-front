import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const TableReservation = ({ reservations }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/reservations/create");
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
              <tr key={res.id} className="hover:bg-gray-50">
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
                <td className="px-4 py-2 text-sm text-blue-600 hover:underline cursor-pointer">
                  Editar
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
    </div>
  );
};

export default TableReservation;
