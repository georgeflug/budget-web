import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {budgetCategories} from "../../../budgets/budget-categories";
import {useCategoryFilter} from "./categoryFilterRedux";

export function CategoryFilter() {
  const {categoryFilter, setCategoryFilter} = useCategoryFilter();

  function handleChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
    setCategoryFilter(event.target.value as string);
  }

  return (
    <FormControl>
      <InputLabel id="category-filter-label">Category</InputLabel>
      <Select
        labelId="category-filter-label"
        id="category-filter-select"
        value={categoryFilter}
        onChange={handleChange}
      >
        <MenuItem key="All Categories" value="All Categories">All Categories</MenuItem>
        {budgetCategories.map(category => (
          <MenuItem key={category} value={category}>{category}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
