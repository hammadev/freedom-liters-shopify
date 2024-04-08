import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Color } from '../globalStyle/Theme';
import { COLORS, FONTS, RADIUS } from '../constants';

const TextField2 = ({
  label,
  maxLength,
  placeholder,
  icon,
  passwordFeild = false,
  setHidePass,
  hidePass,
  onChangeText,
  onChanged = val => console.log('No Onchange Event', val),
  value,
  disabled = false,
  type = 'primary',
}) => {
  return (
    <TextInput

      label={
        <Text
          style={{
            color: type === 'primary' ? COLORS.black : COLORS.tertiary,
            fontSize: 16,
          }}>
          {label}
        </Text>
      }
      left={
        icon && (
          <TextInput.Icon
            icon={icon}
            iconColor={icon == 'barcode' ? COLORS.black : COLORS.white}
            style={{ marginTop: 15 }}
            size={20}
          />
        )
      }
      right={
        passwordFeild && (
          <TextInput.Icon
            onPress={() => setHidePass(!hidePass)}
            icon={hidePass ? 'eye-off-outline' : 'eye-outline'}
            iconColor={COLORS.black}
            style={{ marginTop: 15 }}
            size={20}
          />
        )
      }
      placeholder={placeholder ? placeholder : ''}
      placeholderTextColor={COLORS.black}
      secureTextEntry={passwordFeild && hidePass ? true : false}
      mode="outlined"
      theme={{
        roundness: RADIUS,
      }}
      // keyboardType={type ? type : 'default'}
      maxLength={maxLength ? maxLength : 50}
      selectionColor={type === 'primary' ? COLORS.white : COLORS.primary}
      outlineColor={type === 'primary' ? COLORS.gryLight : COLORS.primary}
      activeOutlineColor={type === 'primary' ? COLORS.gryLight : COLORS.primary}
      style={styles.input}
      textColor={type === 'primary' ? COLORS.black : COLORS.tertiary}
      onChangeText={onChangeText ? onChangeText : text => onChanged(text)}
      value={value}
      disabled={disabled}
      contentStyle={{ fontFamily: FONTS.regular, fontSize: 14 }}
    />
  );
};

export default TextField2;

const styles = StyleSheet.create({
  input: {
    height: 56,
    marginBottom: 10
    // borderWidth: 1,
    // borderColor: COLORS.gryLight,
    // borderRadius: RADIUS,
  },
});
