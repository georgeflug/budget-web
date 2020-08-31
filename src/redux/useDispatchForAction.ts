import {useDispatch} from "react-redux";

export const useDispatchForAction = <T>(action: string) => {
  const dispatch = useDispatch();
  return (payload: T) => {
    dispatch({
      type: action,
      payload
    })
  }
};
