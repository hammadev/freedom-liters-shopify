import React from 'react';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import WebView from 'react-native-webview';

const CheckOut = ({route, navigation}) => {
  const {checkoutData} = route.params;
  console.log(checkoutData);

  const dispatch = useDispatch();

  const handleWebViewNavigation = event => {
    console.log('event.url', event.url);
    if (event.url.includes('thank-you')) {
      console.log('Checkout is complete!');
      dispatch({
        type: 'CLEAR_CART',
        payload: [],
      });
      showMessage({
        message: 'Order Placed Successfully',
        type: 'success',
      });
      navigation.navigate('Home');
    }
  };

  return (
    <>
      {/* <WebView
        source={{uri: checkoutData}}
        style={{flex: 1}}
        onNavigationStateChange={handleWebViewNavigation}
      /> */}
    </>
  );
};

export default CheckOut;
