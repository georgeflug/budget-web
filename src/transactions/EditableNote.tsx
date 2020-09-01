import {CircularProgress, FormControl, Input} from "@material-ui/core";
import React, {useState} from "react";
import {Transaction} from "./transactionModel";
import {useTransactionUpdater} from "./useTransactionUpdater";

export function EditableNote(props: { row: Transaction }) {
  const row = props.row;
  const [notes, setNotes] = useState(row.notes);
  const [saving, setSaving] = useState(false);
  const {updateTransaction} = useTransactionUpdater();

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setNotes(event.target.value as string);
  }

  function handleBlur(event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) {
    if (notes === row.notes) {
      return;
    }
    setSaving(true);

    updateTransaction(row, {notes})
      .catch(e => console.log(e))
      .finally(() => setSaving(false));
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
      {saving && (<CircularProgress/>)}
    </React.Fragment>
  )
}
