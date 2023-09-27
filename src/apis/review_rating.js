import axios from '../axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function ReviewsApply(body, setLoading, setReviewsData) {
  setLoading(true);
  try {
    const {data} = await axios.post('products/reviews',body );
    if (data) {
      setReviewsData(data);
      showMessage({
        message: 'Review submitted successfully!',
        type: 'success',
      });
    }
  } catch (err) {
    setLoading(false);

    showMessage({
      message: err.response.data.errors[0].message,
      type: 'danger',
    });
    console.log('error', err.response.data.errors[0][0]);
  }
}
