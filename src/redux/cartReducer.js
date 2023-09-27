import AsyncStorage from '@react-native-async-storage/async-storage';

let initState;
let userData;

const setUser = async () => (userData = await AsyncStorage.getItem('cart'));
setUser();

if (userData) {
  const setData = async () => (initState = await AsyncStorage.getItem('cart'));
  setData();
} else {
  initState = {
    addedItems: [],
    total: 0,
  };
}
export const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        addedItems: [...state.addedItems, action.payload],
        total: state.total + action.payload.totalPrice,
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
        addedItems: state.addedItems.filter(
          (item, i) => i !== action.payload.index,
        ),
        total: state.total - action.payload.amount,
      };

    default:
      return state;
  }
};
