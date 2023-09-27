import AsyncStorage from "@react-native-async-storage/async-storage";

let initialState = {};
let storageAddress;
const getAddress = async () => {
    storageAddress = await AsyncStorage.getItem('address');
    // console.log('storageAddress',storageAddress);
    if(storageAddress != null)
        initialState = JSON.parse(storageAddress);
        
};
// getAddress();

// console.log("initialState",initialState);


export const addressReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_ADDRESS':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
