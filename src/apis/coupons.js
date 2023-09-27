import axios from '../axios';
// import {showMessage, hideMessage} from 'react-native-flash-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export async function CouponsnApply(setLoading, setCouponsData) {
  setLoading(true);
  try {
    const {data} = await axios.get('coupons');
    if (data) {
      setCouponsData(data);
      setLoading(false);
    }
  } catch (err) {
    // showMessage({
    //   message: err.response.data.errors[0].message,
    //   type: 'danger',
    // });
    console.log('error', err.response.data.errors[0][0]);
  }
}
