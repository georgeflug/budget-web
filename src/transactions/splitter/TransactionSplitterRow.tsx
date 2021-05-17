import React from "react";
import {FormControl, Grid, IconButton, Input, InputAdornment, MenuItem, Select} from "@material-ui/core";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {Split} from "./split";
import {budgetCategories} from "../../budgets/budget-categories";

export function TransactionSplitterRow(props: {
  split: Split,
  disableAmount: boolean,
  onChange: (newSplit: Split) => void,
  onRemoveButtonClicked: () => void,
}) {
  const {split, disableAmount, onChange, onRemoveButtonClicked} = props;

  const handleAmountChanged = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange({...split, amount: parseFloat(event.target.value)});
  };

  const handleCategoryChanged = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    onChange({...split, category: event.target.value as string});
  };

  const handleNotesChanged = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange({...split, notes: event.target.value});
  };

  return (
    <React.Fragment>
      <Grid item xs={2}>
        <FormControl>
          <Input
            type="number"
            value={split.amount}
            disabled={disableAmount}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            onChange={handleAmountChanged}
          />
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <Select
          id="edit-category-select"
          value={split.category}
          onChange={handleCategoryChanged}
          displayEmpty
          fullWidth
          style={{minWidth: 120}}
        >
          <MenuItem key="" value="" disabled>
            <span style={{color: 'rgba(0, 0, 0, 0.26)'}}>Category</span>
          </MenuItem>
          {budgetCategories.map(category => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={5}>
        <Input
          value={split.notes}
          onChange={handleNotesChanged}
          placeholder="Notes"
          fullWidth
          style={{minWidth: 120}}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton
          disabled={disableAmount}
          color="secondary"
          onClick={() => onRemoveButtonClicked()}
        >
          <RemoveCircleOutlineIcon fontSize="inherit"/>
        </IconButton>
      </Grid>
    </React.Fragment>
  );
}
