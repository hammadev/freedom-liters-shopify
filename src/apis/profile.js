import axios from '../axios';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function updateAddressReq(
  user_id,
  body,
  navigation,
  setLoading,
  dispatch,
  navigateTo,
  updatedUser,
) {
  console.log('updatedUser', updatedUser);
  setLoading(true);
  try {
    const {data} = await axios.put(`customers/${user_id}`, body);
    // console.log(data);
    if (data) {
      // await AsyncStorage.setItem('address', JSON.stringify(data));
      dispatch({
        type: 'UPDATE_ADDRESS',
        payload: data,
      });
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: updatedUser,
      });
      showMessage({
        message: 'Profile Updated Successfully!',
        type: 'success',
      });
      // navigation.replace(navigateTo);
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    showMessage({
      message: err.response.data.message,
      type: 'danger',
    });
    console.log('error', err.response.data.message);
  }
}

export const getAddress = async (dispatch, user_id) => {
  try {
    const {data} = await axios.get(`customers/${user_id}`);
    // console.log('getAddress',data);
    if (data) {
      dispatch({
        type: 'UPDATE_ADDRESS',
        payload: data,
      });
      // await AsyncStorage.setItem('address', JSON.stringify(data));
    }
  } catch (err) {
    console.log(err);
  }
};

export const handleCreateAddress = async (
  createCustomerAddress,
  variables,
  refetch,
  resetState,
  setVisible,
  isUpdate,
) => {
  try {
    const result = await createCustomerAddress({
      variables,
    });
    if (!isUpdate) {
      if (result.data.customerAddressCreate.customerUserErrors.length) {
        showMessage({
          message:
            result.data.customerAddressCreate.customerUserErrors[0].message,
          type: 'danger',
          duration: 4000,
        });
        return;
      }
      showMessage({
        message: 'Address Added Successfully!',
        type: 'success',
      });
    } else {
      if (result.data.customerAddressUpdate.customerUserErrors.length) {
        showMessage({
          message: 'Error in updating address',
          type: 'danger',
        });
        return;
      }
      showMessage({
        message: 'Address Updated Successfully!',
        type: 'success',
      });
    }
    setVisible(false);
    resetState();
    refetch();
    return;
  } catch (error) {
    console.error('Mutation error:', error);
  }
};
