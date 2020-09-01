import {CircularProgress, FormControl, MenuItem, Select} from "@material-ui/core";
import {budgetCategories} from "../budgets/budget-categories";
import React, {useEffect, useState} from "react";
import {Transaction} from "./transactionModel";
import {useTransactionUpdater} from "./useTransactionUpdater";

export function EditableCategory(props: { row: Transaction }) {
  const row = props.row;
  const [category, setCategory] = useState(row.category);
  const [saving, setSaving] = useState(false);
  const {updateTransaction} = useTransactionUpdater();

  function handleChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
    setCategory(event.target.value as string);
  }

  useEffect(() => {
    if (category === row.category) {
      return;
    }
    setSaving(true);

    updateTransaction(row, {category})
      .catch(e => console.log(e))
      .finally(() => setSaving(false));
  }, [category, row, updateTransaction]);

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
      {saving && (<CircularProgress/>)}
    </React.Fragment>
  )
}
