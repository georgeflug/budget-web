import {CircularProgress, FormControl, MenuItem, Select} from "@material-ui/core";
import {budgetCategories} from "../budgets/budget-categories";
import React, {useEffect, useState} from "react";
import {Transaction} from "./transactionModel";
import axios from "axios";

export function EditableCategory(props: { row: Transaction }) {
  const row = props.row;
  const [category, setCategory] = useState(row.splits[0].budget);
  const [saving, setSaving] = useState(false);

  function handleChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
    setCategory(event.target.value as string);
  }

  useEffect(() => {
    if (category === row.splits[0].budget) {
      return;
    }
    setSaving(true);

    axios.put(`http://192.168.1.132:3000/transactions/${row.recordId}`, {
      recordId: row.recordId,
      version: row.version,
      totalAmount: row.totalAmount,
      splits: [
        {
          amount: row.splits[0].amount,
          budget: category,
          description: row.splits[0].description,
        }
      ],
    }).then(() => {
      setSaving(false);
    }).catch(e => {
      setSaving(false);
      alert(e);
    });
  }, [category]);

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
