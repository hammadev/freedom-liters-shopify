import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color } from '../globalStyle/Theme';
import { DefaultTheme, TextInput } from 'react-native-paper';
import PhoneInput from 'react-native-phone-input';
import useKeyboardDetection from '../hooks/detectKeyboard';
import { TextMask, TextInputMask } from 'react-native-masked-text';
import { COLORS, FONTS, RADIUS } from '../constants';

const PhoneInputComponent = ({ text, setText, type = 'primary' }) => {
  const [focused, setFocused] = useState(false);

  const isKeyboardOpen = useKeyboardDetection();
  const customTheme = {
    ...DefaultTheme,

    roundness: RADIUS, // Customize other properties as needed
  };
  const onChangeHandler = value => {
    // how to handle for each state field
    setText(value);
  };
  useEffect(() => {
    if (isKeyboardOpen) {
      setFocused(true);
    } else {
      setFocused(false);
    }
  }, [isKeyboardOpen]);
  return (
    <TextInput
      mode="outlined"
      theme={customTheme}
      selectionColor={type === 'primary' ? COLORS.white : COLORS.primary}
      outlineColor={type === 'primary' ? COLORS.gryLight : COLORS.primary}
      activeOutlineColor={type === 'primary' ? COLORS.white : COLORS.primary}
      style={styles.input}
      onFocus={() => {
        setFocused(true);
      }}
      maxLength={15}
      onBlur={() => setFocused(false)}
      render={props => (
        <View style={{ flexDirection: 'row', flex: 1, height: 56 }}>
          <PhoneInput
            {...props}
            initialCountry={'us'}
            disabled
            textProps={
              {
                // placeholder: 'Enter a phone number...',
                // maxLength: 11,
                // pattern: '^\\+1[0-9]{10}$', // Regular expression for US phone numbers
              }
            }
            style={{
              paddingLeft: 15,
              width: 80,
            }}
            textStyle={{
              fontSize: 14,
              fontFamily: FONTS.regular,
              color: type === 'primary' ? COLORS.black : COLORS.tertiary,
            }}
          />
          <TextInputMask
            style={{
              fontSize: 14,
              fontFamily: FONTS.regular,
              color: type === 'primary' ? COLORS.black : COLORS.tertiary,
              marginLeft: -5,
            }}
            type={'custom'}
            options={{
              mask: '999-999-9999',
            }}
            placeholder={'Enter your phone number'}
            placeholderTextColor={COLORS.black}
            onChangeText={text => {
              const newtext = text
                .replace(/^0|[^\d\s]/g, '')
                .replace(/\s+/g, '')
                .substring(0, 11);
              onChangeHandler(newtext);
            }}
            value={text}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            keyboardType="phone-pad"
          />
        </View>
      )}
    />
  );
};

export default PhoneInputComponent;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    height: 50,
  },
  textInput: { width: '100%', height: '100%' },
});
