import {FormControl, Input} from "@material-ui/core";
import React, {useState} from "react";
import {Transaction} from "./transactionModel";
import {useTransactionUpdater} from "./useTransactionUpdater";
import {SaveState} from "../saveState/saveState";
import {InlineSaveState} from "../saveState/InlineSaveState";

export function EditableNote(props: { row: Transaction }) {
  const row = props.row;
  const [notes, setNotes] = useState(row.notes);
  const [saveState, setSaveState] = useState<SaveState>(SaveState.Unchanged);
  const {updateTransaction} = useTransactionUpdater();

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setNotes(event.target.value as string);
    setSaveState(SaveState.Changed);
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
    <React.Fragment>
      <FormControl style={{minWidth: 120}}>
        <Input
          id="edit-note-input"
          value={notes}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </FormControl>
      <InlineSaveState saveState={saveState}/>
    </React.Fragment>
  )
}
