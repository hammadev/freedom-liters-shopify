import {Dimensions, Platform} from 'react-native';
import React from 'react';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const COLORS = {
  primary: '#021C5E',
  secondary: '#656872',
  tertiary: '#231F20',
  lightText: '#080E1E66',
  light: '#F5F5F5',
  white: '#fff',
  black: '#000',
  gryLight: '#A0A0A0',
};

const FONTS = {
  black: 'Gilroy-Black', //900
  extraBold: 'Gilroy-ExtraBold', //800
  bold: 'Gilroy-Bold', //700
  semiBold: 'Gilroy-SemiBold', //600
  medium: 'Gilroy-Medium', //500
  regular: 'Gilroy-Regular', //400
  light: 'Gilroy-Light', //300
  heading: Platform.OS == 'ios' ? 'AutomovePersonalUse' : 'Automove-Personal',
  // extraLight: 'SFProDisplay-Ultralight', //200
  // thin: 'SFProDisplay-Thin', // 100
};

const RADIUS = 20;

const CONTAINER_PADDING = 24;

export {WIDTH, HEIGHT, COLORS, FONTS, RADIUS, CONTAINER_PADDING};
