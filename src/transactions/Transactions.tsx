import React from "react";
import {useSelector} from "react-redux";
import {chain} from 'lodash';
import {TransactionsTable} from "./TransactionsTable";
import {TransactionFilters} from "./TransactionFilters";
import {Transaction} from "./Transaction";
import {useCategoryFilter} from "./filters/categoryFilter/categoryFilterRedux";
import {filterByCategory} from "./filters/categoryFilter/filterByCategory";
import {useDateFilter} from "./filters/dateFilter/dateFilterRedux";
import {filterByDate} from "./filters/dateFilter/filterByDate";

export function Transactions() {
  const {categoryFilter} = useCategoryFilter();
  const {dateRange} = useDateFilter();
  const transactions = useSelector((state: any) => state.transactions) as Transaction[];
  const filteredTransactions = chain(transactions)
    .filter(transaction => filterByCategory(transaction, categoryFilter))
    .filter(transaction => filterByDate(transaction, dateRange))
    .sortBy((transaction) => transaction.postedDate)
    .reverse()
    .value();

  return (
    <div>
      <TransactionFilters/>
      <TransactionsTable transactions={filteredTransactions}/>
    </div>
  );
}
