import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import AppBar from '../../../components/AppBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import {DeleteSvg} from '../../../assets/svgs/CheckoutSvg';
import styles from './CartStyle';
import Icon from '../../../core/Icon';
import Button from '../../../components/Button';
import {useMutation, useQuery} from '@apollo/client';
import StatusBar from '../../../components/AppStatusBar';
import ActivityLoader from '../../../components/ActivityLoader';
import {GET_CART} from '../../../graphql/queries/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {List} from 'react-native-paper';
import TextField2 from '../../../components/TextFeild2';
import {COUPON_CODE} from '../../../graphql/mutations/Coupon';
import {handleCouponCode, hnadleRemoveCartItem} from '../../../apis/cart';
import {CartEmptyIcon, NoCartItem, NoResult} from '../../../assets/svgs/NotificationSvg';
import {showMessage} from 'react-native-flash-message';
import {SkypeIndicator} from 'react-native-indicators';
import {REMOVE_ITEM} from '../../../graphql/mutations/Product';
const PaymentDetails = ({totalAmout, cartId}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [couponCode, setCouponCode] = React.useState(false);
  const [CouponCodeVisibility, setCouponCodeVisibility] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [cart, {data, loading, error}] = useMutation(COUPON_CODE);

  useEffect(() => {
    if (data) {
      setCouponCodeVisibility(false);
    }
  }, []);
  const Apply_Coupon = async () => {
    const variables = {
      cartId: cartId,
      discountCodes: [couponCode],
    };
    handleCouponCode(cart, variables);
    if (data.cartDiscountCodesUpdate.cart.discountCodes[0].applicable == true) {
      setCouponCodeVisibility(false);
    } else if (error) {
      showMessage({
        message: 'Invalid Coupon',
        type: 'danger',
      });
    } else {
      showMessage({
        message: 'Invalid Coupon',
        type: 'danger',
      });
    }
  };

  return (
    <View>
      <View
        style={{
          justifyContent: 'space-between',
          marginVertical: 10,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.TextStyle}> Subtotal </Text>
        <Text style={styles.TotalStyle}>
          ${data ? data.cartDiscountCodesUpdate.cart.cost.subtotalAmount.amount : totalAmout.cost.subtotalAmount.amount}
          {/* $ {data ? data.cartDiscountCodesUpdate.cart.cost.subtotalAmount.amount : totalAmout.cost.subtotalAmount.amount} */}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          marginVertical: 10,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.TextStyle}> Delivery Fee </Text>
        <Text style={styles.TotalStyle}>$ {data ? totalAmout.cost.totalTaxAmount.amount : '00'} </Text>
      </View>
      {data > 0 ? (
        <View>
          <List.Section>
            <List.Accordion title="Apply Coupon" left={props => <List.Icon icon="percent" />} expanded={expanded} onPress={handlePress}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TextField2 icon={'barcode'} onChanged={setCouponCode} label="Apply Coupon" customStyle={{marginTop: 0, width: 200}} />
                {loading ? (
                  <SkypeIndicator size={20} color={Color.black} />
                ) : (
                  <Text onPress={() => Apply_Coupon()} style={styles.TextStyle}>
                    Apply
                  </Text>
                )}
              </View>
            </List.Accordion>
          </List.Section>
        </View>
      ) : (
        <Text style={[styles.TextStyle, {color: 'green'}]}>'Applied Coupon'</Text>
      )}

      <View style={{...GlobalStyle.borderStyle, marginTop: 0}}></View>
      <View
        style={{
          justifyContent: 'space-between',
          marginVertical: 10,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.TextStyle}>Total</Text>
        <Text style={styles.TotalStyle}>$ ${totalAmout.cost.totalAmount.amount}</Text>
      </View>
    </View>
  );
};

const Cart = () => {
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [RemoveLoader, setRemoveLoader] = useState(false);
  const [CartId, setCartId] = useState();
  //// GET USER CART
  const {data: CartData, loadingCartData, error} = useQuery(GET_CART, {variables: {cartId: CartId}});
  /////  REMOVE CART ITEM
  const [cartLinesRemove, {data: RemoveData, loading: RemoveLoading, error: RemoveError}] = useMutation(REMOVE_ITEM);

  useEffect(() => {
    Get_Cart_Id();
  }, []);
  const Get_Cart_Id = async () => {
    let CART_ID = await AsyncStorage.getItem('CART_ID');
    setCartId(CART_ID);
  };

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

  const Remove_Items = item => {
    setRemoveLoader(true);
    console.log(item);
    const variables = {
      cartId: CartId,
      lineIds: [item],
    };
    hnadleRemoveCartItem(cartLinesRemove, variables);
    if (RemoveData) {
      setRemoveLoader(false);
    }
  };
  return (
    <>
      {loadingCartData ? (
        <SafeAreaView style={{flex: 1}}>
          <StatusBar />
          <View style={{backgroundColor: Color.white, paddingHorizontal: 20, paddingVertical: 20}}>
            <AppBar
              theme={'light'}
              center={<Text style={{...GlobalStyle.heading, fontSize: 22, color: 'black'}}>Your Cart</Text>}
              right={<Text></Text>}
            />
          </View>
          <ActivityLoader />
          {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <NoCartItem />
            <Text
              style={{
                ...GlobalStyle.heading,
                textAlign: 'center',
                marginTop: Window.fixPadding * 2,
              }}>
              Empty
            </Text>
            <Text
              style={{
                ...GlobalStyle.textStlye,
                textAlign: 'center',
                marginVertical: Window.fixPadding,
              }}>
              You do not have any item in your cart
            </Text>
          </View> */}
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <StatusBar />
          <View style={{backgroundColor: Color.white, paddingHorizontal: 20, paddingVertical: 20}}>
            <AppBar center={<Text style={{...GlobalStyle.heading, fontSize: 22, color: 'black'}}>Your Cart</Text>} right={<Text></Text>} />
          </View>
          {/* ITEM VIEW */}
          <ScrollView style={{backgroundColor: Color.white}} contentContainerStyle={{flexGrow: 1}}>
            <View style={{paddingHorizontal: 20}}>
              <Text
                style={{
                  marginTop: 24,
                  fontFamily: Font.Gilroy_Medium,
                  letterSpacing: 0.1,
                  fontSize: 13,
                  color: Color.primary,
                }}>
                Spend $500
                <Text
                  style={{
                    fontFamily: Font.Gilroy_Medium,
                    letterSpacing: 0.1,
                    color: Color.secondary,
                    fontSize: 13,
                    color: 'rgba(0,0,0,0.5)',
                  }}>
                  enjoy free shipping for standard delivery option
                </Text>
              </Text>
            </View>
          </ScrollView>
          {/* BOTTOM VIEW */}
          <View
            style={{
              backgroundColor: Color.white,
              paddingBottom: 20,
              paddingHorizontal: 20,
              justifyContent: 'flex-end',
            }}>
            <View style={{paddingBottom: 10}}>
              {/* <PaymentDetails totalAmout={CartData.cart ? CartData.cart : ''} cartId={CartId} /> */}
            </View>
            <Button text="Proceed to Checkout" icon="mail" isIcon={false} theme="tertiary" navLink="Payment" />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};
export default Cart;
