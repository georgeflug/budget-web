import React, {useState} from "react";
import {Button, Grid, Paper} from "@material-ui/core";
import {Transaction} from "../transactionModel";
import {useSelector} from "react-redux";
import {chain, sumBy} from "lodash";
import CallSplitIcon from '@material-ui/icons/CallSplit';
import {Split} from "./split";
import {TransactionSplitterRow} from "./TransactionSplitterRow";
import {SaveState} from "../../saveState/saveState";
import {useTransactionSplitterUpdater} from "./useTransactionSplitterUpdater";
import {InlineSaveState} from "../../saveState/InlineSaveState";
import {formatCurrencyExact} from "../../currency/formatCurrency";

export function TransactionSplitter(props: {
  row: Transaction,
  onClose: () => void,
}) {
  const row = props.row;
  const transactions = useSelector((state: any) => state.transactions) as Transaction[];
  const originalSplits = chain(transactions)
    .filter(transaction => transaction.recordId === row.recordId)
    .sortBy(transaction => transaction.splitId)
    .map(transaction => ({
      category: transaction.category,
      amount: transaction.amount,
      notes: transaction.notes,
    } as Split))
    .value();
  const [splits, setSplits] = useState(originalSplits);
  const [saveState, setSaveState] = useState<SaveState>(SaveState.Unchanged);
  const {updateTransaction} = useTransactionSplitterUpdater();

  const handleSplitButtonClicked = () => {
    setSplits([...splits, {
      category: splits[0].category,
      amount: 0.00,
      notes: '',
    }]);
  };

  const handleRemoveButtonClicked = (splitIndex: number) => {
    setSplits([
      {
        ...splits[0],
        amount: Math.round((splits[0].amount + (splits[splitIndex].amount || 0)) * 100) / 100,
      },
      ...splits.slice(1, splitIndex),
      ...splits.slice(splitIndex + 1),
    ]);
  };

  const handleOnChange = (newSplit: Split, splitIndex: number) => {
    const newSplits = [];
    const oldSplit = splits[splitIndex];
    if (splitIndex !== 0) {
      newSplits.push({
        category: splits[0].category,
        amount: Math.round((splits[0].amount + (oldSplit.amount || 0) - (newSplit.amount || 0)) * 100) / 100,
        notes: splits[0].notes,
      })
    }
    setSplits([
      ...newSplits,
      ...splits.slice(1, splitIndex),
      {
        category: newSplit.category,
        amount: newSplit.amount,
        notes: newSplit.notes,
      },
      ...splits.slice(splitIndex + 1),
    ]);
  };

  const isChanged = splits.length !== originalSplits.length ? true :
    splits.some((split, index) => split.amount !== originalSplits[index].amount
      || split.notes !== originalSplits[index].notes
      || split.category !== originalSplits[index].category
    );

  const handleSaveButtonClicked = () => {
    setSaveState(SaveState.Saving);

    updateTransaction(row, splits)
      .then(() => setSaveState(SaveState.Saved))
      .then(() => props.onClose())
      .catch(e => {
        console.log(e);
        setSaveState(SaveState.Error)
      });
  };

  return (
    <Paper style={{padding: '16px', maxWidth: "640px"}}>
      <Grid container spacing={2}>
        {splits.map((split, index) => (
          <TransactionSplitterRow
            key={index}
            split={split}
            disableAmount={index === 0}
            onChange={(newSplit) => handleOnChange(newSplit, index)}
            onRemoveButtonClicked={() => handleRemoveButtonClicked(index)}
          />
        ))}
        {splits.length > 1 && (
          <Grid item xs={12}>
            <em>{formatCurrencyExact(sumBy(splits, split => split.amount))} total</em>
          </Grid>
        )}
        <Grid item xs={6}>
          <Button
            color="primary"
            endIcon={<CallSplitIcon/>}
            onClick={() => handleSplitButtonClicked()}
          >
            Split
          </Button>
        </Grid>
        <Grid item xs={6} container justify="flex-end" spacing={2} direction="row">
          <Grid item>
            <Button
              onClick={() => props.onClose()}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              disabled={!isChanged}
              onClick={() => handleSaveButtonClicked()}
            >
              Save
            </Button>
            <InlineSaveState saveState={saveState}/>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
