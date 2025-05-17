import { Button } from "../ui/button";
import { Calendar, Clock, House } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createReservation, getSlots } from "@/api/ReservationApi";
import { fomatDate } from "@/lib/helpers";
import { format } from "date-fns";

export function ReservationModal({
  isOpen,
  onClose,
  space,
  date,
  timeSlot,
  setTimeSlots,
}) {
  const fetchSlots = async () => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const data = await getSlots(space.id, formattedDate);
    return data;
  };

  const mutation = useMutation({
    mutationFn: createReservation,
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Hubo un error al generar la reserva");
    },
    onSuccess: async (respuesta) => {
      toast.success(respuesta.message || "Reserva generada correctamente");

      const updatedSlots = await fetchSlots();
      setTimeSlots(updatedSlots);

      onClose();
    },
  });

  async function onSubmit(e) {
    e.preventDefault();
    console.log(format(date, "yyyy-MM-dd") + " " + timeSlot.start_time);
    console.log(format(date, "yyyy-MM-dd") + " " + timeSlot.end_time);
    const values = {
      space_id: space.id,
      start_time: format(date, "yyyy-MM-dd") + " " + timeSlot.start_time,
      end_time: format(date, "yyyy-MM-dd") + " " + timeSlot.end_time,
    };
    await mutation.mutateAsync(values);
  }
  console.log(date);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>
              ¿Estás seguro que deseas confirmar la reserva?
            </DialogTitle>
            <DialogDescription>
              Pasará a estar pendiente, hasta que el administrador la apruebe o
              la rechace.
            </DialogDescription>
            <div className="flex flex-col gap-4 text-sm bg-gray-200 text-black p-4 rounded-md">
              <div className="flex items-center gap-2">
                <House className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{space.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{fomatDate(date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {timeSlot.start_time} - {timeSlot.end_time}
                </span>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className={"mt-4"}>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Confirmar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
