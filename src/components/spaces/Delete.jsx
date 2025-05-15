import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, TriangleAlert } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSpace } from "@/api/SpacesApi";
import { toast } from "sonner";

const Delete = ({ space }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteSpace,
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Error al eliminar el espacio");
    },
    onSuccess: (respuesta) => {
      toast(respuesta.message || "Espacio eliminado correctamente");

      queryClient.invalidateQueries({ queryKey: ["spaces"] });
    },
  });

  const handleDelete = async (data) => {
    console.log(data);
    await mutation.mutateAsync(data);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <Trash2 className="w-5 h-5" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-3/5 md:h-auto w-full md:w-2/5">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl mb-2">
            ¿Estás seguro que deseas eliminar el siguiente Espacio?
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-0.5">
            <span className="block">
              <span className="font-bold text-slate-400 mr-1">Nombre:</span>{" "}
              {space.name}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleDelete(space);
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
