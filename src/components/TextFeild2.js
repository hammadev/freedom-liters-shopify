import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Color } from '../globalStyle/Theme';
import { EmailSvg } from '../assets/svgs/AuthSvg';
const TextField2 = ({
    isDark = false,
    label,
    icon,
    passwordFeild = false,
    setHidePass,
    hidePass,
    customStyle,
    onChanged = val => console.log('No Onchange Event', val),
    value,
    disabled = false
}) => {
    let bgColor = !isDark ? Color.white : Color.tertiary
    let color = isDark ? Color.white : Color.tertiary
    return (
        <TextInput
            label={
                <Text style={{ color: color, backgroundColor: bgColor }}>
                    {label}
                </Text>
            }
            left={
                icon &&
                <TextInput.Icon
                    icon={icon}
                    iconColor={color}
                />
            }
            right={
                passwordFeild &&
                <TextInput.Icon
                    onPress={() => setHidePass(!hidePass)}
                    icon={hidePass ? 'eye-off-outline' : 'eye-outline'}
                    iconColor={color}
                />
            }
            secureTextEntry={passwordFeild && hidePass ? true : false}
            mode='outlined'
            theme={{
                roundness: 14,
            }}
            selectionColor={color}
            outlineColor={color}
            activeOutlineColor={color}
            style={{ ...customStyle, backgroundColor: bgColor }}
            textColor={color}
            onChangeText={text => onChanged(text)}
            value={value}
            disabled={disabled}
        />

    )
}

export default TextField2;

const Style = StyleSheet.create({

});