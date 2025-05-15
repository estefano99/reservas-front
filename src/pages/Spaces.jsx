import { getSpaces } from "@/api/SpacesApi";
import HeaderPages from "@/components/Header";
import TableSpaces from "@/components/spaces/TableSpace";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Spaces = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["spaces"],
    queryFn: getSpaces,
  });
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <HeaderPages title={"Espacios"} />
      {isLoading
        ? "Cargando..."
        : response && <TableSpaces spaces={response || []} />}
    </div>
  );
};

export default Spaces;
