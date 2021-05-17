import {Transaction} from "../../transactionModel";
import {formatCurrency} from "../../../currency/formatCurrency";

let rememberedTokens: string[] = [];
let lastSearchText = '';

export const filterBySearchText = (transaction: Transaction, searchText: string): boolean => {
  if (!searchText) {
    return true;
  }
  if (searchText !== lastSearchText) {
    lastSearchText = searchText;
    rememberedTokens = splitByWordOrQuotes(lastSearchText.toLowerCase());
  }
  return rememberedTokens
    .filter(token => !!token)
    .some(token => (transaction.postedDescription || '').toLowerCase().includes(token)
      || (transaction.notes || '').toLowerCase().includes(token)
      || formatCurrency(transaction.amount).toString().includes(token));
};

function splitByWordOrQuotes(text: string): string[] {
  return (text.match(/([\w\.]+)|"([^"]+)"/g) || [])
    .map(token => token.replace(/^"(.*)"$/, '$1'))
}
