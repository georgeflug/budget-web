import {useDispatch, useSelector} from "react-redux";
import {Transaction} from "./transactionModel";
import {chain, sumBy} from "lodash";
import {budgetAxios} from "../util/budgetAxios";
import {fetchTransactions} from "../redux/transactions/fetchTransactions";

type ApiUpdateTransactionSplit = {
  amount: number,
  budget: string,
  description: string,
}

type ApiUpdateTransaction = {
  recordId: number,
  version: number,
  totalAmount: number,
  splits: ApiUpdateTransactionSplit[],
}

const adaptTransactionToSplit = (transaction: Transaction): ApiUpdateTransactionSplit => {
  return {
    amount: transaction.amount,
    budget: transaction.category,
    description: transaction.notes,
  }
};

export const useTransactionUpdater = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state: any) => state.transactions) as Transaction[];

  return {
    updateTransaction: async (transactionToUpdate: Transaction, changes: Partial<Transaction>) => {
      const updateSplits = chain(transactions)
        .filter(transaction => transaction.recordId === transactionToUpdate.recordId)
        .sortBy(transaction => transaction.splitId)
        .map(transaction => (transaction.splitId === transactionToUpdate.splitId) ? {...transaction, ...changes} : transaction)
        .map(transaction => adaptTransactionToSplit(transaction))
        .value();

      const update: ApiUpdateTransaction = {
        recordId: transactionToUpdate.recordId,
        version: transactionToUpdate.version,
        totalAmount: sumBy(updateSplits, split => split.amount),
        splits: updateSplits,
      };

      await budgetAxios.put(`/transactions/${update.recordId}`, update);
      dispatch(fetchTransactions());
    }
  }
};
