import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {makeStyles, TableCell} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import {format} from "date-fns";
import {budgetCategories} from "../budgets/budget-categories";
import {getAllMonths} from "../budgets/getAllMonths";
import {BudgetRow} from "../budgets/BudgetRow";

const useStyles = makeStyles((theme) => ({
  firstColumn: {
    position: "sticky",
    zIndex: 3,
    borderRight: "1px solid rgba(224, 224, 224, 1)"
  },
}));

export function BudgetTab() {
  const classes = useStyles();
  const months = getAllMonths().reverse();

  return (
    <div>
      <TableContainer component={Paper} style={{maxHeight: '850px'}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={classes.firstColumn}>Category</TableCell>
              {months.map(month => (<TableCell key={month.getTime()}>{format(month, "MMM yyyy")}</TableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>
            {budgetCategories.map(category => (<BudgetRow key={category} category={category}/>))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
