import {Box, Input} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {Transaction} from "./transactionModel";
import {useTransactionUpdater} from "./useTransactionUpdater";
import {SaveState} from "../saveState/saveState";
import {InlineSaveState} from "../saveState/InlineSaveState";

export function EditableNote(props: { row: Transaction }) {
  const row = props.row;
  const [notes, setNotes] = useState(row.notes);
  const [saveState, setSaveState] = useState<SaveState>(SaveState.Unchanged);
  const {updateTransaction} = useTransactionUpdater();

  useEffect(() => setNotes(row.notes), [row.notes]);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const newNotes = event.target.value as string;
    setNotes(newNotes);
    setSaveState(newNotes !== row.notes ? SaveState.Changed : SaveState.Unchanged);
  }

  function handleBlur() {
    if (notes === row.notes) {
      return;
    }
    setSaveState(SaveState.Saving);

    updateTransaction(row, {notes})
      .then(() => setSaveState(SaveState.Saved))
      .catch(e => {
        console.log(e);
        setSaveState(SaveState.Error)
      });
  }

  return (
    <Box style={{display: 'flex'}}>
      <Input
        value={notes}
        onBlur={handleBlur}
        onChange={handleChange}
        style={{flex: 1, minWidth: 120}}
      />
      <InlineSaveState saveState={saveState}/>
    </Box>
  )
}
