import React from "react";
import {CategoryFilter} from "./filters/categoryFilter/CategoryFilter";
import {DateFilter} from "./filters/dateFilter/DateFilter";

export function TransactionFilters() {
  return (
    <div>
      <CategoryFilter/>
      <DateFilter/>
    </div>
  );
}
