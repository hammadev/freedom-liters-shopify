import AsyncStorage from '@react-native-async-storage/async-storage';

let initState;
let userData;

const setUser = async () => (userData = await AsyncStorage.getItem('wishlist'));
setUser();

if (userData) {
  const setData = async () => (initState = await AsyncStorage.getItem('wishlist'));
  setData();
} else {
  initState = {
    addedItems: [],
  };
}

export const wishlistReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        addedItems: action.payload,
      };
    case 'ADD_SINGLE_TO_WISHLIST':
      return {
        ...state,
        addedItems: [...state.addedItems, action.payload],
      };
    case 'REMOVE_SINGLE_FROM_WISHLIST':
      return {
        ...state,
        addedItems: state.addedItems.filter((item, i) => item.node.id !== action.payload),
      };

    default:
      return state;
  }
};
