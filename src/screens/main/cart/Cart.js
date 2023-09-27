import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    StatusBar,
    ImageBackground,
} from 'react-native';
import AppBar from '../../../components/AppBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color, Font, GlobalStyle, Window } from '../../../globalStyle/Theme';
import { BoxSvg, DeleteSvg, EditSvg } from '../../../assets/svgs/CheckoutSvg';
import styles from './CartStyle';
import Icon from '../../../core/Icon';
import Button from '../../../components/Button';

const PaymentDetails = ({ }) => {
    return (
        <View style={{}}>
            <View
                style={{
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                <Text style={styles.TextStyle}> Subtotal </Text>
                <Text style={styles.TotalStyle}>$190.56 </Text>
            </View>
            <View
                style={{
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                <Text style={styles.TextStyle}> Delivery Fee </Text>
                <Text style={styles.TotalStyle}>$1880 </Text>
            </View>

            <View style={{ ...GlobalStyle.borderStyle, marginTop: 0 }}></View>
            <View
                style={{
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                <Text style={styles.TextStyle}>Total</Text>
                <Text style={styles.TotalStyle}>$190 </Text>
            </View>
        </View>
    );
};

const Cart = ({ }) => {
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);

    const decrementValue = name => {
        if (name == 'child') {
            setChildCount(childCount - 1);
        } else if (name == 'adult') {
            if (adultCount > 1) {
                setAdultCount(adultCount - 1);
            }
        }
    };
    const incrementValue = name => {
        if (name == 'child') {
            setChildCount(childCount + 1);
        } else if (name == 'adult') {
            setAdultCount(adultCount + 1);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: Color.white, paddingHorizontal: 20, paddingVertical: 20 }}>
                <AppBar center={
                    <Text style={{ ...GlobalStyle.heading, fontSize: 22 }}>Your Cart</Text>
                }
                    right={
                        <Text>dfsd</Text>
                    }
                />
            </View>
            <ScrollView
                style={{ backgroundColor: Color.light }}
                contentContainerStyle={{ flexGrow: 1, }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={{ marginTop: 24, fontFamily: Font.Gilroy_Medium, letterSpacing: 0.1, fontSize: 13, color: Color.primary }}>Spend $500
                        <Text style={{ fontFamily: Font.Gilroy_Medium, letterSpacing: 0.1, color: Color.secondary, fontSize: 13, color: 'rgba(0,0,0,0.5)' }}> enjoy free shipping for standard delivery option</Text> </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24, paddingHorizontal: 20 }}>
                    <View style={{
                        shadowColor: 'rgba(0,0,0,0.4)',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 22,
                        backgroundColor: '#FAF7F1', borderRadius: 16, width: 88, height: 88
                    }}>
                        <Image source={require('../../../assets/images/products/flannelShirt.png')} />
                    </View>
                    <View style={{ paddingLeft: 15, width: Window.width / 1.47 }}>
                        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, fontFamily: Font.Gilroy_SemiBold, color: Color.primary }}>Mens Flannel Shirt</Text>
                            <Text style={{ fontSize: 15, fontFamily: Font.Gilroy_SemiBold, color: '#363B44' }}>$120.00</Text>
                        </View>
                        <View style={{ marginTop: 4, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 13, fontFamily: Font.Gilroy_Medium, color: 'rgba(8, 14, 30, 0.6)' }}>Men’s T-Shirt</Text>
                            <Text style={{ fontSize: 11, fontFamily: Font.Gilroy_Medium, color: Color.tertiary }}>$200.00</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 18.25 }}>
                            <View
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}>
                                <TouchableOpacity
                                    style={styles.cartStyle}
                                    onPress={() => decrementValue('adult')}>
                                    <Icon
                                        iconFamily={'AntDesign'}
                                        name={'minus'}
                                        style={styles.MinusStyle}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.NumStyle}>{adultCount}</Text>
                                <TouchableOpacity
                                    style={{ ...styles.cartStyle, borderColor: Color.tertiary, }}
                                    onPress={() => incrementValue('adult')}>
                                    <Icon
                                        iconFamily={'Ionicons'}
                                        name={'md-add'}
                                        color={Color.light}
                                        style={styles.AddStyle}
                                    />
                                </TouchableOpacity>
                            </View>
                            <DeleteSvg />
                        </View>
                    </View>
                </View>


            </ScrollView>
            <View style={{ backgroundColor: Color.white, paddingBottom: 20, height: Window.height / 3.5, paddingHorizontal: 20, justifyContent: 'flex-end' }}>
                <View style={{ paddingBottom: 10 }}>
                    <PaymentDetails />
                </View>
                <Button
                    text='Proceed to Checkout'
                    icon="mail"
                    isIcon={false}
                    theme="tertiary"
                    navLink='Payment'
                />
            </View>
        </SafeAreaView>
    )
}
export default Cart;