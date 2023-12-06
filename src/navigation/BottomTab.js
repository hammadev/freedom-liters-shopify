import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/main/home/Home';
import Profile from '../screens/main/profile/Profile';
import {Color} from '../globalStyle/Theme';
import MyOrder from '../screens/main/myOrder/MyOrder';
import Icon from '../core/Icon';
import Category from '../screens/main/category/Category';
import {TouchableRipple} from 'react-native-paper';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, FONTS} from '../constants';

const BottomTabScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
      })}>
      {tabsData.map((tab, i) => (
        <Tab.Screen key={i} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
const tabsData = [
  {
    id: 1,
    name: 'Home',
    component: Home,
  },
  {
    id: 2,
    name: 'Category',
    component: Category,
  },
  {
    id: 3,
    name: 'My Order',
    component: MyOrder,
  },
  {
    id: 4,
    name: 'Profile',
    component: Profile,
  },
];

function MyTabBar({state, descriptors, navigation, route}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60 + insets.bottom,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: COLORS.white,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableRipple
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: COLORS.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <>
              {index === 0 ? (
                isFocused ? (
                  <Icon
                    name={'home'}
                    iconFamily={'Ionicons'}
                    size={25}
                    color={COLORS.primary}
                  />
                ) : (
                  <Icon
                    name={'home-outline'}
                    iconFamily={'Ionicons'}
                    size={25}
                    color={COLORS.lightText}
                  />
                )
              ) : null}
              {index === 1 ? (
                isFocused ? (
                  <Icon
                    name={'list-circle'}
                    iconFamily={'Ionicons'}
                    size={25}
                    color={COLORS.primary}
                  />
                ) : (
                  <Icon
                    name={'list-circle-outline'}
                    iconFamily={'Ionicons'}
                    size={25}
                    color={COLORS.lightText}
                  />
                )
              ) : null}
              {index === 2 ? (
                isFocused ? (
                  <Icon
                    name={'inbox'}
                    iconFamily={'FontAwesome'}
                    size={25}
                    color={COLORS.primary}
                  />
                ) : (
                  <Icon
                    name={'inbox'}
                    iconFamily={'Feather'}
                    size={25}
                    color={COLORS.lightText}
                  />
                )
              ) : null}
              {index === 3 ? (
                isFocused ? (
                  <Icon
                    name={'account'}
                    iconFamily={'MaterialCommunityIcons'}
                    size={25}
                    color={COLORS.primary}
                  />
                ) : (
                  <Icon
                    name={'account-outline'}
                    iconFamily={'MaterialCommunityIcons'}
                    size={25}
                    color={COLORS.lightText}
                  />
                )
              ) : null}

              <Text
                style={{
                  color: isFocused ? COLORS.primary : COLORS.lightText,
                  fontFamily: FONTS.regular,
                  fontSize: 12,
                  marginTop: 5,
                }}>
                {label}
              </Text>
            </>
          </TouchableRipple>
        );
      })}
    </View>
  );
}
