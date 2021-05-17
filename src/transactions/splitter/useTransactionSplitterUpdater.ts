import {useDispatch} from "react-redux";
import {Transaction} from "../transactionModel";
import {sumBy} from "lodash";
import {budgetAxios} from "../../util/budgetAxios";
import {fetchTransactions} from "../../redux/transactions/fetchTransactions";
import {Split} from "./split";

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

export const useTransactionSplitterUpdater = () => {
  const dispatch = useDispatch();

  return {
    updateTransaction: async (transactionToUpdate: Transaction, splits: Split[]) => {
      const updateSplits = splits.map(split => ({
        amount: split.amount,
        budget: split.category,
        description: split.notes,
      }));

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
