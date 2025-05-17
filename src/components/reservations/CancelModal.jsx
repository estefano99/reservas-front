import { Button } from "../ui/button";
import { Clock, House } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cancelReservation } from "@/api/ReservationApi";

export function CancelModal({ isOpen, reservation, onClose }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => cancelReservation(reservation.id),
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Hubo un error al cancelar la reserva");
    },
    onSuccess: async (respuesta) => {
      toast(respuesta.message || "Reserva cancelada correctamente");
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      onClose();
    },
  });

  async function onSubmit(e) {
    e.preventDefault();
    const values = {
      id: reservation.id,
    };
    await mutation.mutateAsync(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={onSubmit}>
          <DialogHeader className="mb-2">
            <DialogTitle>
              ¿Estás seguro que deseas cancelar la reserva?
            </DialogTitle>
            <DialogDescription className="text-yellow-500 font-bold">
              El proceso es irreversible
            </DialogDescription>
          </DialogHeader>
          <p>Espacio: {reservation.space.name}</p>
          <p>Inicio: {reservation.start_time}</p>
          <p>Fin: {reservation.end_time}</p>
          <DialogFooter className={"mt-4"}>
            <Button
              className="cursor-pointer"
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button className="cursor-pointer" type="submit">
              Confirmar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
