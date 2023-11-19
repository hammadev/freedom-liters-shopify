const InitialState = {
  addedItems: [],
  total: 0,
  Subtotal: 0,
};

export const cartReducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        addedItems: action.payload,
        total: action.payload.cost.subtotalAmount.amount,
        Subtotal: action.payload.cost.totalAmount.amount,
      };

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
