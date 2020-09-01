import {FormControl, MenuItem, Select} from "@material-ui/core";
import {budgetCategories} from "../budgets/budget-categories";
import React, {useState} from "react";
import {Transaction} from "./transactionModel";
import {useTransactionUpdater} from "./useTransactionUpdater";
import {InlineSaveState} from "../saveState/InlineSaveState";
import {SaveState} from "../saveState/saveState";

export function EditableCategory(props: { row: Transaction }) {
  const row = props.row;
  const [category, setCategory] = useState(row.category);
  const [saveState, setSaveState] = useState<SaveState>(SaveState.Unchanged);
  const {updateTransaction} = useTransactionUpdater();

  function handleChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
    const newCategory = event.target.value as string;
    setCategory(newCategory);
    if (newCategory !== row.category) {
      setSaveState(SaveState.Saving);
      updateTransaction(row, {category: newCategory})
        .then(() => setSaveState(SaveState.Saved))
        .catch(e => {
          console.log(e);
          setSaveState(SaveState.Error)
        });
    }
  }

  return (
    <React.Fragment>
      <FormControl style={{minWidth: 120}}>
        <Select
          id="edit-category-select"
          value={category}
          onChange={handleChange}
        >
          {budgetCategories.map(category => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <InlineSaveState saveState={saveState}/>
    </React.Fragment>
  )
}
