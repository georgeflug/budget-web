import React from "react";
import {TableCell} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import {Transaction} from "./transactionModel";
import {TransactionRow} from "./TransactionRow";

export function TransactionsTable(props: { transactions: Transaction[] }) {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.transactions.map((row: Transaction) => (<TransactionRow row={row}/>))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
