import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {chain} from 'lodash';
import {TransactionsTable} from "./TransactionsTable";

export function Transactions() {
  const count = useSelector((state: any) => state.count);
  const transactions = useSelector((state: any) => state.transactions);
  const top10Transactions = chain(transactions)
    .sortBy((transaction) => transaction.postedDate)
    .reverse()
    .slice(0, 10)
    .value();
  const dispatch = useDispatch();

  return (
    <div>
      Transactions will live here #{count}<br/>Transaction count: {transactions.length}<br/>
      <button onClick={() => dispatch({type: "ADD_COUNT"})}>Add to count</button>

      <TransactionsTable transactions={top10Transactions}/>
    </div>
  );
}
