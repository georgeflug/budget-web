import {Transaction} from "../transactions/transactionModel";
import {DateRange} from "../transactions/filters/dateFilter/dateOptions";
import {differenceInMonths, endOfMonth, subMonths} from "date-fns";
import {chain} from "lodash";
import {filterByCategory} from "../transactions/filters/categoryFilter/filterByCategory";
import {filterByDate} from "../transactions/filters/dateFilter/filterByDate";
import {firstDate} from "../util/firstDate";
import {budgetAllocations} from "./budget-allocations";

export function getAllocated(category: string, month: Date) {
  const allocations = chain(budgetAllocations)
    .filter(allocation => allocation.category === category)
    .filter(allocation => allocation.startDate <= month)
    .sortBy(allocation => allocation.startDate)
    .value();

  let endDates = allocations
    .slice(1)
    .map(allocation => subMonths(allocation.startDate, 1))
    .concat([month]);

  let total = 0;
  for (let i = 0; i < allocations.length; i++) {
    const monthCount = differenceInMonths(endDates[i], allocations[i].startDate) + 1;
    total += monthCount * allocations[i].amount;
  }
  return total;
}

export function getRemainingAllocation(transactions: Transaction[], category: string, month: Date) {
  const dateRange: DateRange = {
    start: firstDate,
    end: endOfMonth(month),
  };

  const spent = chain(transactions)
    .filter(transaction => filterByCategory(transaction, category))
    .filter(transaction => filterByDate(transaction, dateRange))
    .sumBy(transaction => transaction.totalAmount)
    .valueOf();

  const allocated = getAllocated(category, month);
  return allocated - spent;
}
