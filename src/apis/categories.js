import axios from "../axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { showMessage } from "react-native-flash-message";


export async function CategoriesReq(dispatch) {
    try {
        const { data } = await axios.get('products/categories');
        if (data) {
            dispatch({
                type: 'CATEGORIES',
                Payload: [data],
            })
        }
    }
    catch (err) {
        // showMessage({
        //     message: err.respose.data.errors[0].message,
        //     type: 'danger',
        // });
        console.log('error', err);
    }
}

