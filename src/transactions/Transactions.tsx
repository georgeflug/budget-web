import React from "react";
import {useSelector} from "react-redux";
import {chain} from 'lodash';
import {TransactionsTable} from "./TransactionsTable";
import {TransactionFilters} from "./TransactionFilters";
import {Transaction} from "./Transaction";
import {useCategoryFilter} from "./filters/categoryFilter/categoryFilterRedux";
import {filterByCategory} from "./filters/categoryFilter/filterByCategory";

export function Transactions() {
  const {categoryFilter} = useCategoryFilter();
  const transactions = useSelector((state: any) => state.transactions) as Transaction[];
  const filteredTransactions = chain(transactions)
    .filter(transaction => filterByCategory(transaction, categoryFilter))
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
