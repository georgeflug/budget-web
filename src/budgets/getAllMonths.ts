import {addMonths} from "date-fns";
import {firstDate} from "../util/firstDate";

export function getAllMonths(): Date[] {
  const today = new Date();

  const months = [];
  let currentMonth = firstDate;
  while (currentMonth <= today) {
    months.push(currentMonth);
    currentMonth = addMonths(currentMonth, 1);
  }
  return months;
}
