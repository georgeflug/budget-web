import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {chain} from 'lodash';
import {TransactionsTable} from "./TransactionsTable";
import {TransactionFilters} from "./TransactionFilters";
import {Transaction} from "./Transaction";

export function Transactions() {
  const count = useSelector((state: any) => state.count);
  const categoryFilter = useSelector((state: any) => state.categoryFilter);
  const transactions = useSelector((state: any) => state.transactions) as Transaction[];
  const filteredTransactions = chain(transactions)
    .filter(transaction => transaction.splits[0].budget === categoryFilter)
    .sortBy((transaction) => transaction.postedDate)
    .reverse()
    .value();
  const dispatch = useDispatch();

  return (
    <div>
      Transactions will live here #{count}<br/>Transaction count: {transactions.length}<br/>
      <button onClick={() => dispatch({type: "ADD_COUNT"})}>Add to count</button>

      <TransactionFilters/>
      <TransactionsTable transactions={filteredTransactions}/>
    </div>
  );
}
