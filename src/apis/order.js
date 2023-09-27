import axios from '../axios';
import { showMessage, hideMessage } from 'react-native-flash-message';

export async function OrderListing(setLoading, setOrderList, user_id) {
  setLoading(true);
  try {
    const { data } = await axios.get(`orders?customer=${user_id}`);
    if (data) {
      setOrderList(data);
      setLoading(false);
    }
  } catch (err) {
    console.log('eeeeee', err);
  }
}

export async function placeOrder(
  body,
  setLoading,
  setShowModal,
  dispatch,
  navigation,
) {
  setLoading(true);
  try {
    const { data } = await axios.post('orders', body);
    if (data) {
      // console.log(data);
      dispatch({
        type: 'CLEAR_CART',
        payload: [],
      });
      // navigation.replace('Home', {
      //   points: data.loyalty_points,
      // });
      setShowModal(true);
      setLoading(false);
      // navigation.replace('MyOrder');
    }
  } catch (err) {
    setLoading(false);
    // showMessage({
    //   message: err.response.data.errors[0].message,
    //   type: 'danger',
    // });
    console.log('error', err.response.data);
  }
}


