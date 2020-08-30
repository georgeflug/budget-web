import axios from 'axios'
import {Dispatch} from "redux";

export const fetchTransactions = () => {
  console.log('fetchTransactions()');
  return async (dispatch: Dispatch<any>) => {
    console.log('fetchTransactions2()');
    try {
      let posts = await axios.get('https://jsonplaceholder.typicode.com/posts');
      dispatch({
        type: 'FETCH_TRANSACTIONS_SUCCESS',
        payload: posts.data,
      });
    } catch(e){
      console.log(e)
    }
  }
};
