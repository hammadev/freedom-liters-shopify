import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

export const handleCreateCart = async (cartCreate, variables, navigation, isCreateCart, dispatch) => {
  console.log('Is created', isCreateCart);
  try {
    const response = await cartCreate({
      variables,
    });
    if (response) {
      if (isCreateCart) {
        console.log('RESPONSEs', response.data.cartCreate.cart.id);
        await AsyncStorage.setItem('CART_ID', response.data.cartCreate.cart.id);
        dispatch({
          type: 'ADD_TO_CART',
          payload: response.data.cartCreate.cart,
        });
      }

      dispatch({
        type: 'ADD_TO_CART',
        payload: response.data.cartLinesAdd.cart,
      });
      showMessage({
        message: 'Item Add or cart created Successfully',
        type: 'success',
      });
    }
  } catch (error) {
    console.error('Mutation Error:', error);
  }
};

export const hnadleRemoveCartItem = async (cartLinesRemove, variables) => {
  try {
    const response = await cartLinesRemove({
      variables,
    });
    if (response) {
      console.log('RESPONSEs', response);
      showMessage({
        message: 'Item Remove Successfully',
        type: 'success',
      });
    }
  } catch (error) {
    console.error('Mutation Remove Error:', error);
  }
};

export const hnadleIncreseCartValue = async (cartLinesUpdate, variables) => {
  try {
    const response = await cartLinesUpdate({
      variables,
    });
    if (response) {
      console.log('RESPONSEs', response);
      showMessage({
        message: 'Item Increse Value Successfully',
        type: 'success',
      });
    }
  } catch (error) {
    console.error('Mutation Remove Error:', error);
  }
};

export const handleCouponCode = async (cart, variables) => {
  try {
    const response = await cart({
      variables,
    });
    if (response) {
      console.log('COUPON APPLIED', response);
    }
  } catch (error) {
    console.error('Mutation Coupon Error:', error);
  }
};
