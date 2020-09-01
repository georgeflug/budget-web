import {useSelector} from "react-redux";
import {useDispatchForAction} from "../../../redux/useDispatchForAction";
import {dateOptions, DateRange} from "./dateOptions";

const SET_DATE_FILTER_ACTION = 'SET_DATE_FILTER';
const DEFAULT_DATE_FILTER = 'allTime';

export const dateFilterReducer = (state: any = {}, action: any) => {
  if (action.type === SET_DATE_FILTER_ACTION) {
    return action.payload;
  }
  return state.dateFilter || DEFAULT_DATE_FILTER;
};

const getDateRange = (id: string) => {
  const dateOption = dateOptions.find(option => option.id === id);
  if (!dateOption) {
    throw new Error(`Date option not found for '${id}'`);
  }
  return dateOption.getRange();
};

export const dateRangeReducer = (state: any = {}, action: any) => {
  if (action.type === SET_DATE_FILTER_ACTION) {
    return getDateRange(action.payload);
  }
  return state.dateRange || getDateRange(DEFAULT_DATE_FILTER);
};

export const useDateFilter = () => {
  return {
    dateFilter: useSelector((state: any) => state.dateFilter),
    dateRange: useSelector((state: any) => state.dateRange) as DateRange,
    setDateFilter: useDispatchForAction(SET_DATE_FILTER_ACTION)
  };
};
