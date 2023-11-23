import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

export const handleCreateCart = async (cartCreate, variables, navigation, isCreateCart) => {
  console.log('Is created', isCreateCart);
  try {
    const response = await cartCreate({
      variables,
    });
    if (response) {
      if (isCreateCart) {
        console.log('RESPONSEs', response.data.cartCreate.cart.id);
        await AsyncStorage.setItem('CART_ID', response.data.cartCreate.cart.id);
        showMessage({
          message: 'Item Added Successfully',
          type: 'success',
        });
        navigation.navigate('Cart');
      }
      showMessage({
        message: 'Item Added Successfully',
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
      showMessage({
        message: 'Item Increse Value Successfully',
        type: 'success',
      });
      console.log(response.data.cartLinesUpdate.cart.lines.edges);
    }
  } catch (error) {
    console.error('Mutation Remove Error:', error);
  }
};
export const hnadleDecreaseCartValue = async (cartLinesUpdate, variables) => {
  try {
    const response = await cartLinesUpdate({
      variables,
    });
    if (response) {
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
      console.log('resop', response.data.cartDiscountCodesUpdate.cart.discountCodes[0].applicable);
      if (response.data.cartDiscountCodesUpdate.cart.discountCodes[0].applicable) {
        console.log('Yessss');
        await AsyncStorage.setItem('COUPON', JSON.stringify(response.data.cartDiscountCodesUpdate.cart));
        showMessage({
          message: 'Coupon Applied Successfully',
          type: 'success',
        });
      } else {
        showMessage({
          message: 'Invalid Coupon',
          type: 'danger',
        });
      }
    }
  } catch (error) {
    console.error('Mutation Coupon Error:', error);
  }
};
