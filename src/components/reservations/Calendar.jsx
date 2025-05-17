import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";

export function CalendarPicker({ selectedDate, onDateChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Fecha</label>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onDateChange(date)}
        locale={es}
        fromDate={new Date()} // Solo fechas desde hoy en adelante
      />
    </div>
  );
}
