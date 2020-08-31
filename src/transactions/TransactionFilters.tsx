import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {budgetCategories} from "../budgets/budget-categories";
import {updateCategoryFilter} from "../redux/transactions/updateCategoryFilter";

export function TransactionFilters() {
  const categoryFilter = useSelector((state: any) => state.categoryFilter);
  const dispatch = useDispatch();

  function handleChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
    dispatch(updateCategoryFilter(event.target.value as string));
  }

  return (
    <div>
      <FormControl>
        <InputLabel id="category-filter-label">Category</InputLabel>
        <Select
          labelId="category-filter-label"
          id="category-filter-select"
          value={categoryFilter}
          onChange={handleChange}
        >
          {budgetCategories.map(category => (
            <MenuItem value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
