import React from 'react';
import {View, StyleSheet} from 'react-native';
import {GlobalStyle, Font, Color, Window} from '../../../globalStyle/Theme';
const styles = StyleSheet.create({
  ImageContainer: {
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 22,
    backgroundColor: '#FAF7F1',
    borderRadius: 16,
    width: 88,
    height: 88,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginLeft: 10,
  },
  ContainerContent: {
    paddingLeft: 15,
    width: Window.width / 1.47,
    marginTop: 24,
  },
  TextStyle: {
    fontSize: 13,
    color: Color.primary,
    fontFamily: Font.Gilroy_Medium,
  },
  DeliveryStyle: {
    fontSize: 13,
    color: Color.primary,
    fontFamily: Font.Gilroy_SemiBold,
  },
  TotalStyle: {
    fontSize: 15,
    color: Color.primary,
    fontFamily: Font.Gilroy_SemiBold,
  },
  Heading: {
    fontSize: 18,
    color: Color.secondary,
    lineHeight: 21.6,
    width: 150,
    fontFamily: Font.Gilroy_Bold,
  },
  OneStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: Color.primary,
    fontFamily: Font.Gilroy_Bold,
    borderWidth: 1,
    borderColor: Color.primary,
    height: 32,
    width: 32,
    borderRadius: 10,
  },
  BoxContainerStyle: {
    backgroundColor: Color.white,
    padding: 15,
    marginTop: 20,
    borderRadius: 24,
    marginHorizontal: Window.fixPadding * 2,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 22,
  },
  fab: {
    position: 'absolute',
    margin: 10,
    left: -15,
    top: -15,
    backgroundColor: Color.primary,
    height: 24,
    width: 24,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  NumStyle: {
    color: Color.tertiary,
    fontSize: 16,
    fontFamily: Font.Gilroy_SemiBold,
    marginHorizontal: 10,
  },
  AddStyle: {
    color: Color.secondary,
    fontSize: 16,
  },
  MinusStyle: {
    color: Color.secondary,
    fontSize: 16,
  },
  cartStyle: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Color.secondary,
    borderWidth: 2,
  },
});
export default styles;
