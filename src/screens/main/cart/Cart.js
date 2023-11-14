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
import {handleCouponCode} from '../../../apis/cart';
const PaymentDetails = ({totalAmout, cartId}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [couponCode, setCouponCode] = React.useState(false);
  const [CouponCodeVisibility, setCouponCodeVisibility] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [cart, {data, loading, error}] = useMutation(COUPON_CODE);

  const Apply_Coupon = async () => {
    const variables = {
      cartId: cartId,
      discountCodes: [couponCode],
    };
    handleCouponCode(cart, variables);
    handlePress();
  };

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
        <Text style={styles.TotalStyle}>
          ${totalAmout.cost.subtotalAmount.amount}
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
        <Text style={styles.TotalStyle}>$ {totalAmout.cost.totalTaxAmount.amount} </Text>
      </View>
      {CouponCodeVisibility ? (
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
                <Text onPress={() => Apply_Coupon()} style={styles.TextStyle}>
                  Apply
                </Text>
              </View>
            </List.Accordion>
          </List.Section>
        </View>
      ) : (
        'Applied Coupon Code'
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
        <Text style={styles.TotalStyle}>$ {totalAmout.cost.totalAmount.amount} </Text>
      </View>
    </View>
  );
};

const Cart = () => {
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [CartId, setCartId] = useState();

  const {data, loading, error} = useQuery(GET_CART, {
    variables: {
      cartId: CartId,
    },
  });

  console.log(data);
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
  return (
    <>
      {loading ? (
        <ActivityLoader />
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
            {data ? (
              data.cart.lines.edges.map((i, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 24,
                    marginBottom: 10,
                    paddingHorizontal: 20,
                  }}>
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
                    }}>
                    {i.node.merchandise.image ? (
                      <Image source={{uri: `${i.node.merchandise.image.url}`}} />
                    ) : (
                      <Image tintColor={Color.gryLight} source={require('../../../assets/images/products/noimage.png')} />
                    )}
                  </View>
                  <View style={{paddingLeft: 15, width: Window.width / 1.47}}>
                    <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                      <Text style={{fontSize: 15, fontFamily: Font.Gilroy_SemiBold, color: Color.primary}}>
                        {i.node.merchandise.product.title}
                      </Text>
                      <Text style={{fontSize: 15, fontFamily: Font.Gilroy_SemiBold, color: '#363B44'}}>
                        ${i.node.cost.amountPerQuantity.amount}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: 4,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: Font.Gilroy_Medium,
                          color: 'rgba(8, 14, 30, 0.6)',
                        }}>
                        {i.node.merchandise.product.title}
                      </Text>
                      <Text style={{fontSize: 11, fontFamily: Font.Gilroy_Medium, color: Color.tertiary}}>
                        {i.node.quantity} x {i.node.cost.amountPerQuantity.amount} ={' '}
                        {i.node.quantity * i.node.cost.amountPerQuantity.amount}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 18.25,
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <TouchableOpacity style={styles.cartStyle} onPress={() => decrementValue('adult')}>
                          <Icon iconFamily={'AntDesign'} name={'minus'} style={styles.MinusStyle} />
                        </TouchableOpacity>
                        <Text style={styles.NumStyle}>{adultCount}</Text>
                        <TouchableOpacity
                          style={{...styles.cartStyle, borderColor: Color.tertiary}}
                          onPress={() => incrementValue('adult')}>
                          <Icon iconFamily={'Ionicons'} name={'md-add'} color={Color.light} style={styles.AddStyle} />
                        </TouchableOpacity>
                      </View>
                      <DeleteSvg />
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
              <PaymentDetails totalAmout={data.cart} cartId={CartId} />
            </View>
            <Button text="Proceed to Checkout" icon="mail" isIcon={false} theme="tertiary" navLink="Payment" />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};
export default Cart;
