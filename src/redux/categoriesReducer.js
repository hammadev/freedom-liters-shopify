export const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'CATEGORIES':
      return {...state, categories: action.Payload};
    case 'ALL_CATEGORIES':
      return {...state, allcategories: action.Payload};
    default:
      return state;
  }
};
