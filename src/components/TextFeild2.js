import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Color} from '../globalStyle/Theme';
import {COLORS, FONTS, RADIUS} from '../constants';

const TextField2 = ({
  label,
  maxLength,
  placeholder,
  icon,
  type,
  passwordFeild = false,
  setHidePass,
  hidePass,
  onChangeText,
  onChanged = val => console.log('No Onchange Event', val),
  value,
  disabled = false,
}) => {
  return (
    <TextInput
      label={
        <Text
          style={{
            color: COLORS.white,
            backgroundColor: COLORS.primary,
            fontSize: 14,
          }}>
          {label}
        </Text>
      }
      left={
        icon && (
          <TextInput.Icon
            icon={icon}
            iconColor={COLORS.white}
            style={{marginTop: 15}}
            size={20}
          />
        )
      }
      right={
        passwordFeild && (
          <TextInput.Icon
            onPress={() => setHidePass(!hidePass)}
            icon={hidePass ? 'eye-off-outline' : 'eye-outline'}
            iconColor={COLORS.white}
            style={{marginTop: 15}}
            size={20}
          />
        )
      }
      placeholder={placeholder ? placeholder : ''}
      placeholderTextColor={COLORS.white}
      secureTextEntry={passwordFeild && hidePass ? true : false}
      mode="outlined"
      theme={{
        roundness: RADIUS,
      }}
      keyboardType={type ? type : 'default'}
      maxLength={maxLength ? maxLength : 50}
      selectionColor={COLORS.white}
      outlineColor={COLORS.white}
      activeOutlineColor={COLORS.white}
      style={styles.input}
      textColor={COLORS.white}
      onChangeText={onChangeText ? onChangeText : text => onChanged(text)}
      value={value}
      disabled={disabled}
      contentStyle={{fontFamily: FONTS.regular, fontSize: 14}}
    />
  );
};

export default TextField2;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    height: 50,
  },
});
