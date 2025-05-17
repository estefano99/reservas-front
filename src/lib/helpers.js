import { format } from "date-fns";

export const fomatDate = (date) => {
  return format(date, "yyyy-MM-dd");
};