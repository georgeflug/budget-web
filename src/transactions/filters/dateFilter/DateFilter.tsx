import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useDateFilter} from "./dateFilterRedux";
import {dateOptions} from "./dateOptions";

export function DateFilter() {
  const {dateFilter, setDateFilter} = useDateFilter();

  function handleChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
    setDateFilter(event.target.value as string);
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="date-filter-label">Date Range</InputLabel>
      <Select
        labelId="date-filter-label"
        id="date-filter-select"
        value={dateFilter}
        onChange={handleChange}
        fullWidth
      >
        {dateOptions.map(option => (
          <MenuItem key={option.id} value={option.id}>{option.displayName}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
