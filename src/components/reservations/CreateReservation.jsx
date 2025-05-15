"use client";

import { useState } from "react";
import { SpaceSelector } from "./SpaceSelector";
import { Calendar } from "./Calendar";
import { TimeSlots } from "./TimeSlots";
import { ReservationModal } from "./ReservationModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Datos de ejemplo
const spaces = [
  { id: "1", name: "Sala de Reuniones A", capacity: 10, location: "Piso 1" },
  { id: "2", name: "Sala de Conferencias", capacity: 30, location: "Piso 2" },
  { id: "3", name: "Oficina Compartida", capacity: 5, location: "Piso 1" },
  { id: "4", name: "Sala de Proyectos", capacity: 8, location: "Piso 3" },
];

// Función para generar slots de tiempo disponibles (simulados) no lo traigo de la db, aunque deberia venir de la api.
const generateTimeSlots = (spaceId, date) => {
  const slots = [];
  const startHour = 8; // 8 AM
  const endHour = 18; // 6 PM

  for (let hour = startHour; hour < endHour; hour++) {
    // Simulamos disponibilidad aleatoria
    const available = Math.random() > 0.3;

    slots.push({
      id: `${spaceId}-${date.toISOString().split("T")[0]}-${hour}`,
      startTime: `${hour}:00`,
      endTime: `${hour + 1}:00`,
      available,
    });
  }

  return slots;
};

export function CreateReservation() {
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Actualizar slots de tiempo cuando cambia el espacio o la fecha
  const updateTimeSlots = (space, date) => {
    const slots = generateTimeSlots(space.id, date);
    setTimeSlots(slots);
  };

  // Manejar cambio de espacio
  const handleSpaceChange = (space) => {
    setSelectedSpace(space);
    if (selectedDate) {
      updateTimeSlots(space, selectedDate);
    }
  };

  // Manejar cambio de fecha
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (selectedSpace) {
      updateTimeSlots(selectedSpace, date);
    }
  };

  // Manejar selección de slot
  const handleSlotSelect = (slot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      setIsModalOpen(true);
    }
  };

  // Manejar confirmación de reserva
  const handleReservationConfirm = (name, email, notes) => {
    // En una aplicación real, aquí enviarías los datos a tu API
    console.log("Reserva confirmada:", {
      space: selectedSpace,
      date: selectedDate,
      timeSlot: selectedSlot,
      user: { name, email },
      notes,
    });

    // Actualizar el slot como no disponible
    if (selectedSlot) {
      const updatedSlots = timeSlots.map((slot) =>
        slot.id === selectedSlot.id ? { ...slot, available: false } : slot
      );
      setTimeSlots(updatedSlots);
    }

    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Selecciona un Espacio y Fecha</CardTitle>
          <CardDescription>
            Elige el espacio que deseas reservar y la fecha para ver los turnos
            disponibles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SpaceSelector spaces={spaces} onSpaceChange={handleSpaceChange} />
          
          <Calendar
            onDateChange={handleDateChange}
            selectedDate={selectedDate}
          />
        </CardContent>
      </Card>

      {selectedSpace && (
        <Card>
          <CardHeader>
            <CardTitle>Turnos Disponibles</CardTitle>
            <CardDescription>
              {selectedSpace.name} - {selectedDate.toLocaleDateString()} -
              Capacidad: {selectedSpace.capacity} personas
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
          onConfirm={handleReservationConfirm}
          space={selectedSpace}
          date={selectedDate}
          timeSlot={selectedSlot}
        />
      )}
    </div>
  );
}
