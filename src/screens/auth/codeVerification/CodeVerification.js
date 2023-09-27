import React, { useState } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import { Color, Font, GlobalStyle, Window } from '../../../globalStyle/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CELL_COUNT = 4;

const CodeVerification = ({ navigation }) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [optText, setOtpText] = useState(false);
    return (

        <SafeAreaView style={{ ...GlobalStyle.Container }}>
            <AppBar
                theme='dark'
            />

            <View>
                <View style={{ marginBottom: 8 }}>
                    <Text style={{ ...GlobalStyle.heading }}>
                        Verify Reset Code
                    </Text>
                    <Text style={{ ...styles.textStyle, letterSpacing: 1, marginTop: 8, lineHeight: 20 }}>
                        Enter 4-digit verification which is send to your given email.
                    </Text>
                </View>
                <View style={{ marginVertical: Window.fixPadding * 2.5, marginHorizontal: Window.fixPadding * 1.5 }}>
                    <CodeField
                        style={{ borderColor: '#fff' }}
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        onChanged={setOtpText}
                        cellCount={CELL_COUNT}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, fontFamily: Font.Gilroy_SemiBold, color: 'rgba(8, 14, 30, 0.4)' }}>
                        Code expires in :
                        <Text style={{ color: '#597766', fontFamily: Font.Gilroy_Medium }}> 00 : 55</Text>
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, }}>
                        <Text style={{ fontSize: 15, fontFamily: Font.Gilroy_Medium, color: 'rgba(8, 14, 30, 0.4)' }}>
                            Didn’t receive code?
                        </Text>
                        <TouchableOpacity>
                            <Text style={{ color: '#597766', fontFamily: Font.Gilroy_Medium, marginLeft: Window.fixPadding / 2 }}>Resend Code</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

            <View style={{ ...GlobalStyle.bottomButtonContainer, paddingBottom: 20 }}>
                <Button
                    text="Verify"
                    icon="mail"
                    isIcon={false}
                    theme="tertiary"
                    navLink="BottomTabScreen"

                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet
    .create({
        TopTextContainer: { justifyContent: 'center' },

        CodeFieldStyle: {
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },

        cell: {
            width: 64,
            height: 64,
            fontSize: 24,
            borderWidth: 1,
            borderRadius: 15,
            borderColor: '#597766',
            textAlign: 'center',
            textAlignVertical: 'center',
            color: Color.primary,
        },
        focusCell: {
            borderColor: '#080E1E',
        },
        textStyle: {
            fontSize: 13,
            color: 'rgba(8, 14, 30, 0.4)',
            fontFamily: Font.Gilroy_Regular,
        },
    });
export default CodeVerification;
