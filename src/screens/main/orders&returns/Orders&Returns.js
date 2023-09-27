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
import { MessagesrSvg, NotificationSvg, ParcelSvg } from '../../../assets/svgs/OrderSvgs';
import StepIndicator from 'react-native-step-indicator';

const Tabs = ({ item, activeTabs, setActiveTabs }) => {
    return (
        <TouchableOpacity
            onPress={() => setActiveTabs(item.id)}
            style={{
                borderRadius: activeTabs === item.id ? 16 : 0, width: Window.width / 2.5, marginHorizontal: 0,
                height: 114, justifyContent: 'center', alignItems: 'center',
                backgroundColor: activeTabs === item.id ? Color.secondary : Color.light
            }}>
            <View style={{ alignItems: 'center' }}>
                <View style={{
                    shadowColor: 'rgba(0,0,0,0.4)',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 22,
                    width: 56, height: 56, alignItems: 'center', justifyContent: 'center', borderRadius: 100, backgroundColor: activeTabs === item.id ? '#FAF7F1' : '#FAF7F1'
                }}>
                    {item.icon}
                </View>
                <Text style={{ marginTop: 10, fontSize: 13, fontFamily: Font.Gilroy_SemiBold, color: activeTabs === item.id ? Color.white : Color.primary }}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const ReturnsDetails = ({ item }) => {
    return (
        <View>
            <View style={{ flex: 1, marginBottom: 32, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
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
        </View>

    )
}

const OrdersDetails = ({ item }) => {
    return (
        <>


            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAF7F1', borderRadius: 16, padding: 10, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 80, height: 72, borderRadius: 16, backgroundColor: '#FAF7F1', borderRadius: 16 }}>
                        <Image source={item.img} />
                    </View>
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={{ fontSize: 17, fontFamily: Font.Gilroy_SemiBold, color: Color.primary }}>{item.productName}</Text>
                        <Text style={{ fontSize: 13, fontFamily: Font.Gilroy_Regular, color: Color.secondary }}>Status :
                            <Text style={{ fontSize: 13, fontFamily: Font.Gilroy_SemiBold, color: Color.secondary }}>{item.status}</Text></Text>
                    </View>
                </View>
                <Icon iconFamily={'Entypo'} name='chevron-small-right' size={20} color={Color.secondary} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '48%' }}>
                    <Button text='Return' navLink='ReturnRequest' theme='light' />
                </View>
                <View style={{ width: '48%' }}>
                    <Button text='Write a Review' theme="yellow" />
                </View>
            </View>
        </>

    )
}
const OrdersReturns = ({ }) => {
    const [activeTabs, setActiveTabs] = useState(1);
    const [active, setActive] = useState('')
    const labels = ["Return Requested", "Return Approved", "Product Picked Up", "Refund Processed"];

    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 50,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 1,
        stepStrokeCurrentColor: '#597766',
        stepStrokeWidth: 1,
        stepStrokeFinishedColor: '#fe7013',
        stepStrokeUnFinishedColor: '#E5E5E5',
        separatorFinishedColor: '#fe7013',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#fe7013',
        stepIndicatorUnFinishedColor: '#E5E5E5',
        stepIndicatorCurrentColor: '#597766',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#fff',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#fff',
        labelColor: '#597766',
        labelSize: 15,
        currentStepLabelColor: '#597766',
        // marginHorizontal: 20
    }

    return (
        <SafeAreaView style={GlobalStyle.Container}>
            <AppBar />
            <Text style={GlobalStyle.heading}>Orders & Returns</Text>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ paddingHorizontal: 0, alignItems: 'center' }}>
                    <FlatList
                        contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
                        style={{ marginTop: 18, }}
                        data={TabsData}
                        renderItem={({ item }) => (
                            <Tabs item={item} setActiveTabs={setActiveTabs} activeTabs={activeTabs} />
                        )}
                        // numColumns={3}
                        horizontal={true}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                    />
                </View>
                <View style={{ marginTop: 48 }}>
                    {activeTabs === 1 ? OrdersData.map((item, index) => (
                        <OrdersDetails item={item} key={index} />
                    )) : ReturnsData.map((item, index) =>
                    (<ReturnsDetails item={item} key={index} />
                    ))}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <StepIndicator
                        customStyles={customStyles}
                        // currentPosition={active.state.currentPosition}
                        labels={labels}
                        stepCount={4}
                        style={{ height: 10 }}
                        direction={'vertical'}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default OrdersReturns;

const TabsData = [
    {
        icon: <ParcelSvg />,
        name: 'Orders',
        id: 1,
    },
    {
        icon: <NotificationSvg />,
        name: 'Returns',
        id: 2,
    },
]

const OrdersData = [
    {
        img: require('../../../assets/images/products/shirt.png'),
        productName: 'Flannel Shirt Checked',
        status: 'Order Placed',
    },
    // {
    //     img: require('../../../assets/images/products/shirt.png'),
    //     text: '50% OFF in ultraboost All',
    //     productName: 'Terrain LTD Shoes'
    // },
]
const ReturnsData = [
    {
        img: require('../../../assets/images/products/shoes.png'),
        text: '50% OFF in ultraboost All',
        productName: 'Terrain LTD Shoes'
    },
    {
        img: require('../../../assets/images/products/shoes.png'),
        text: '50% OFF in ultraboost All',
        productName: 'Terrain LTD Shoes'
    },
]