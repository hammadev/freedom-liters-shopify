import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { wpBaseUrl } from '../axios/baseUrl';
import axios from 'axios';

export async function signupReq(
  body,
  navigation,
  setLoading,
  dispatch,
  navigateTo,
) {
  setLoading(true);
  try {
    const { data } = await axios.post(`${wpBaseUrl}/users/register`, body);
    console.log(data.user);
    if (data.user) {
      await AsyncStorage.setItem('credentials', JSON.stringify(body));
      await AsyncStorage.setItem('auth', JSON.stringify(data.user));
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: data.user,
      });
      showMessage({
        message: data.message,
        type: 'success',
      });
      navigation.replace(navigateTo);
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

export async function signinReq(
  body,
  navigation,
  setLoading,
  dispatch,
  navigateTo,
  splashSigninCheck = 0
) {
  setLoading(true);
  try {
    const { data } = await axios.post(`${wpBaseUrl}/users/login`, body);
    console.log(data);
    if (data) {
      await AsyncStorage.setItem('credentials', JSON.stringify(body));
      await AsyncStorage.setItem('auth', JSON.stringify(data));

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: data,
      });

      navigation.replace(navigateTo);

      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    if (splashSigninCheck)
      navigation.replace('SignIn');

    showMessage({
      message: err.response.data.message,
      type: 'danger',
    });
    // console.log('error sign in', err.response.data.message);
  }
}

export async function updateProfileReq(
  body,
  navigation,
  setLoading,
  dispatch,
  navigateTo,
  updatedAddress
) {
  // console.log('updatedAddress', updatedAddress);
  setLoading(true);
  try {
    const { data } = await axios.post(`${wpBaseUrl}/users/update-profile`, body);
    // console.log(data.user);
    if (data.user) {
      await AsyncStorage.setItem('auth', JSON.stringify(data.user));
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: data.user,
      });
      dispatch({
        type: 'UPDATE_ADDRESS',
        payload: updatedAddress,
      });
      showMessage({
        message: data.message,
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

export const logout = async (navigation) => {
  await AsyncStorage.removeItem('credentials');
  await AsyncStorage.removeItem('auth');
  navigation.replace('SignIn');
};

// const variables = {
//   input: {
//     acceptsMarketing: true,
//     email: 'example@example.com',
//     firstName: 'John',
//     lastName: 'Smith',
//     password: 'Admin',
//     phone: '+64213444048',
//   },
// }

export const handleCreateAccount = async (createCustomerAccount, variables, navigation) => {
  try {
    const result = await createCustomerAccount({
      variables
    });

    console.log('result', result);

    // Handle the result here (data, errors, etc.)
    if ((result.data.customerCreate.customerUserErrors).length) {
      showMessage({
        message: result.data.customerCreate.customerUserErrors[0].message,
        type: 'danger',
      });
      return;
    }

    if (result.data.customerCreate.customer) {
      await AsyncStorage.setItem('credentials', JSON.stringify(result.data.customerCreate.customer));
      showMessage({
        message: 'Account created successfully!',
        type: 'success',
      });

      navigation.replace('SignIn');
    }

    console.log('Mutation result:', result);
  } catch (error) {
    console.error('Mutation error:', error);
    showMessage({
      message: 'Something went wrong! try again later',
      type: 'danger',
    });
    return;
  }

};

// const input = {
//   email: variables.input.email,
//   password: variables.input.password,
// };

export const handleCreateAccessToken = async (createCustomerAccessToken, input) => {
  const tokenResult = await createCustomerAccessToken({
    variables: {
      input
    },
  });

  // Handle the access token result here (data, errors, etc.)
  console.log('Access Token Result:', tokenResult);
}