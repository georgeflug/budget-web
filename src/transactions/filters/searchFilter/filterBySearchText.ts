import {Transaction} from "../../transactionModel";

let rememberedTokens: string[] = [];
let lastSearchText = '';

export const filterBySearchText = (transaction: Transaction, searchText: string) => {
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
      || (transaction.notes || '').toLowerCase().includes(token));
};

function splitByWordOrQuotes(text: string): string[] {
  return (text.match(/(\w+)|"([^"]+)"/g) || [])
    .map(token => token.replace(/^"(.*)"$/, '$1'))
}
