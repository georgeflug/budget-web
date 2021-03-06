import React from "react";
import {useSelector} from "react-redux";
import {chain} from 'lodash';
import {TransactionsTable} from "../transactions/TransactionsTable";
import {TransactionFilters} from "../transactions/TransactionFilters";
import {Transaction} from "../transactions/transactionModel";
import {useCategoryFilter} from "../transactions/filters/categoryFilter/categoryFilterRedux";
import {filterByCategory} from "../transactions/filters/categoryFilter/filterByCategory";
import {useDateFilter} from "../transactions/filters/dateFilter/dateFilterRedux";
import {filterByDate} from "../transactions/filters/dateFilter/filterByDate";
import {filterBySearchText} from "../transactions/filters/searchFilter/filterBySearchText";
import {useSearchFilter} from "../transactions/filters/searchFilter/searchFilterRedux";

export function TransactionTab() {
  const {categoryFilter} = useCategoryFilter();
  const {dateRange} = useDateFilter();
  const {searchFilter} = useSearchFilter();
  const transactions = useSelector((state: any) => state.transactions) as Transaction[];
  const filteredTransactions = chain(transactions)
    .filter(transaction => filterByCategory(transaction, categoryFilter))
    .filter(transaction => filterByDate(transaction, dateRange))
    .filter(transaction => filterBySearchText(transaction, searchFilter))
    .sortBy(transaction => transaction.postedDate)
    .reverse()
    .value();

  return (
    <div>
      <TransactionFilters/>
      <TransactionsTable transactions={filteredTransactions}/>
    </div>
  );
}
