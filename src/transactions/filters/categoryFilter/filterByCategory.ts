import {Transaction} from "../../transactionModel";

export const filterByCategory = (transaction: Transaction, category: string) => {
  if (category === 'All Categories') {
    return true;
  }
  if (category === 'To be determined' && transaction.splits.some(split => !split.budget)) {
    return true;
  }
  return transaction.splits.some(split => split.budget === category);
};
