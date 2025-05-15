import React from "react";
import FormAlta from "./FormAlta";
import FormEditar from "./FormEditar";
import Delete from "./Delete";
import { Edit2Icon } from "lucide-react";

const TableSpaces = ({ spaces }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [spaceEdit, setSpaceEdit] = React.useState(null);

  const handleEditar = (space) => {
    setSpaceEdit(space);
    setIsEdit(true);
  };
  const handleEliminar = (space) => {
    console.log(space);
  };
  return (
    <div className="w-11/12 mx-auto space-y-4 overflow-x-auto">
      <div className="flex justify-end mb-4">
        <FormAlta />
        {isEdit && setSpaceEdit && (
          <FormEditar
            spaceEdit={spaceEdit}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
            setSpaceEdit={setSpaceEdit}
          />
        )}
      </div>
      <table className="min-w-full divide-y divide-gray-200 border rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Nombre
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Descripcion
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Disponible
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {spaces.length ? (
            spaces.map((space) => (
              <tr key={space.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {space.name ?? "Sin espacio"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {space.description}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {space.available == 1 ? "Disponible" : "No disponible"}
                </td>
                <td className="px-4 py-2 space-x-4 text-sm text-blue-600 hover:underline cursor-pointer">
                  <button
                    onClick={() => handleEditar(space)}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    <Edit2Icon width={18} height={18} />
                  </button>
                  <button
                    onClick={() => handleEliminar(space)}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    <Delete space={space} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-4 text-center text-sm text-gray-500"
              >
                No se encontraron espacios.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableSpaces;
