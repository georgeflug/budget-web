import axios from 'axios'
import {Dispatch} from "redux";
import {parseISO} from 'date-fns';

export const fetchTransactions = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      let transactions = await axios.get('http://192.168.1.132:3000/transactions');
      normalizeDates(transactions.data);
      dispatch({
        type: 'FETCH_TRANSACTIONS_SUCCESS',
        payload: transactions.data,
      });
    } catch(e){
      console.log(e)
    }
  }
};

function normalizeDates(transactions: any[]) {
  transactions.forEach(transaction => {
    transaction.createdAt = parseISO(transaction.createdAt);
    transaction.postedDate = parseISO(transaction.postedDate);
  });
}
