import { Badge } from "@/components/ui/badge";
import { reservationStatus } from "@/lib/helpers";

export const BadgeStatus = ({ status }) => {
  return (
    <Badge
      variant="outline"
      className={`${reservationStatus[status]?.color} ${
        reservationStatus[status]?.bg
      }`}
    >
      {reservationStatus[status]?.label}
    </Badge>
  );
};
