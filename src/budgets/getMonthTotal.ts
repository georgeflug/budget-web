import {Transaction} from "../transactions/transactionModel";
import { chain } from "lodash";
import {filterByCategory} from "../transactions/filters/categoryFilter/filterByCategory";
import {filterByDate} from "../transactions/filters/dateFilter/filterByDate";
import {DateRange} from "../transactions/filters/dateFilter/dateOptions";
import {endOfMonth, startOfMonth} from "date-fns";

export function getMonthTotal(transactions: Transaction[], category: string, month: Date): number {
  const dateRange: DateRange = {
    start: startOfMonth(month),
    end: endOfMonth(month),
  };

  return chain(transactions)
    .filter(transaction => filterByCategory(transaction, category))
    .filter(transaction => filterByDate(transaction, dateRange))
    .sumBy(transaction => transaction.amount)
    .valueOf();
}
