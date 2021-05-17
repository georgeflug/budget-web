import {Transaction} from "../transactions/transactionModel";
import {chain} from "lodash";
import {filterByCategory} from "../transactions/filters/categoryFilter/filterByCategory";
import {filterByDate} from "../transactions/filters/dateFilter/filterByDate";
import {getOneMonthRange} from "./getOneMonthRange";

export function getMonthTotal(transactions: Transaction[], category: string, month: Date): number {
  const dateRange = getOneMonthRange(month);

  return chain(transactions)
    .filter(transaction => filterByCategory(transaction, category))
    .filter(transaction => filterByDate(transaction, dateRange))
    .sumBy(transaction => transaction.amount)
    .valueOf();
}
