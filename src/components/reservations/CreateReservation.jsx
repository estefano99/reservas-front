import { useState } from "react";
import { SpaceSelector } from "./SpaceSelector";
import { CalendarPicker } from "./Calendar";
import { TimeSlots } from "./TimeSlots";
import { ReservationModal } from "./ReservationModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HeaderPages from "../Header";
import { useQuery } from "@tanstack/react-query";
import { getSpaces } from "@/api/SpacesApi";
import { getSlots } from "@/api/ReservationApi";
import { fomatDate } from "@/lib/helpers";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { routes } from "@/lib/routes";
import { Button } from "../ui/button";

export function CreateReservation() {
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const { data: response, isLoading } = useQuery({
    queryKey: ["spaces"],
    queryFn: getSpaces,
  });

  // Actualizar slots de tiempo cuando cambia el espacio o la fecha
  const updateTimeSlots = async (space, date) => {
    setSelectedSpace(space);
    setSelectedDate(date);

    if (space && date) {
      const formattedDate = fomatDate(date);
      const slotsResponse = await getSlots(space.id, formattedDate);
      setTimeSlots(slotsResponse);
    }
  };

  // Manejar cambio de espacio
  const handleSpaceChange = async (space) => {
    setSelectedSpace(space);
    if (selectedDate) {
      await updateTimeSlots(space, selectedDate);
    }
  };

  // Manejar cambio de fecha
  const handleDateChange = async (date) => {
    setSelectedDate(date);
    if (selectedSpace) {
      await updateTimeSlots(selectedSpace, date);
    }
  };

  // Manejar selección de slot
  const handleSlotSelect = (slot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="w-full space-y-8">
      <HeaderPages title="Crear Reserva" />
      <div className="flex justify-end mb-4 w-[90%] mx-auto ">
        <Button
          onClick={() => navigate(routes.reservationsFront)}
          className="flex gap-2 items-center cursor-pointer"
        >
          <MoveLeft /> Regresar
        </Button>
      </div>
      <Card className={"w-[90%] mx-auto"}>
        <CardHeader>
          <CardTitle>Selecciona un Espacio y Fecha</CardTitle>
          <CardDescription>
            Elige el espacio que deseas reservar y la fecha para ver los turnos
            disponibles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 ">
          {!isLoading && (
            <SpaceSelector
              spaces={response || []}
              onSpaceChange={handleSpaceChange}
            />
          )}
          <div className="w-full">
            <CalendarPicker
              onDateChange={handleDateChange}
              selectedDate={selectedDate}
            />
          </div>
        </CardContent>
      </Card>

      {selectedSpace && (
        <Card className="w-[90%] mx-auto">
          <CardHeader>
            <CardTitle>Turnos Disponibles</CardTitle>
            <CardDescription>
              {selectedSpace.name} - {selectedDate.toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TimeSlots slots={timeSlots} onSlotSelect={handleSlotSelect} />
          </CardContent>
        </Card>
      )}

      {isModalOpen && selectedSlot && selectedSpace && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          space={selectedSpace}
          date={selectedDate}
          timeSlot={selectedSlot}
          setTimeSlots={setTimeSlots}
        />
      )}
    </div>
  );
}
