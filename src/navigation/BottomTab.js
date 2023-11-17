import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/main/home/Home';
import Profile from '../screens/main/profile/Profile';
import {Color} from '../globalStyle/Theme';
import MyOrder from '../screens/main/myOrder/MyOrder';
import Icon from '../core/Icon';
import Category from '../screens/main/category/Category';

const BottomTabScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: Color.primary,
        tabBarStyle: {
          height: 62,
          backgroundColor: '#fff',
          elevation: 0,
          border: 0,
          paddingBottom: 9,
        },
        tabBarIcon: ({focused, size, color}) => {
          let icon;
          if (route.name === 'Home') {
            icon = focused ? (
              <Icon name={'home'} iconFamily={'Ionicons'} size={25} color={Color.tertiary} />
            ) : (
              <Icon name={'home-outline'} iconFamily={'Ionicons'} size={25} color={'#8A94A3'} />
            );
            return icon;
          } else if (route.name === 'Category') {
            icon = focused ? (
              <Icon name={'list-circle'} iconFamily={'Ionicons'} size={25} color={Color.tertiary} />
            ) : (
              <Icon name={'list-circle-outline'} iconFamily={'Ionicons'} size={25} color={'#8A94A3'} />
            );
            return icon;
          } else if (route.name === 'MyOrder') {
            icon = focused ? (
              <Icon name={'inbox'} iconFamily={'FontAwesome'} size={25} color={Color.tertiary} />
            ) : (
              <Icon name={'inbox'} iconFamily={'Feather'} size={25} color={'#8A94A3'} />
            );
            return icon;
          } else if (route.name === 'Profile') {
            icon = focused ? (
              <Icon name={'account'} iconFamily={'MaterialCommunityIcons'} size={25} color={Color.tertiary} />
            ) : (
              <Icon name={'account-outline'} iconFamily={'MaterialCommunityIcons'} size={25} color={'#8A94A3'} />
            );
            return icon;
          }
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen options={{title: 'My Order'}} name="MyOrder" component={MyOrder} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
