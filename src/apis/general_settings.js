import axios from 'axios';
import { wpBaseUrl } from '../axios/baseUrl';

export async function GeneralSettings(dispatch) {
    try {
        const { data } = await axios.get(`${wpBaseUrl}/general-settings`);
        if (data) {
            dispatch({
                type: 'STORE_DATA',
                payload: data,
            })
        }
    } catch (err) {
        // showMessage({
        //   message: err.response.data.errors[0].message,
        //   type: 'danger',
        // });
        console.log('error', err.response.data);
    }
}

export async function fetchPaymentSheetParams(body) {
    console.log("body", body);
    try {
        const { data } = await axios.post(`${wpBaseUrl}/stripe-payment`, body);
        if (data) {
            // console.log('data', data);
            return {
                paymentIntent: data.paymentIntent,
                ephemeralKey: data.ephemeralKey,
                customer: data.customer,
            };

        }
    } catch (err) {
        console.log('error', err.response.data);
    }

}