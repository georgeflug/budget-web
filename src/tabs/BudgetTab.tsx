import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {TableCell} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import {format} from "date-fns";
import {budgetCategories} from "../budgets/budget-categories";
import {getAllMonths} from "../budgets/getAllMonths";
import {useSelector} from "react-redux";
import {Transaction} from "../transactions/transactionModel";
import {getMonthTotal} from "../budgets/getMonthTotal";

export function BudgetTab() {
  const months = getAllMonths().reverse();
  const transactions = useSelector((state: any) => state.transactions) as Transaction[];

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              {months.map(month => (<TableCell>{format(month, "MMM yyyy")}</TableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>
            {budgetCategories.map(category => (
              <TableRow key={category}>
                <TableCell>{category}</TableCell>
                {months.map(month => (
                  <TableCell>{getMonthTotal(transactions, category, month)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
