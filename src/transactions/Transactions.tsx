import React from "react";
import {useDispatch, useSelector} from "react-redux";

export function Transactions() {
  const count = useSelector((state: any) => state.count);
  const transactions = useSelector((state: any) => state.transactions);
  const dispatch = useDispatch();

  return (
    <div>
      Transactions will live here #{count}<br/>Transaction count: {transactions.length}<br/>
      <button onClick={() => dispatch({ type: "ADD_COUNT"})}>Add to count</button>
    </div>
  );
}
