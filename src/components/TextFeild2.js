import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Color} from '../globalStyle/Theme';
const TextField2 = ({
  isDark = false,
  label,
  type,
  maxLength,
  placeholder,
  icon,
  passwordFeild = false,
  setHidePass,
  hidePass,
  customStyle,
  onChangeText,
  onChanged = val => console.log('No Onchange Event', val),
  value,
  disabled = false,
}) => {
  let bgColor = !isDark ? Color.white : Color.tertiary;
  let color = isDark ? Color.white : Color.tertiary;
  return (
    <TextInput
      label={<Text style={{color: color, backgroundColor: bgColor}}>{label}</Text>}
      left={
        label === 'Phone' ? (
          <TextInput.Affix text="+92" textStyle={{marginRight: 5, color: Color.white}} />
        ) : icon ? (
          <TextInput.Icon icon={icon} iconColor={color} />
        ) : null
      }
      right={
        passwordFeild && (
          <TextInput.Icon onPress={() => setHidePass(!hidePass)} icon={hidePass ? 'eye-off-outline' : 'eye-outline'} iconColor={color} />
        )
      }
      placeholder={placeholder ? placeholder : ''}
      placeholderTextColor={Color.gryLight}
      secureTextEntry={passwordFeild && hidePass ? true : false}
      mode="outlined"
      theme={{
        roundness: 14,
      }}
      keyboardType={type ? type : 'default'}
      maxLength={maxLength ? maxLength : 50}
      selectionColor={color}
      outlineColor={color}
      activeOutlineColor={color}
      style={{...customStyle, backgroundColor: bgColor}}
      textColor={color}
      onChangeText={onChangeText ? onChangeText : text => onChanged(text)}
      value={value}
      disabled={disabled}
    />
  );
};

export default TextField2;

const Style = StyleSheet.create({});
