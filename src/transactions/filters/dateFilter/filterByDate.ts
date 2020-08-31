import {Transaction} from "../../Transaction";
import {DateRange} from "./dateOptions";
import {SmartDate} from "../../../util/smart-date";

export const filterByDate = (transaction: Transaction, dateRange: DateRange) => {
  const postedDate = SmartDate.of(transaction.postedDate);
  return postedDate.isSameOrAfter(dateRange.start) && postedDate.isSameOrBefore(dateRange.end);
};
