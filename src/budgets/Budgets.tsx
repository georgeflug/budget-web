import React from "react";
import {useSelector} from "react-redux";

export function Budgets() {
  const count = useSelector((state: any) => state.count);

  return (
    <div>
      Budgets will live here #{count}
    </div>
  );
}