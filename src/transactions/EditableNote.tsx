import {CircularProgress, FormControl, Input} from "@material-ui/core";
import React, {useState} from "react";
import {Transaction} from "./transactionModel";
import {useDispatch} from "react-redux";

export function EditableNote(props: { row: Transaction }) {
  const row = props.row;
  const [note, setNote] = useState(row.notes);
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setNote(event.target.value as string);
  }

  function handleBlur(event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setSaving(!saving);
    // todo: save the note
    console.log('blur');
  }

  return (
    <React.Fragment>
      <FormControl style={{minWidth: 120}}>
        <Input
          id="edit-note-input"
          value={note}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </FormControl>
      {saving && (<CircularProgress/>)}
    </React.Fragment>
  )
}
