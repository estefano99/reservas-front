"use client"

import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TimeSlots({ slots, onSlotSelect }) {
  if (slots.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Selecciona un espacio y una fecha para ver los turnos disponibles.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {slots.map((slot) => (
        <Button
          key={slot.id}
          variant={slot.available ? "outline" : "ghost"}
          className={cn(
            "h-auto py-4 justify-start",
            slot.available ? "hover:bg-primary/10" : "opacity-60 cursor-not-allowed",
          )}
          onClick={() => slot.available && onSlotSelect(slot)}
          disabled={!slot.available}
        >
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5" />
            <div className="text-left">
              <p className="font-medium">
                {slot.startTime} - {slot.endTime}
              </p>
              <p className="text-xs text-muted-foreground">{slot.available ? "Disponible" : "No disponible"}</p>
            </div>
          </div>
        </Button>
      ))}
    </div>
  )
}
