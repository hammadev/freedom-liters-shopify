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

const OrderItem = ({ item, currencySymbol }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      // onPress={() => navigation.navigate('Review', { productId: item.id })}
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: Window.fixPadding * 2,
      }}>
      <Image
        style={{ width: 64, height: 64, borderRadius: 16 }}
        source={{ uri: item.image.src }}
      />

      <View style={{ paddingLeft: 10, flex: 1 }}>
        <Text style={{ ...GlobalStyle.heading, color: Color.tertiary, fontSize: 13 }}>
          {item.name}
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            // paddingTop: 10,
          }}>
          <Text
            style={{
              fontSize: 13,
              color: '#080E1E',
              fontFamily: Font.Gilroy_Regular,
            }}>
            Qty:{item.quantity}
          </Text>
          <Text
            style={{ ...styles.textStlye, color: Color.secondary, fontSize: 13 }}>
            {currencySymbol + '' + item.total}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const OrderSummary = ({
  onTouchOutside,
  visible,
  orderList,
  onShowDeliveryPopup,
  summaryData,
}) => {


  const renderOutsideTouchable = onTouch => {
    const view = <View style={{ flex: 1, width: '100%' }} />;
    if (!onTouch) {
      return view;
    }
    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{ flex: 1, width: '100%' }}>
        {view}
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onTouchOutside}
      style={{}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000AA',
          justifyContent: 'flex-end',
        }}>
        {renderOutsideTouchable(onTouchOutside)}
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

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: Window.fixPadding,
            }}>
            <Text style={GlobalStyle.heading}>Order Summary</Text>
            <TouchableOpacity
              onPress={() => onTouchOutside()}
              style={{
                borderRadius: 7,
                borderColor: Color.secondary,
                borderWidth: 1,
              }}>
              <Icon
                iconFamily={'Entypo'}
                name="cross"
                size={25}
                color={Color.secondary}
              />
            </TouchableOpacity>
          </View>

          {summaryData.line_items.map((item, i) => (
            <OrderItem item={item} currencySymbol={summaryData.currency_symbol} />
          ))}
          <View style={{ marginTop: Window.fixPadding * 2, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: Window.fixPadding / 2 }}>
              <Text style={GlobalStyle.textStlye}>Shipping</Text>
              <Text style={GlobalStyle.textStlye}>
                {summaryData.currency_symbol + summaryData.shipping_total}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: Window.fixPadding / 2 }}>
              <Text style={GlobalStyle.textStlye}>Tax</Text>
              <Text style={GlobalStyle.textStlye}>
                {summaryData.currency_symbol + summaryData.total_tax}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: Window.fixPadding / 2 }}>
              <Text style={{ ...GlobalStyle.textStlye, fontFamily: Font.Gilroy_ExtraBold, fontSize: 16 }}>Total</Text>
              <Text style={{ ...GlobalStyle.textStlye, fontFamily: Font.Gilroy_ExtraBold, fontSize: 16 }}>
                {summaryData.currency_symbol + summaryData.total}
              </Text>
            </View>
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  textStlye: {
    fontSize: 13,
    fontFamily: Font.Gilroy_SemiBold,
    color: Color.secondary,
    paddingVertical: 5,
  },
  textStlyeTwo: {
    fontSize: 15,
    fontFamily: Font.Gilroy_Medium,
    // color: 'rgba(0.0.0.0.5)',
    color: Color.secondary,

    paddingVertical: 3,
  },
});
