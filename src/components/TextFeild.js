import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color, Font, Window } from '../globalStyle/Theme';
import { TextInput } from 'react-native-paper';
import { EyeSLashSvg, LockSvg } from '../assets/svgs/AuthSvg';

const TextField = ({
  placeholder,
  placeholderTextColor,
  keyboardType,
  icon,
  isPassword,
  setHidePass,
  hidePass,
  IconFamily,
  value,
  color,
  alternate,
  disabled,
  backgroundColor,
  svg,
  textColor,
  isDark = false,
  onChanged = val => console.log('No Onchange Event', val),
}) => {
  // placeholderTextColor = '#fff';
  const [focused, setFocused] = useState(false);
  if (isPassword) {
    return (
      <View
        style={[
          Style.TextInputContainer,
          {
            backgroundColor: '#021851',
            borderWidth: 0.9,
            borderColor: Color.white,
          },
        ]}>
        <View>
          <LockSvg />
        </View>

        <View style={{ flex: 18 }}>
          <TextInput
            style={{ flex: 9, color: '#807F7E', backgroundColor: '#021851' }}
            placeholder={placeholder}
            label={placeholder}
            placeholderTextColor={
              placeholderTextColor
                ? placeholderTextColor
                : 'rgba(8, 14, 30, 0.4)'
            }
            textColor={textColor}
            onChangeText={text => onChanged(text)}
            secureTextEntry={hidePass ? true : false}
            // numberOfLines={numberOfLines}
            // onFocus={() => setFocused(true)}
            // onBlur={() => setFocused(false)}
            value={value}
            mode="Outlined"
            activeUnderlineColor={Color.light}
            outlineStyle={{ borderColor: Color.light }}
          />
        </View>
        {/* <EyeSLashSvg  /> */}

        <MaterialCommunityIcons
          style={Style.TextInputIcon}
          name={hidePass ? 'eye-off-outline' : 'eye-outline'}
          onPress={() => setHidePass(!hidePass)}
          color={focused ? '#000' : '#fff'}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        Style.TextInputContainer,
        {
          backgroundColor: isDark ? Color.tertiary : Color.light,
          borderWidth: 0.9,
          borderColor: !isDark ? Color.tertiary : Color.light,
        },
      ]}>
      {alternate !== true && icon ? (
        IconFamily == 'ion' ? (
          <Ionicons
            style={Style.TextInputIcon}
            color={focused ? Color.primary : '#212121'}
            name={icon}
          />
        ) : (
          <MaterialCommunityIcons
            style={Style.TextInputIcon}
            color={focused ? Color.primary : '#212121'}
            name={icon}
          />
        )
      ) : (
        svg
      )}

      <TextInput
        style={{
          flex: 9,
          fontSize: 15,
          fontFamily: Font.Gilroy_Medium,
          // color: !isDark ? Color.tertiary : Color.light,
          backgroundColor: 'transparent',
        }}
        placeholder={placeholder}
        label={placeholder}
        placeholderTextColor={!isDark ? Color.tertiary : Color.light}
        onChangeText={text => onChanged(text)}
        value={value}
        keyboardType={keyboardType}
        editable={disabled}
        mode="Outlined"
        // textColor={!isDark ? Color.tertiary : Color.light}
        activeUnderlineColor={!isDark ? Color.tertiary : Color.light}
        theme={{
          colors: {
            text: !isDark ? Color.tertiary : Color.light,
            placeholder: !isDark ? Color.tertiary : Color.light,
          }
        }}

      // activeOutlineColor={{ borderColor: Color.light }}

      />

      {alternate === true && icon ? (
        IconFamily == 'ion' ? (
          <Ionicons
            style={Style.TextInputIcon}
            color={color ? color : '#BDBDBD'}
            name={icon}
          />
        ) : (
          <MaterialCommunityIcons
            style={Style.TextInputIcon}
            color={color ? color : '#BDBDBD'}
            name={icon}
          />
        )
      ) : null}
    </View>
  );
};

const Style = StyleSheet.create({
  TextInputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: '#021851',
    height: 57,
    borderRadius: 16,
    paddingHorizontal: Window.fixPadding * 1.5,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  TextInputIcon: {
    // flex: 1,
    textAlign: 'center',
    fontSize: 24,
  },
});

export default TextField;
