import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../components/Header'
import { COLORS } from '../../../constants'
import { Color, Font, GlobalStyle, Window } from '../../../globalStyle/Theme'
import Icon from '../../../core/Icon'
import Button from '../../../components/Button';

const CustomDesignQty = ({ navigation }) => {
    const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

    // Initialize state for quantities for each size
    const [quantities, setQuantities] = useState({});

    // Function to update quantity for a specific size
    const updateQuantity = (size, newQuantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [size]: newQuantity
        }));
    };

    // Function to decrement quantity for a specific size
    const decrementValue = size => {
        const currentQuantity = quantities[size] || 0;
        if (currentQuantity > 0) {
            updateQuantity(size, currentQuantity - 1);
        }
    };

    // Function to increment quantity for a specific size
    const incrementValue = size => {
        const currentQuantity = quantities[size] || 0;
        if (currentQuantity < 10) {
            updateQuantity(size, currentQuantity + 1);
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <Header label="Enter Quantity" />
            <View style={styles.row}>
                <Image style={{ width: Window.width / 3, height: 160 }} source={require('../../../assets/images/images/sample_tshirt.png')} />
                <View style={{ marginLeft: 20, marginTop: 20 }}>
                    <Text style={{ ...GlobalStyle.textStlye, color: Color.gryLight, fontSize: 18 }}>Product Name 01</Text>
                    <Text style={{ ...GlobalStyle.textStlye }}>4.2 (34 Reviews)</Text>
                    <Text style={{ ...GlobalStyle.textStlye, marginTop: 10, fontSize: 22 }}>Product Name 01</Text>
                </View>
            </View>
            <View style={{ padding: 20 }}>
                <Text style={{ ...GlobalStyle.textStlye, fontSize: 22, textAlign: 'center' }}>Total Quantity : 07</Text>
                <View style={{ paddingHorizontal: 15 }}>

                    {sizes.map((size, i) => (
                        <View key={i} style={{ marginTop: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ ...GlobalStyle.heading }}>{size}</Text>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.cartStyle} onPress={() => decrementValue(size)}>
                                    <Icon iconFamily={'AntDesign'} name={'minus'} style={styles.MinusStyle} />
                                </TouchableOpacity>
                                <Text style={styles.NumStyle}>{quantities[size] || 0}</Text>
                                <TouchableOpacity style={styles.cartStyle} onPress={() => incrementValue(size)}>
                                    <Icon iconFamily={'Ionicons'} name={'md-add'} color={Color.light} style={styles.AddStyle} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    <Button
                        text='Proceed to Checkout'
                        icon="mail"
                        isIcon={false}
                        type="primary"
                        navLink='Cart'
                        style={{ marginTop: 30 }}
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}

export default CustomDesignQty

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    row: {
        flexDirection: 'row',
        padding: 20,
    },
    NumStyle: {
        color: Color.secondary,
        fontSize: 14,
        fontFamily: Font.Gilroy_SemiBold,
        marginHorizontal: 10,
    },
    AddStyle: {
        color: Color.secondary,
        fontSize: 16,
    },
    MinusStyle: {
        color: Color.secondary,
        fontSize: 16,
    },
    cartStyle: {
        width: 30,
        height: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.secondary,
        borderWidth: 1,
    },
});
