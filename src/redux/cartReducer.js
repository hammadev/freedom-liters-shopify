export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {...state, cart: action.Payload};

    case 'UPDATE_ITEM':
      return {
        ...state,
        addedItems: action.payload.updatedItems,
        total: action.payload.price,
      };
    case 'CLEAR_CART':
      return {
        // ...state,
        addedItems: action.payload,
        total: 0,
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        addedItems: state.addedItems.filter((item, i) => i !== action.payload.index),
        total: state.total - action.payload.amount,
      };

    default:
      return state;
  }
};
