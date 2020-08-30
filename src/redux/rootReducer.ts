export function rootReducer(state: any = {}, action: any) {
  const count = state.count || 0;
  const transactions = state.transactions || [];
  return {
    ...state,
    count: (action.type === 'ADD_COUNT') ? count + 1 : count,
    transactions: (action.type === 'FETCH_TRANSACTIONS_SUCCESS') ? action.payload : transactions,
  };
}
