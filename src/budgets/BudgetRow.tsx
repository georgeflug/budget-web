import React from "react";
import TableRow from "@material-ui/core/TableRow";
import {TableCell} from "@material-ui/core";
import {getAllMonths} from "./getAllMonths";
import {useSelector} from "react-redux";
import {Transaction} from "../transactions/transactionModel";
import {getMonthTotal} from "./getMonthTotal";
import {getAllocation, hasAllocation} from "./hasAllocation";
import {getRemainingAllocation} from "./getRemainingAllocation";
import {formatCurrencyRounded} from "../currency/formatCurrency";

export function BudgetRow(props: { category: string }) {
  const category = props.category;

  const months = getAllMonths().reverse();
  const transactions = useSelector((state: any) => state.transactions) as Transaction[];

  return (
    <React.Fragment>
      <TableRow key={category}>
        <TableCell>{category}{hasAllocation(category) && (
          <div><br/><span>{formatCurrencyRounded(getAllocation(category))}/month</span></div>
        )}</TableCell>
        {months.map(month => (
          <TableCell>
            {formatCurrencyRounded(getMonthTotal(transactions, category, month))}
            {hasAllocation(category) && (
              <div>
                <br/><span>{formatCurrencyRounded(getRemainingAllocation(transactions, category, month))} left</span>
              </div>
            )}
          </TableCell>
        ))}
      </TableRow>
    </React.Fragment>
  );
}
