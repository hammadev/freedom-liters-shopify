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
import {handleCouponCode, hnadleIncreseCartValue, hnadleRemoveCartItem} from '../../../apis/cart';
import {CartEmptyIcon, NoCartItem, NoResult} from '../../../assets/svgs/NotificationSvg';
import {showMessage} from 'react-native-flash-message';
import {SkypeIndicator} from 'react-native-indicators';
import {REMOVE_ITEM} from '../../../graphql/mutations/Product';
import {INCREASE_CART_VALUE} from '../../../graphql/mutations/Cart';
const PaymentDetails = ({totalAmout, cartId}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [couponCode, setCouponCode] = React.useState(false);
  const [CouponCodeVisibility, setCouponCodeVisibility] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [cart, {data, loading, error}] = useMutation(COUPON_CODE);
  console.log('NEW', data);
  useEffect(() => {
    if (data) {
      setCouponCodeVisibility(false);
    }
  }, [data, loading, error]);
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
          backgroundColor: '',
        }}>
        <Text style={styles.TextStyle}> Subtotal </Text>
        <Text style={styles.TotalStyle}>
          {data ? data.cartDiscountCodesUpdate.cart.cost.totalAmount.amount : totalAmout.subtotalAmount.amount}{' '}
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

        <Text style={styles.TotalStyle}> {totalAmout ? totalAmout.totalTaxAmount.amount : '0.00'} </Text>
      </View>
      {!data ? (
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
        {/* <Text style={styles.TotalStyle}>$ ${totalAmout.cost.totalAmount.amount}</Text> */}
        <Text style={styles.TotalStyle}> {totalAmout ? totalAmout.totalAmount.amount : '0.00'} PKR</Text>
      </View>
    </View>
  );
};

const Cart = () => {
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [CartItems, setCartItems] = useState();
  const [RemoveLoader, setRemoveLoader] = useState(false);
  const [CartId, setCartId] = useState();
  //// GET USER CART
  const {data: CartData, loadingCartData, errorCartData} = useQuery(GET_CART, {variables: {cartId: CartId}});
  //// GET USER CART
  const [cartLinesUpdate, {data: IncreaseData, loading: IncreaseLoading, error: IncreaseError}] = useMutation(INCREASE_CART_VALUE);
  /////  REMOVE CART ITEM
  const [cartLinesRemove, {data: RemoveData, loading: RemoveLoading, error: RemoveError}] = useMutation(REMOVE_ITEM);

  useEffect(() => {
    Get_Cart_Id();
    if (CartData && !loadingCartData && !errorCartData) {
      setCartItems(CartData.cart);
      console.log('Itemmm Cart', CartItems);
    }
  }, [CartData, loadingCartData, errorCartData]);

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
  const incrementValue = item => {
    console.log(item.node.id);
    const variables = {
      cartId: CartId,
      lines: {
        id: item.node.id,
        quantity: item.node.quantity + 1,
      },
    };
    hnadleIncreseCartValue(cartLinesUpdate, variables);
  };

  const Remove_Items = item => {
    setRemoveLoader(true);

    const variables = {
      cartId: CartId,
      lineIds: item.node.id,
    };
    hnadleRemoveCartItem(cartLinesRemove, variables);
    if (RemoveData) {
      setRemoveLoader(false);
    }
  };
  return (
    <>
      {CartData ? (
        <SafeAreaView style={{flex: 1}}>
          <StatusBar />
          <View style={{backgroundColor: Color.white, paddingVertical: 20}}>
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

            {CartItems ? (
              CartItems.lines.edges.map(item => (
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      shadowColor: 'rgba(0,0,0,0.4)',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 22,
                      backgroundColor: '#FAF7F1',
                      borderRadius: 16,
                      width: 88,
                      height: 88,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 24,
                      marginLeft: 10,
                    }}>
                    {item.node.merchandise.image ? (
                      <Image style={{width: 70, height: 70, borderRadius: 15}} source={{uri: item.node.merchandise.image.url}} />
                    ) : (
                      <Image source={require('../../../assets/images/products/flannelShirt.png')} />
                    )}
                  </View>
                  <View style={{paddingLeft: 15, width: Window.width / 1.47, marginTop: 24}}>
                    <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                      <Text style={{fontSize: 15, fontFamily: Font.Gilroy_SemiBold, color: Color.primary}}>
                        {item.node.merchandise.product.title}
                      </Text>
                      <Text style={{fontSize: 15, fontFamily: Font.Gilroy_SemiBold, color: '#363B44'}}>
                        {item.node.quantity} x {item.node.cost.amountPerQuantity.amount} ={' '}
                        {item.node.quantity * item.node.cost.amountPerQuantity.amount}
                      </Text>
                    </View>
                    <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                      <Text style={{fontSize: 15, fontFamily: Font.Gilroy_SemiBold, color: Color.primary}}>
                        {item.node.merchandise.product.tags[0]}
                      </Text>
                    </View>

                    <View style={{paddingLeft: 15, width: Window.width / 1.47}}>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexDirection: 'row',
                          marginTop: 18.25,
                          marginRight: 10,
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <TouchableOpacity style={styles.cartStyle} onPress={() => decrementValue('adult')}>
                            <Icon iconFamily={'AntDesign'} name={'minus'} style={styles.MinusStyle} />
                          </TouchableOpacity>
                          <Text style={styles.NumStyle}>{item.node.quantity}</Text>
                          <TouchableOpacity style={{...styles.cartStyle, borderColor: Color.tertiary}} onPress={() => incrementValue(item)}>
                            <Icon iconFamily={'Ionicons'} name={'md-add'} color={Color.light} style={styles.AddStyle} />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => Remove_Items(item)}>
                          <DeleteSvg />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <ActivityLoader />
            )}
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
              <PaymentDetails totalAmout={CartItems ? CartItems.cost : ''} cartId={CartId} />
            </View>
            <Button text="Proceed to Checkout" icon="mail" isIcon={false} theme="tertiary" navLink="Payment" />
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <StatusBar />
          <View style={{backgroundColor: Color.white, paddingHorizontal: 20, paddingVertical: 20}}>
            <AppBar
              theme={'light'}
              center={<Text style={{...GlobalStyle.heading, fontSize: 22, color: 'black'}}>Your Cart</Text>}
              right={<Text></Text>}
            />
          </View>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
          </View>
        </SafeAreaView>
      )}
    </>
  );
};
export default Cart;
