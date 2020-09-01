import React, {useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import {Collapse, lighten, TableCell} from "@material-ui/core";
import {getAllMonths} from "./getAllMonths";
import {useSelector} from "react-redux";
import {Transaction} from "../transactions/transactionModel";
import {getMonthTotal} from "./getMonthTotal";
import {getAllocation, hasAllocation} from "./hasAllocation";
import {getRemainingAllocation} from "./getRemainingAllocation";
import {formatCurrencyRounded} from "../currency/formatCurrency";
import {TransactionsTable} from "../transactions/TransactionsTable";
import {filterByDate} from "../transactions/filters/dateFilter/filterByDate";
import {filterByCategory} from "../transactions/filters/categoryFilter/filterByCategory";
import {getOneMonthRange} from "./getOneMonthRange";
import {chain} from "lodash";
import {isEqual} from "date-fns";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  cell: {
    cursor: 'pointer',
    "&:hover": {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    '&[aria-checked="true"]': theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      }
  },
}));

export function BudgetRow(props: { category: string }) {
  const category = props.category;
  const classes = useStyles();

  const months = getAllMonths().reverse();
  const transactions = useSelector((state: any) => state.transactions) as Transaction[];
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);

  const selectedTransactions = !selectedMonth ? [] : chain(transactions)
    .filter(transaction => filterByDate(transaction, getOneMonthRange(selectedMonth)))
    .filter(transaction => filterByCategory(transaction, category))
    .sortBy(transaction => transaction.postedDate)
    .reverse()
    .value();

  const handleCellClick = (month: Date) => {
    if (selectedMonth !== null && isEqual(selectedMonth, month)) {
      setSelectedMonth(null);
    } else {
      setSelectedMonth(month)
    }
  };

  return (
    <React.Fragment>
      <TableRow key={category}>
        <TableCell>{category}{hasAllocation(category) && (
          <div><br/><span>{formatCurrencyRounded(getAllocation(category))}/month</span></div>
        )}</TableCell>
        {months.map(month => (
          <TableCell
            aria-checked={!!(selectedMonth && isEqual(selectedMonth, month))}
            className={classes.cell}
            onClick={() => handleCellClick(month)}
          >
            {formatCurrencyRounded(getMonthTotal(transactions, category, month))}
            {hasAllocation(category) && (
              <div>
                <br/><span>{formatCurrencyRounded(getRemainingAllocation(transactions, category, month))} left</span>
              </div>
            )}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={13}>
          <Collapse in={!!selectedMonth} timeout="auto" unmountOnExit>
            <TransactionsTable transactions={selectedTransactions}/>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
