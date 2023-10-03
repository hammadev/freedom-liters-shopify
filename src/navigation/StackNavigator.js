import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../screens/main/onBoarding/Onboarding';
import PersonalInfo from '../screens/main/personalInfo/PersonalInfo';
import AddressBook from '../screens/main/addressBook/AddressBook';
import OrdersReturns from '../screens/main/orders&returns/Orders&Returns';
import ReturnRequest from '../screens/main/returnRequest/ReternRequest';
import BottomTabScreen from './BottomTab';
import CodeVerification from '../screens/auth/codeVerification/CodeVerification';
import SignIn from '../screens/auth/signIn/SignIn';
import SignUp from '../screens/auth/signUp/SignUp';
import ProductDetail from '../screens/main/product/ProductDetail';
import Review from '../screens/main/review/Review';
import CheckOut from '../screens/main/checkOut/CheckOut';
import Splash from '../screens/Splash';
import WishList from '../screens/main/wishList/WishList';
import MyOrder from '../screens/main/myOrder/MyOrder';
import Coupons from '../screens/main/coupons/Coupons';
import ProductListing from '../screens/main/product/ProductListing';
import AddAddress from '../screens/main/address/AddAddress';
import AddressListing from '../screens/main/address/AddressListing';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="CodeVerification" component={CodeVerification} />

      <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
      <Stack.Screen name="WishList" component={WishList} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="AddressBook" component={AddressBook} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="AddressListing" component={AddressListing}/>
      <Stack.Screen name="MyOrder" component={MyOrder}/>
      <Stack.Screen name="ProductListing" component={ProductListing} />

      <Stack.Screen
        name="OrdersReturns"
        component={OrdersReturns}
      />
      <Stack.Screen name="ReturnRequest" component={ReturnRequest} />
      <Stack.Screen name="Coupons" component={Coupons} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
