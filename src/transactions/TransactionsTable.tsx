import React from "react";
import {TableCell, TablePagination} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import {Transaction} from "./transactionModel";
import {TransactionRow} from "./TransactionRow";

export function TransactionsTable(props: { transactions: Transaction[] }) {
  const transactions = props.transactions;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const pagedTransactions = transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagedTransactions.map((row: Transaction) => (<TransactionRow key={row.key} row={row}/>))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 100, 1000, 10000]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
