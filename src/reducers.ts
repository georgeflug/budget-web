export function reducers(state: any = {}, action: any) {
  const count = state.count || 0;
  return {
    ...state,
    count: (action.type === 'ADD_COUNT') ? count + 1 : count
  };
}
