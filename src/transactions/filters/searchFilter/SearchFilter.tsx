import React from "react";
import {FormControl, Input, InputLabel} from "@material-ui/core";
import {useSearchFilter} from "./searchFilterRedux";

export function SearchFilter() {
  const {searchFilter, setSearchFilter} = useSearchFilter();

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setSearchFilter(event.target.value);
  }

  return (
    <FormControl>
      <InputLabel id="search-filter-label">Search</InputLabel>
      <Input
        id="search-filter-select"
        value={searchFilter}
        onChange={handleChange}
      />
    </FormControl>
  );
}
