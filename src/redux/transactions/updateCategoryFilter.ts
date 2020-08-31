export const updateCategoryFilter = (newValue: string) => {
  return {
    type: 'UPDATE_CATEGORY_FILTER',
    payload: newValue,
  }
};
