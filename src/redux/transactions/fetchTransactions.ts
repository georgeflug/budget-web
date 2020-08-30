import axios from 'axios'
import {Dispatch} from "redux";

export const fetchTransactions = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      let posts = await axios.get('http://192.168.1.132:3000/transactions');
      dispatch({
        type: 'FETCH_TRANSACTIONS_SUCCESS',
        payload: posts.data,
      });
    } catch(e){
      console.log(e)
    }
  }
};
