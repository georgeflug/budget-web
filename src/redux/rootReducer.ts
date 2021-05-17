import {categoryFilterReducer} from "../transactions/filters/categoryFilter/categoryFilterRedux";
import {dateFilterReducer, dateRangeReducer} from "../transactions/filters/dateFilter/dateFilterRedux";
import {searchFilterReducer} from "../transactions/filters/searchFilter/searchFilterRedux";

export function rootReducer(state: any = {}, action: any) {
  const count = state.count || 0;
  const transactions = state.transactions || [];
  return {
    ...state,
    count: (action.type === 'ADD_COUNT') ? count + 1 : count,
    transactions: (action.type === 'FETCH_TRANSACTIONS_SUCCESS') ? action.payload : transactions,
    categoryFilter: categoryFilterReducer(state, action),
    dateFilter: dateFilterReducer(state, action),
    dateRange: dateRangeReducer(state, action),
    searchFilter: searchFilterReducer(state, action),
  };
}
