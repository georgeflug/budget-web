import React, {useState} from "react";
import {Collapse, TableCell} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import {format} from 'date-fns';
import {Transaction} from "./transactionModel";
import {formatCurrencyExact} from "../currency/formatCurrency";
import {EditableCategory} from "./EditableCategory";
import {EditableNote} from "./EditableNote";
import CallSplitIcon from '@material-ui/icons/CallSplit';
import {makeStyles} from "@material-ui/core/styles";
import {TransactionSplitter} from "./splitter/TransactionSplitter";

const useStyles = makeStyles(() => ({
  clickableCell: {
    cursor: 'pointer',
    "&:hover": {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
}));

export function TransactionRow(props: { row: Transaction }) {
  const row = props.row;
  const classes = useStyles();
  const [showSplitView, setShowSplitView] = useState(false);

  const handleAmountClicked = () => {
    setShowSplitView(!showSplitView);
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>{format(row.postedDate, 'MMM dd, yyyy')}</TableCell>
        <TableCell
          align="right"
          className={classes.clickableCell}
          onClick={() => handleAmountClicked()}
        >
          {row.isSplit && (<CallSplitIcon fontSize="inherit"/>)}
          {formatCurrencyExact(row.amount)}
        </TableCell>
        <TableCell><EditableCategory row={row}/></TableCell>
        <TableCell>{row.postedDescription}</TableCell>
        <TableCell><EditableNote row={row}/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={showSplitView ? {} : {paddingBottom: 0, paddingTop: 0}} colSpan={13}>
          <Collapse in={showSplitView} timeout="auto" unmountOnExit>
            <TransactionSplitter row={row} onClose={() => handleAmountClicked()}/>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
