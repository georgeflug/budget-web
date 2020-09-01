import {useSelector} from "react-redux";
import {useDispatchForAction} from "../../../redux/useDispatchForAction";

const SET_SEARCH_FILTER_ACTION = 'SET_SEARCH_FILTER';

export const searchFilterReducer = (state: any = {}, action: any) => {
  if (action.type === SET_SEARCH_FILTER_ACTION) {
    return action.payload;
  }
  return state.searchFilter || '';
};

export const useSearchFilter = () => {
  return {
    searchFilter: useSelector((state: any) => state.searchFilter),
    setSearchFilter: useDispatchForAction(SET_SEARCH_FILTER_ACTION)
  };
};
