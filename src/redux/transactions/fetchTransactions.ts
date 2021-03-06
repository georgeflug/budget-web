import {Dispatch} from "redux";
import {parseISO} from 'date-fns';
import {Transaction} from "../../transactions/transactionModel";
import {budgetAxios} from "../../util/budgetAxios";

type ApiTransactionSplit = {
  amount: number,
  budget: string,
  description: string
}

type ApiTransaction = {
  recordId: number,
  version: number,
  createdAt: string, // "2019-07-02T00:00:00.000Z"
  modifiedAt: string, // "2019-07-02T00:00:00.000Z"
  account: string, //"Checking",
  pending: boolean,
  plaidId: string, // "qDwqpr3Re9tMx6bMQVk1hwxEVKPVRauJXPzBz",
  postedDate: string, // "2019-07-02T00:00:00.000Z"
  postedDescription: string,
  splits: ApiTransactionSplit[],
  totalAmount: number,
}

export const fetchTransactions = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const transactions = await budgetAxios.get('/transactions');
      const normalized = normalizeData(transactions.data);
      dispatch({
        type: 'FETCH_TRANSACTIONS_SUCCESS',
        payload: normalized,
      });
    } catch (e) {
      console.log(e)
    }
  }
};

function normalizeData(transactions: ApiTransaction[]): Transaction[] {
  return transactions.flatMap(transaction => {
    return transaction.splits.map((split, splitIndex) => ({
      recordId: transaction.recordId,
      version: transaction.version,
      splitId: splitIndex,
      key: `${transaction.recordId}:${splitIndex}`,
      createdAt: parseISO(transaction.createdAt),
      modifiedAt: parseISO(transaction.modifiedAt),
      postedDate: parseISO(transaction.postedDate.replace(/T.+/, '')),
      account: transaction.account,
      postedDescription: transaction.postedDescription,
      isSplit: transaction.splits.length > 1,
      amount: split.amount,
      category: split.budget,
      notes: split.description,
    }));
  });
}
