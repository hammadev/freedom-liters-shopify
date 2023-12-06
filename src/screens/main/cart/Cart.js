import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import {DeleteSvg} from '../../../assets/svgs/CheckoutSvg';
import Icon from '../../../core/Icon';
import Button from '../../../components/Button';
import {useMutation, useQuery} from '@apollo/client';
import ActivityLoader from '../../../components/ActivityLoader';
import {GET_CART} from '../../../graphql/queries/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextField2 from '../../../components/TextFeild2';
import {COUPON_CODE} from '../../../graphql/mutations/Coupon';
import {
  handleCouponCode,
  hnadleDecreaseCartValue,
  hnadleIncreseCartValue,
  hnadleRemoveCartItem,
} from '../../../apis/cart';

import {REMOVE_ITEM} from '../../../graphql/mutations/Product';
import {INCREASE_CART_VALUE} from '../../../graphql/mutations/Cart';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Header from '../../../components/Header';
import {
  COLORS,
  CONTAINER_PADDING,
  FONTS,
  RADIUS,
  WIDTH,
} from '../../../constants';
import BottomPopupHOC from '../../../components/BottomPopupHOC';
import {ChevronSvg} from '../../../assets/svgs/ProfileSvgs';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';

const PaymentDetails = ({totalAmout, cartId, setCouponPopup}) => {
  return (
    <>
      {totalAmout && (
        <>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentTextStyle}>Subtotal</Text>
            <Text style={styles.paymentRightStyle}>
              {totalAmout.subtotalAmount.amount}
            </Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentTextStyle}>Delivery Fee</Text>
            <Text style={styles.paymentRightStyle}>
              {totalAmout.totalTaxAmount.amount}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setCouponPopup(true)}
            style={styles.paymentRow}>
            <Text style={styles.paymentTextStyle}>Apply Coupon</Text>
            <ChevronSvg />
          </TouchableOpacity>

          <View style={{...GlobalStyle.borderStyle, marginTop: 0}}></View>
          <View style={[styles.paymentRow, {marginTop: 20}]}>
            <Text style={styles.paymentTextStyle}>Total</Text>
            <Text style={styles.paymentRightStyle}>
              {totalAmout ? totalAmout.totalAmount.amount : '0.00'} PKR
            </Text>
          </View>
        </>
      )}
    </>
  );
};

const Cart = () => {
  const [CartItems, setCartItems] = useState('');
  const [RemoveLoader, setRemoveLoader] = useState(false);
  const [couponPopup, setCouponPopup] = useState(false);
  const [CartId, setCartId] = useState();
  //COUPON START
  const [couponCode, setCouponCode] = useState(false);
  const [CouponCodeVisibility, setCouponCodeVisibility] = useState(true);

  const [cart] = useMutation(COUPON_CODE);

  useEffect(() => {
    Check_Coupon();
  });

  const Check_Coupon = async () => {
    const Coupon = await AsyncStorage.getItem('COUPON');
    if (Coupon) {
      setCouponCodeVisibility(false);
    } else {
      setCouponCodeVisibility(true);
    }
  };

  const Apply_Coupon = async () => {
    const variables = {
      cartId: CartId,
      discountCodes: couponCode,
    };
    handleCouponCode(cart, variables);
  };

  //COUPON END
  //// GET USER CART
  const {
    data: CartData,
    loadingCartData,
    errorCartData,
  } = useQuery(GET_CART, {variables: {cartId: CartId}});
  //// ICREASE CART ITEM
  const [cartLinesUpdate] = useMutation(INCREASE_CART_VALUE);
  //// REMOVE CART ITEM
  const [
    cartLinesRemove,
    {data: RemoveData, loading: RemoveLoading, error: RemoveError},
  ] = useMutation(REMOVE_ITEM);
  const isFocused = useIsFocused();

  useEffect(() => {
    Get_Cart_Id();
    if (CartData && !loadingCartData && !errorCartData) {
      setCartItems(CartData.cart);
      setTimeout(() => {
        setRemoveLoader(true);
      }, 2000);
    } else {
      setTimeout(() => {
        setRemoveLoader(true);
      }, 1000);
    }
  }, [isFocused, CartData, loadingCartData, errorCartData]);

  const Get_Cart_Id = async () => {
    let CART_ID = await AsyncStorage.getItem('CART_ID');
    setCartId(CART_ID);
  };
  const decrementValue = item => {
    const variables = {
      cartId: CartId,
      lines: {
        id: item.node.id,
        quantity: item.node.quantity - 1,
      },
    };
    hnadleDecreaseCartValue(cartLinesUpdate, variables);
  };
  const incrementValue = item => {
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
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={COLORS.white}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      />
      <Header label="Your Cart" />

      {!RemoveLoader ? (
        <ActivityLoader />
      ) : CartItems && CartItems.lines.edges.length > 0 ? (
        <>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: CONTAINER_PADDING,
              paddingVertical: 25,
            }}>
            {CartItems.lines.edges.length > 0 && (
              <Text style={styles.topText}>
                Spend $500{' '}
                <Text
                  style={{
                    color: COLORS.secondary,
                    fontFamily: FONTS.regular,
                  }}>
                  enjoy free shipping for standard delivery option
                </Text>
              </Text>
            )}
            {CartItems ? (
              CartItems.lines.edges.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 15,
                  }}>
                  {item.node.merchandise.image ? (
                    <Image
                      style={{width: 80, height: 80, borderRadius: RADIUS}}
                      source={{uri: item.node.merchandise.image.url}}
                    />
                  ) : (
                    <Image
                      style={{width: 80, height: 80, borderRadius: RADIUS}}
                      source={require('../../../assets/images/products/flannelShirt.png')}
                    />
                  )}
                  <View style={{flex: 1, marginLeft: 10}}>
                    <View style={styles.cartRowTop}>
                      <View>
                        <Text style={styles.cartHeading} numberOfLines={2}>
                          {item.node.merchandise.product.title}
                        </Text>
                        <Text style={styles.tags}>
                          {item.node.merchandise.product.tags[0]}
                        </Text>
                      </View>
                      <Text style={styles.cartPrice}>
                        {item.node.quantity} x{' '}
                        {item.node.cost.amountPerQuantity.amount} ={' '}
                        {item.node.quantity *
                          item.node.cost.amountPerQuantity.amount}
                      </Text>
                    </View>
                    <View style={styles.cartRowBottom}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          style={styles.cartBtn}
                          onPress={() => decrementValue(item)}>
                          <Icon
                            iconFamily={'AntDesign'}
                            name={'minus'}
                            style={styles.minusStyle}
                          />
                        </TouchableOpacity>
                        <Text style={styles.numStyle}>
                          {item.node.quantity}
                        </Text>
                        <TouchableOpacity
                          style={{
                            ...styles.cartBtn,
                            borderColor: Color.tertiary,
                          }}
                          onPress={() => incrementValue(item)}>
                          <Icon
                            iconFamily={'Ionicons'}
                            name={'md-add'}
                            style={styles.addStyle}
                          />
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity onPress={() => Remove_Items(item)}>
                        <DeleteSvg />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <ActivityLoader />
            )}
          </ScrollView>

          {/* BOTTOM CONTAINER */}
          <View style={styles.bottomContainer}>
            {CartItems ? (
              CartItems.lines.edges.length > 0 ? (
                <View style={{paddingBottom: 10}}>
                  <PaymentDetails
                    totalAmout={CartItems ? CartItems.cost : ''}
                    cartId={CartId}
                    setCouponPopup={setCouponPopup}
                  />
                </View>
              ) : (
                <ActivityLoader />
              )
            ) : (
              <ActivityLoader />
            )}
            {CartItems.lines.edges.length > 0 && (
              <Button text="Proceed to Checkout" type="primary" />
            )}
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            style={styles.cartEmptyImg}
            source={require('../../../assets/images/images/ShoppingCart.png')}
          />
          <Text style={styles.cartEmptyTitle}>Your cart is empty</Text>
          <Text style={styles.cartEmptySubtitle}>
            Discover your next favorite thing - {'\n'} start shopping now!
          </Text>
        </View>
      )}
      <BottomPopupHOC
        title="Apply Coupon"
        color={Color.primary}
        PopupBody={
          <>
            <View style={{marginBottom: 25}}>
              {CouponCodeVisibility == true ? (
                <View style={{position: 'relative', overflow: 'hidden'}}>
                  <TextField2
                    icon={'barcode'}
                    onChanged={setCouponCode}
                    label="Enter Coupon"
                  />

                  <TouchableOpacity
                    onPress={() => Apply_Coupon()}
                    style={styles.applyCouponBtn}>
                    <Text style={styles.applyCouponText}>Apply Now</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={[styles.TextStyle, {color: 'green'}]}>
                  Applied Coupon
                </Text>
              )}
            </View>
          </>
        }
        visible={couponPopup}
        setVisible={setCouponPopup}
      />
    </SafeAreaView>
  );
};
export default Cart;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
  emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  bottomContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    shadowColor: Platform.OS === 'ios' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5.84,
    elevation: 12,
    paddingHorizontal: CONTAINER_PADDING,
  },
  cartEmptyImg: {width: 150, height: 150},
  cartEmptySubtitle: {
    textAlign: 'center',
    color: COLORS.secondary,
    fontFamily: Font.regular,
  },
  cartEmptyTitle: {
    fontFamily: Font.Gilroy_SemiBold,
    fontSize: 22,
    textAlign: 'center',
    color: COLORS.tertiary,
    marginTop: 15,
    marginBottom: 5,
  },
  topText: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    marginBottom: 15,
  },
  paymentRow: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentTextStyle: {
    fontSize: 14,
    color: COLORS.tertiary,
    fontFamily: FONTS.medium,
  },
  paymentRightStyle: {
    fontSize: 15,
    color: COLORS.tertiary,
    fontFamily: FONTS.semiBold,
  },
  applyCouponBtn: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    height: 50,
    marginTop: 15,
  },
  applyCouponText: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
  },
  cartHeading: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: Color.primary,
    width: WIDTH / 3.5,
  },
  cartPrice: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: Color.primary,
  },
  tags: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: Color.primary,
    marginTop: 2.5,
    textTransform: 'capitalize',
  },
  cartRowTop: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  cartRowBottom: {
    // flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cartBtn: {
    height: 25,
    width: 25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.secondary,
    borderWidth: 1,
  },
  minusStyle: {
    color: COLORS.secondary,
    fontSize: 16,
  },
  numStyle: {
    color: COLORS.tertiary,
    fontSize: 14,
    fontFamily: FONTS.medium,
    marginHorizontal: 10,
  },
  addStyle: {
    color: COLORS.primary,
    fontSize: 16,
  },
  /////////////
  ContainerContent: {
    paddingLeft: 15,
    width: Window.width / 1.47,
    marginTop: 24,
  },

  DeliveryStyle: {
    fontSize: 13,
    color: Color.primary,
    fontFamily: Font.Gilroy_SemiBold,
  },

  Heading: {
    fontSize: 18,
    color: Color.secondary,
    lineHeight: 21.6,
    width: 150,
    fontFamily: Font.Gilroy_Bold,
  },
  OneStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: Color.primary,
    fontFamily: Font.Gilroy_Bold,
    borderWidth: 1,
    borderColor: Color.primary,
    height: 32,
    width: 32,
    borderRadius: 10,
  },
  BoxContainerStyle: {
    backgroundColor: Color.white,
    padding: 15,
    marginTop: 20,
    borderRadius: 24,
    marginHorizontal: Window.fixPadding * 2,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 22,
  },
  fab: {
    position: 'absolute',
    margin: 10,
    left: -15,
    top: -15,
    backgroundColor: Color.primary,
    height: 24,
    width: 24,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartStyle: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Color.secondary,
    borderWidth: 2,
  },
});
