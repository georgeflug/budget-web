import {DateRange} from "../transactions/filters/dateFilter/dateOptions";
import {endOfMonth, startOfMonth} from "date-fns";

export const getOneMonthRange = (month: Date): DateRange => {
  return {
    start: startOfMonth(month),
    end: endOfMonth(month),
  };
};
