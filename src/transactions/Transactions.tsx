import React from "react";
import {useDispatch, useSelector} from "react-redux";

export function Transactions() {
  const count = useSelector((state: any) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      Transactions will live here #{count}
      <button onClick={() => dispatch({ type: "ADD_COUNT"})}>Add to count</button>
    </div>
  );
}
