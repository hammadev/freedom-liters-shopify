import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Color, Font, Window } from '../globalStyle/Theme';
import { SkypeIndicator } from 'react-native-indicators';
import { COLORS, FONTS, RADIUS } from '../constants';
import { TouchableRipple } from 'react-native-paper';

const Button = ({ type, navLink, onPressFunc, loading, icon, text, style = {} }) => {
  let navigation = useNavigation();

  return (
    <View
      style={[
        styles.btnContainer,
        {
          backgroundColor:
            type === 'primary'
              ? COLORS.primary
              : type === 'secondary'
                ? COLORS.primary
                : 'transparent',

          borderColor: type === 'alternate' ? COLORS.gryLight : 'transparent',
        },
        style
      ]}>
      <TouchableRipple
        rippleColor={
          type === 'primary'
            ? 'rgba(255,255,255,0.2)'
            : type === 'secondary'
              ? 'rgba(0,0,0,0.2)'
              : 'rgba(255,255,255,0.2)'
        }
        style={styles.ripple}
        onPress={
          onPressFunc
            ? onPressFunc
            : () => navigation.navigate(navLink, { value: 4 })
        }
        disabled={loading ? true : false}>
        <>
          {loading ? (
            <SkypeIndicator
              size={25}
              color={type === 'primary' ? COLORS.white : Color.primary}
            />
          ) : (
            <Text
              style={{
                ...styles.btnTextStyle,
                color:
                  type === 'primary'
                    ? COLORS.black
                    : type === 'secondary'
                      ? COLORS.black
                      : COLORS.gryLight,
              }}>
              {text}
            </Text>
          )}
        </>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: RADIUS,
    overflow: 'hidden',
    height: 50,
    borderWidth: 1,
  },
  ripple: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextStyle: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: FONTS.semiBold,
  },
});
export default Button;
