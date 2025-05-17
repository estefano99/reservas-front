"use client";

import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TimeSlots({ slots = [], onSlotSelect }) {
  if (slots.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Selecciona un espacio y una fecha para ver los turnos disponibles.
      </div>
    );
  }

  console.log(slots);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {slots.map((slot) => (
        <Button
          key={slot.id}
          variant={slot.available ? "outline" : "ghost"}
          className={cn(
            "h-auto py-4 justify-start",
            slot.available
              ? "hover:bg-primary/10 cursor-pointer"
              : "opacity-60 cursor-not-allowed"
          )}
          onClick={() => slot.available && onSlotSelect(slot)}
          disabled={!slot.available}
        >
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5" />
            <div className="text-left">
              <p className="font-medium">
                {slot.start_time} - {slot.end_time}
              </p>
              <p className="text-xs text-muted-foreground">
                {slot.available ? "Disponible" : "No disponible"}
              </p>
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
}

// Función de utilidad para combinar clases de Tailwind
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
