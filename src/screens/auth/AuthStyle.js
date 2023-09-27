import React from 'react';
import { StyleSheet } from 'react-native';
import { GlobalStyle, Window, Font, Color } from '../../globalStyle/Theme';
const styles = StyleSheet.create({
  ImgContainer: {
    alignItems: 'center',
  },
  CheckFortotContaienr: {
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    color: '#000',
    margin: 5,
    padding: 0,
    width: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  BottonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  TextStyle: {
    color: 'rgba(8, 14, 30, 0.4)',
    fontFamily: Font.Gilroy_Regular,
    fontSize: 13,
  },
  SecondTextStyle: {
    color: Color.secondary,
    fontFamily: Font.Gilroy_Medium,
    fontSize: 13,
  },
});

export default styles;
