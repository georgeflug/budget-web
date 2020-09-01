import React from "react";
import {TableCell} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import {format} from 'date-fns';
import {Transaction} from "./transactionModel";
import {formatCurrencyExact} from "../currency/formatCurrency";
import {EditableCategory} from "./EditableCategory";

export function TransactionRow(props: { row: Transaction }) {
  const row = props.row;

  return (
    <React.Fragment>
      <TableRow key={row.recordId}>
        <TableCell>{format(row.postedDate, 'MMM dd, yyyy')}</TableCell>
        <TableCell><EditableCategory row={row}/></TableCell>
        <TableCell>{row.postedDescription}</TableCell>
        <TableCell align="right">{formatCurrencyExact(row.totalAmount)}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}
