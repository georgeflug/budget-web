import {Transaction} from "../../transactionModel";

export const filterBySearchText = (transaction: Transaction, searchText: string) => {
  if (!searchText) {
    return true;
  }
  return searchText.toLowerCase().split(' ')
    .filter(token => !!token)
    .some(token => (transaction.postedDescription || '').toLowerCase().includes(token)
      || (transaction.notes || '').toLowerCase().includes(token));
};
