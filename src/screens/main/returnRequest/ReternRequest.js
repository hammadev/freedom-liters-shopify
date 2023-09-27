import React, { useState } from 'react';
import { View, Text, StatusBar, ImageBackground, TouchableOpacity, Image, FlatList, ScrollView, TextInput } from 'react-native';
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
import DropDown from "react-native-paper-dropdown";


const ReturnsDetails = ({ item }) => {
    return (
        <View style={{ marginBottom: 32, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 5, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                    shadowColor: 'rgba(0,0,0,0.3)',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 22, borderRadius: 16, backgroundColor: '#FAF7F1', width: 64, height: 64
                }}>
                    <Image source={require('../../../assets/images/products/poloShirt.png')} />
                </View>
                <View style={{ paddingLeft: 16 }}>
                    <Text style={{ fontSize: 16, fontFamily: Font.Gilroy_SemiBold, color: Color.primary, }}>{item.text}</Text>
                    <Text style={{ marginTop: 6, fontSize: 13, fontFamily: Font.Gilroy_Regular, color: Color.secondary, opacity: 0.6 }}>status :
                        <Text style={{ marginTop: 6, fontSize: 15, fontFamily: Font.Gilroy_SemiBold, color: Color.secondary, opacity: 0.6 }}> {item.productName}</Text>
                    </Text>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 15, fontFamily: Font.Gilroy_SemiBold, color: '#363B44' }}>7:12 PM</Text>
                <Text style={{ fontSize: 11, fontFamily: Font.Gilroy_Medium, color: '#656872', opacity: 0.6, marginTop: 6 }}>Yesterday</Text>
            </View>
        </View>
    )
}
const ReasonsList = [
    {
        label: "I received the wrong item",
        value: "I received the wrong item",
    },
    {
        label: "Item or accessory is missing in the package",
        value: "Item or accessory is missing in the package",
    },
    {
        label: "Item has missing freebie",
        value: "Item has missing freebie",
    },
    {
        label: "Item does not match description or picture",
        value: "Item does not match description or picture",
    },
    {
        label: "Item is defective or not working",
        value: "Item is defective or not working",
    },
    {
        label: "Item Does not fit me",
        value: "Item Does not fit me",
    },
];

const ReturnRequest = ({ }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [gender, setGender] = useState();
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);

    return (

        <SafeAreaView style={GlobalStyle.Container}>
            <AppBar />
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <Text style={GlobalStyle.heading}>Return Request</Text>
                <View style={{ marginTop: 20 }}>
                    {ReturnsData.map((item, index) => (
                        <ReturnsDetails item={item} key={index} />
                    ))}
                </View>
                <Text style={{ fontSize: 15, fontFamily: Font.Gilroy_SemiBold, color: Color.primary }}>Return Reason</Text>
                <View style={{ marginTop: 16, }}>
                    <DropDown
                        placeholderTextColor='#000'
                        inputProps={{
                            style: {
                                backgroundColor: Color.light,
                                height: 60,
                            },
                        }}
                        mainContainerStyle={{ backgroundColor: '#fff', }}
                        dropDownItemTextStyle={{ borderRadius: 10, fontSize: 16, fontFamily: Font.Gilroy_Medium, color: Color.secondary, }}
                        label={"Select Reason"}
                        itemContainerStyle={{ backgroundColor: '#fff', }}
                        mode={"outlined"}
                        dropDownItemSelectedTextStyle={{ color: '#000', }}
                        dropDownItemSelectedStyle={{ backgroundColor: '#fff', }}
                        dropDownItemStyle={{ backgroundColor: '#fff', }}
                        visible={showDropDown}
                        showDropDown={() => setShowDropDown(true)}
                        onDismiss={() => setShowDropDown(false)}
                        value={gender}
                        setValue={setGender}
                        list={ReasonsList}
                        dropDownContainerHeight={200}
                    />
                </View>
                <Text style={{ marginTop: 25, fontSize: 15, fontFamily: Font.Gilroy_SemiBold, color: Color.primary }}> Upload Images</Text>
                <View style={{ borderRadius: 16, marginTop: 15, justifyContent: 'center', alignItems: 'center', height: 100, borderWidth: 0.5, borderColor: Color.secondary }}>
                    <TouchableOpacity>
                        <Icon name='plus' iconFamily={'Entypo'} color={Color.primary} size={30} />
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, fontSize: 11, fontFamily: Font.Gilroy_Medium, color: Color.primary }}>Add Image</Text>
                </View>
                <Text style={{ marginTop: 25, fontSize: 15, fontFamily: Font.Gilroy_SemiBold, color: Color.primary }}>Comments</Text>
                <TextInput textAlignVertical='top' numberOfLines={5} style={{ marginTop: 10, borderColor: Color.secondary, borderWidth: 0.5, paddingLeft: 10, borderRadius: 16 }} placeholder='Write Here' placeholderTextColor={'rgba(8, 14, 30, 0.4)'} />
            </ScrollView>
            <View style={{ paddingBottom: 20 }}>
                <Button theme='tertiary' text='Submit' navLink='Voucher' />
            </View>
        </SafeAreaView>
    )
}
export default ReturnRequest;
const ReturnsData = [
    {
        img: require('../../../assets/images/products/shoes.png'),
        text: '50% OFF in ultraboost All',
        productName: 'Terrain LTD Shoes'
    },
]