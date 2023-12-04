import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, CONTAINER_PADDING, FONTS} from '../constants';
import BackButton from './BackButton';

const Header = ({label, hideBackButton}) => {
  return (
    <View style={styles.container}>
      {hideBackButton ? (
        <View style={{height: 35, width: 35}} />
      ) : (
        <BackButton />
      )}
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={{height: 35, width: 35}} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: CONTAINER_PADDING,
  },
  label: {
    fontSize: 22,
    fontFamily: FONTS.heading,
    color: COLORS.tertiary,
  },
});
