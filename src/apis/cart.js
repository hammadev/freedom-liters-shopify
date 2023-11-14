import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

export const handleCreateCart = async (cartCreate, variables, navigation, isCreateCart) => {
  try {
    const response = await cartCreate({
      variables,
    });
    if (response) {
      console.log('RESPONSEs', response);
      showMessage({
        message: 'Item Add or cart created Successfully',
        type: 'success',
      });
      if (isCreateCart) {
        AsyncStorage.setItem('CART_ID', response.data.cartCreate.cart.id);
      }
    }
  } catch (error) {
    console.error('Mutation Error:', error);
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
    console.error('Mutation Error:', error);
  }
};
