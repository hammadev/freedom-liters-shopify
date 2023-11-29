import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color, Font, Window} from '../globalStyle/Theme';
import {DefaultTheme, TextInput} from 'react-native-paper';
import PhoneInput from 'react-native-phone-input';
import useKeyboardDetection from '../hooks/detectKeyboard';
import {TextInput as InputFieldRN} from 'react-native';
import {TextMask, TextInputMask} from 'react-native-masked-text';

const PhoneInputComponent = ({text, setText, isDark = true}) => {
  let bgColor = !isDark ? Color.white : Color.tertiary;
  let color = isDark ? Color.white : Color.tertiary;

  const [focused, setFocused] = useState(false);

  const isKeyboardOpen = useKeyboardDetection();
  const customTheme = {
    ...DefaultTheme,

    roundness: 14, // Customize other properties as needed
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
      // label={'Enter your phone number'}
      mode="outlined"
      theme={customTheme}
      selectionColor={'#CBD1DA'}
      outlineColor={color}
      activeOutlineColor={color}
      style={{
        backgroundColor: bgColor,
        width: '100%',
        marginBottom: Window.fixPadding * 1.5,
      }}
      outlineStyle={{}}
      onFocus={() => {
        setFocused(true);
      }}
      maxLength={15}
      onBlur={() => setFocused(false)}
      render={props => (
        <View style={{flexDirection: 'row', flex: 1}}>
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
              fontFamily: Font.regular,
              flex: 1,
              color: color,
            }}
          />
          <TextInputMask
            style={{
              flex: 1,
              fontSize: 14,
              fontFamily: Font.regular,
              color: color,
              marginLeft: -5,
            }}
            type={'custom'}
            options={{
              mask: '999-999-9999',
            }}
            placeholder={'Enter your phone number'}
            placeholderTextColor={Color.light}
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
            // editable={disabled ? false : true}
          />
        </View>
      )}
    />
  );
};

export default PhoneInputComponent;

const styles = StyleSheet.create({
  textInputContainer: {
    height: 50,
    width: '100%',
    backgroundColor: Color.secondary,
    border8: 8,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  textInput: {width: '100%', height: '100%'},
});
