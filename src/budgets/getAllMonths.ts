import {addMonths} from "date-fns";

export function getAllMonths() {
  const today = new Date();
  const firstDay = new Date(2018, 8, 1);

  const months = [];
  let currentMonth = firstDay;
  while (currentMonth <= today) {
    months.push(currentMonth);
    currentMonth = addMonths(currentMonth, 1);
  }
  return months;
}
