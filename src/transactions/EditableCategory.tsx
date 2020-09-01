import {CircularProgress, FormControl, MenuItem, Select} from "@material-ui/core";
import {budgetCategories} from "../budgets/budget-categories";
import React, {useEffect, useState} from "react";
import {Transaction} from "./transactionModel";
import axios from "axios";
import {useDispatch} from "react-redux";
import {fetchTransactions} from "../redux/transactions/fetchTransactions";
import {budgetAxios} from "../util/budgetAxios";

export function EditableCategory(props: { row: Transaction }) {
  const row = props.row;
  const [category, setCategory] = useState(row.category);
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();

  function handleChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
    setCategory(event.target.value as string);
  }

  useEffect(() => {
    if (category === row.category) {
      return;
    }
    setSaving(true);

    budgetAxios.put(`/transactions/${row.recordId}`, {
      recordId: row.recordId,
      version: row.version,
      totalAmount: row.amount,
      splits: [
        {
          amount: row.amount,
          budget: category,
          description: row.notes,
        }
      ],
    }).then(() => {
      setSaving(false);
      dispatch(fetchTransactions());
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
