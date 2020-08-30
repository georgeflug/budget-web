import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {TableCell} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import {format} from 'date-fns';

export function Transactions() {
  const count = useSelector((state: any) => state.count);
  const transactions = useSelector((state: any) => state.transactions);
  const top10Transactions = transactions
    .slice(0, 10);
  const dispatch = useDispatch();

  return (
    <div>
      Transactions will live here #{count}<br/>Transaction count: {transactions.length}<br/>
      <button onClick={() => dispatch({type: "ADD_COUNT"})}>Add to count</button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top10Transactions.map((row: any) => (
              <TableRow key={row.recordId}>
                <TableCell>{format(row.postedDate, 'MMM dd')}</TableCell>
                <TableCell>{row.postedDescription}</TableCell>
                <TableCell align="right">{row.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
