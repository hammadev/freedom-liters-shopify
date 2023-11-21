import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      variables,
    });

    console.log('result', result);

    // Handle the result here (data, errors, etc.)
    if (result.data.customerCreate.customerUserErrors.length) {
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

export const handleCreateAccessToken = async (createCustomerAccessToken, input, dispatch, navigation) => {
  const tokenResult = await createCustomerAccessToken({
    variables: {
      input,
    },
  });

  if (tokenResult.data.customerAccessTokenCreate.customerUserErrors.length) {
    showMessage({
      message: tokenResult.data.customerAccessTokenCreate.customerUserErrors[0].message,
      type: 'danger',
    });
    return;
  }

  let token = tokenResult.data.customerAccessTokenCreate.customerAccessToken;
  if (token) {
    await AsyncStorage.setItem('auth', JSON.stringify(token));
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: token,
    });

    showMessage({
      message: 'Login successfull!',
      type: 'success',
    });

    navigation.replace('BottomTabScreen');
  }
};

export const handleProfileUpdate = async (customerUpdate, variables, refetch) => {
  try {
    const result = await customerUpdate({
      variables,
    });

    // Handle the result here (data, errors, etc.)
    console.log('Update Phone Result:', result);

    if (result.data.customerUpdate.customerUserErrors.length) {
      showMessage({
        message: result.data.customerUpdate.customerUserErrors[0].message,
        type: 'danger',
      });
      return;
    }
    refetch();
    showMessage({
      message: 'Profile updated successfully!',
      type: 'success',
    });
    return;
  } catch (error) {
    console.error('Mutation error:', error);
    showMessage({
      message: 'Something went wrong! try again later',
      type: 'danger',
    });
    return;
  }
};

export const handleForgetPassword = async (sendPasswordResetEmail, variables) => {
  try {
    const result = await sendPasswordResetEmail({
      variables,
    });

    // Handle the result here (data, errors, etc.)
    console.log('Password Reset Email Result:', result);
    // console.log(result.data.customerRecover.customerUserErrors);
    if (result.data.customerRecover.customerUserErrors.length) {
      showMessage({
        message: result.data.customerRecover.customerUserErrors[0].message,
        type: 'danger',
      });
      return;
    }

    showMessage({
      message: 'Forget email send successfully!',
      type: 'success',
    });

    return;
  } catch (error) {
    console.error('Mutation error:', error);
  }
};

// variables: {
//   customerAccessToken: customerAccessToken,
// },
export const Applogout = async (deleteAccessToken, variables, navigation, setVisible, dispatch) => {
  try {
    const result = await deleteAccessToken({
      variables,
    });
    if (result) {
      console.log('Delete Access Token Result:', result);
      await AsyncStorage.removeItem('credentials');
      await AsyncStorage.removeItem('auth');
      setVisible(false);
      navigation.replace('SignIn');
      dispatch({
        type: 'LOGOUT',
      });
    }
  } catch (error) {
    console.error('Mutation error:', error);
    showMessage({
      message: 'Error in logout! try again later',
      type: 'success',
    });

    return;
  }
};
