export const addressReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_ADDRESS':
      return {...state, ...action.payload};
    case 'ADD_ADDRESS':
      return [...state, {...action.payload}];
    default:
      return state;
  }
};
