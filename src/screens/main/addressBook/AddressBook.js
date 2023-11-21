import React, { useState } from 'react';
import { View, Text, StatusBar, ImageBackground, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
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
import Icon from '../../../core/Icon';
import { EditSvg } from '../../../assets/svgs/CheckoutSvg';


const AddressBook = ({ }) => {
    return (
        <SafeAreaView style={{
            paddingHorizontal: Window.fixPadding * 2,
            backgroundColor: Color.light,
            flex: 1
        }}>
            <AppBar />
            <ScrollView contentContainerStyle={{}}>
                <Text style={{ ...GlobalStyle.heading }}>Address Book</Text>
                <View
                    style={{
                        backgroundColor: Color.white,
                        padding: 15,
                        marginTop: 20,
                        borderRadius: 16,
                        shadowColor: 'rgba(0,0,0,0.1)',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.10,
                        shadowRadius: 5.48,
                        elevation: 22,
                        height: 168,
                    }}>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{
                            fontSize: 13,
                            color: Color.primary,
                            fontFamily: Font.Gilroy_SemiBold,
                        }}>Deliver To : Fillo Design Agency</Text>
                        <EditSvg />
                    </View>
                    <TouchableOpacity>
                        <View
                            style={{
                                borderRadius: 10,
                                width: 70,
                                height: 35,
                                borderColor: Color.tertiary,
                                borderWidth: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 12
                            }}>
                            <Text
                                style={{
                                    fontSize: 11,
                                    color: Color.tertiary,
                                    fontFamily: Font.Gilroy_Medium,
                                }}>
                                Home
                            </Text>
                        </View>
                        <Text
                            style={{
                                marginTop: 20,
                                fontSize: 11,
                                color: 'rgba(8, 14, 30, 0.6)',
                                fontFamily: Font.Gilroy_Medium,
                                lineHeight: 16
                            }}>
                            Address : 1901 Thornridge Cir. Shiloh, Hawaii 81063
                        </Text>
                        <Text
                            style={{
                                fontSize: 11,
                                color: 'rgba(8, 14, 30, 0.6)',
                                fontFamily: Font.Gilroy_Medium,
                                lineHeight: 16
                            }}>
                            Phone Number : (239) 555-0108
                        </Text>
                        <Text
                            style={{
                                fontSize: 11,
                                color: 'rgba(8, 14, 30, 0.6)',
                                fontFamily: Font.Gilroy_Medium,
                                lineHeight: 16
                            }}>
                            Email : design@filllo.com
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ paddingBottom: 20 }}>
                <Button
                    text="Add New Address"
                    isIcon={false}
                    theme="tertiary"
                    navLink='AddAddress'
                />
            </View>
        </SafeAreaView>
    )
}
export default AddressBook;