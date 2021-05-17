import {Transaction} from "../../transactionModel";

export const filterByCategory = (transaction: Transaction, category: string) => {
  if (category === 'All Categories') {
    return true;
  }
  if (category === 'To be determined' && !transaction.category) {
    return true;
  }
  return transaction.category === category;
};
