export const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'CATEGORIES':
      return {...state, categories: action.Payload};
    default:
      return state;
  }
};
