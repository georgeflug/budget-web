import React from "react";
import {CategoryFilter} from "./filters/categoryFilter/CategoryFilter";
import {DateFilter} from "./filters/dateFilter/DateFilter";
import {Grid} from "@material-ui/core";

export function TransactionFilters() {
  return (
    <Grid container>
      <Grid item xs={4} md={2} lg={1}>
        <CategoryFilter/>
      </Grid>
      <Grid item xs={4} md={2} lg={1}>
        <DateFilter/>
      </Grid>
    </Grid>
  );
}
