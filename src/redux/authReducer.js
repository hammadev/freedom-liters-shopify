import AsyncStorage from '@react-native-async-storage/async-storage';

let initialState;
let userData;

const setUser = async () => (userData = await AsyncStorage.getItem('auth'));
setUser();

if (userData) {
  const setData = async () => (initialState = JSON.stringify(userData));
  setData();
} else {
  initialState = null;
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return {...state, ...action.payload};
    case 'LOGOUT':
      return action.payload;
    default:
      return state;
  }
};
