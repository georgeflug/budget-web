import {useSelector} from "react-redux";
import {useDispatchForAction} from "../../../redux/useDispatchForAction";

const SET_CATEGORY_FILTER_ACTION = 'SET_CATEGORY_FILTER';

export const categoryFilterReducer = (state: any = {}, action: any) => {
  if (action.type === SET_CATEGORY_FILTER_ACTION) {
    return action.payload;
  }
  return state.categoryFilter || 'To be determined';
};

export const useCategoryFilter = () => {
  return {
    categoryFilter: useSelector((state: any) => state.categoryFilter),
    setCategoryFilter: useDispatchForAction(SET_CATEGORY_FILTER_ACTION)
  };
};
