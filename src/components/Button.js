import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color, Font, Window} from '../globalStyle/Theme';
import {SkypeIndicator} from 'react-native-indicators';

const Button = props => {
  let navigation = useNavigation();

  const activeThemeBg = () => {
    switch (props.theme) {
      case 'primary':
        return Color.primary;
      case 'secondary':
        return Color.secondary;
      case 'alternate':
        return Color.lightOrange;
      case 'white':
        return Color.white;
      case 'tertiary':
        return Color.tertiary;
      case 'light':
        return Color.light;
      default:
        return Color.primary;
    }
  };

  const activeThemeTextColor = () => {
    switch (props.theme) {
      case 'secondary':
        return Color.light;
      case 'primary':
        return Color.light;
      case 'tertiary':
        return Color.light;
      case 'white':
        return Color.tertiary;
      case 'light':
        return Color.tertiary;
      default:
        return Color.primary;
    }
  };

  return (
    <TouchableOpacity
      style={{
        ...Style.BtnContainer,
        backgroundColor: activeThemeBg(),
        borderWidth: props.type === 'primary' ? 1 : 0,
        borderColor: props.type === 'primary' ? Color.white : 'transparent',
      }}
      onPress={props.onPressFunc ? props.onPressFunc : () => navigation.navigate(props.navLink)}
      disabled={props.loading ? true : false}>
      {props.loading ? (
        <SkypeIndicator size={25} color={props.theme == 'white' ? Color.tertiary : Color.white} />
      ) : (
        <>
          {props.isIcon !== false ? (
            <Ionicons
              style={{
                ...(props.iconSet === 'secondary' ? Style.iconSetStyle : Style.IconStyle),
                color: activeThemeTextColor(),
              }}
              name={props.icon}
            />
          ) : null}
          <Text style={{...Style.btnTextStyle, color: activeThemeTextColor()}}>{props.text}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  BtnContainer: {
    backgroundColor: Color.secondary,
    alignItems: 'center',
    paddingVertical: Window.fixPadding * 2,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: 'rgba(27, 172, 75, 0.25)',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  btnTextStyle: {
    fontSize: Window.width < 375 ? 16 : 17,
    textAlign: 'center',
    fontFamily: Font.Gilroy_Bold,
  },
  IconStyle: {
    color: Color.primary,
    textAlign: 'center',
    fontSize: 20,
    position: 'absolute',
    left: Window.fixPadding * 2,
  },
  iconSetStyle: {
    fontSize: 25,
    paddingRight: 10,
    color: Color.tertiary,
  },
});
export default Button;
