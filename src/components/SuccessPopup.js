import {
    Modal,
    Text,
    TouchableWithoutFeedback,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import React from 'react';
import { Font, Window, Color, GlobalStyle } from '../globalStyle/Theme';
import { useNavigation } from '@react-navigation/native';
import Icon from '../core/Icon';
import Button from './Button';

const SuccessPopup = ({
    visible,
}) => {
    const navigation = useNavigation();
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            style={{}}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#000000AA',
                    justifyContent: 'flex-end',
                }}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        width: '100%',
                        borderTopRightRadius: 54,
                        borderTopLeftRadius: 54,
                        paddingVertical: Window.fixPadding * 2.5,
                        borderRadius: 20,
                        paddingHorizontal: 20,
                    }}>
                    <View style={{ backgroundColor: 'rgb(235,251,253)', height: 90, width: 90, borderRadius: 90 / 2, alignSelf: 'center', marginBottom: Window.fixPadding * 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon iconFamily={'Feather'} name={'check-square'} size={45} color={Color.tertiary} />
                    </View>
                    <Text style={{ ...GlobalStyle.heading, textAlign: 'center' }}>Order placed!</Text>
                    <Text style={{ ...GlobalStyle.textStlye, textAlign: 'center', marginVertical: Window.fixPadding * 2 }}>Thank you for choosing our products! {'\n'}Happy Shoping</Text>

                    <Button text="Continue Shopping" theme="tertiary" navLink="BottomTabScreen" />
                    <TouchableOpacity onPress={() => navigation.replace('MyOrder')}>
                        <Text style={{ ...GlobalStyle.textStlye, textAlign: 'center', marginVertical: Window.fixPadding * 1.5 }}>Track Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default SuccessPopup;