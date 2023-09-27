import { combineReducers } from "redux";
// import { authReducer } from "./authReducer";
import { categoriesReducer } from "./categoriesReducer";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { addressReducer } from "./profileReducer";
import { wishlistReducer } from './wishlistReducer.js';
import { generalSettingsReducer } from "./generalSettings";

export const rootReducer = combineReducers({
    auth: authReducer,
    categories: categoriesReducer,
    product: productReducer,
    cart: cartReducer,
    address: addressReducer,
    wishlist: wishlistReducer,
    generalSettings: generalSettingsReducer,
});