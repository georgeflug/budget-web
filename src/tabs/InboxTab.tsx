import React from "react";
import {useSelector} from "react-redux";
import {chain} from 'lodash';
import {Transaction} from "../transactions/Transaction";
import {filterByCategory} from "../transactions/filters/categoryFilter/filterByCategory";
import {TransactionsTable} from "../transactions/TransactionsTable";

export function InboxTab() {
  const transactions = useSelector((state: any) => state.transactions) as Transaction[];
  const filteredTransactions = chain(transactions)
    .filter(transaction => filterByCategory(transaction, 'To be determined'))
    .sortBy((transaction) => transaction.postedDate)
    .reverse()
    .value();

  return (
    <div>
      <TransactionsTable transactions={filteredTransactions}/>
    </div>
  );
}
