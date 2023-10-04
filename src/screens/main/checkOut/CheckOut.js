import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AppBar from '../../../components/AppBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import Button from '../../../components/Button';
import styles from './CheckOutStyle';
import {DeleteSvg} from '../../../assets/svgs/CheckoutSvg';
import {useDispatch, useSelector} from 'react-redux';
import Heading from '../../../components/Heading';
import {NoResult} from '../../../assets/svgs/NotificationSvg';
import {placeOrder} from '../../../apis/order';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import {RadioButton} from 'react-native-paper';
import {fetchPaymentSheetParams} from '../../../apis/general_settings';
import {showMessage} from 'react-native-flash-message';
import BottomPopupHOC from '../../../components/BottomPopupHOC';
import {useNavigation} from '@react-navigation/native';

const OrderSummary = ({subTotal}) => {
  return (
    <View style={{marginVertical: Window.fixPadding}}>
      <View
        style={{
          justifyContent: 'space-between',
          marginVertical: 10,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.TextStyle}> Subtotal </Text>
        <Text style={styles.TotalStyle}>${subTotal.toFixed(2)} </Text>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          marginVertical: 10,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.TextStyle}> Shipping charges </Text>
        <Text style={styles.TotalStyle}>$8</Text>
      </View>
      <View
        style={{
          ...GlobalStyle.borderStyle,
          marginVertical: Window.fixPadding / 1.5,
          marginTop: Window.fixPadding / 2,
        }}></View>
      <View
        style={{
          justifyContent: 'space-between',
          marginVertical: 10,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.TextStyle}> Total</Text>
        <Text style={styles.TotalStyle}>${(subTotal + 8).toFixed(2)}</Text>
      </View>
    </View>
  );
};

const ProductList = ({
  quantityFunc,
  onOpenDeleteCart,
  item,
  setCartItemIndex,
  setCartItemAmount,
  setCartItemQuantity,
  index,
}) => {
  const [qty, setQty] = useState(item.quantity);
  const [productDetails, setProductDetails] = useState({
    image: item.selectedVariation
      ? item.selectedVariation.image
      : item.productDetails.node.featuredImage?.url,
    price: item.selectedVariation
      ? item.selectedVariation.sale_price
      : item.productDetails.price,
  });

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
      <View
        style={{
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 12,
          backgroundColor: '#FAF7F1',
          borderRadius: 16,
          width: '20%',
          height: 78,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: '80%', height: '80%', borderRadius: Window.fixPadding}}
          source={{uri: productDetails.url}}
        />
      </View>
      <View style={{paddingLeft: 15, width: '80%'}}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: Font.Gilroy_SemiBold,
              color: Color.primary,
            }}>
            {item.productDetails.node.title}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: Font.Gilroy_SemiBold,
              color: '#363B44',
              marginLeft: Window.fixPadding,
            }}>
            $
            {item.productDetails.node.priceRange.minVariantPrice.amount +
              ' ' +
              item.productDetails.node.priceRange.minVariantPrice.currencyCode}
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 18.25,
            flexWrap: 'wrap',
            // width: '100%'
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={styles.cartStyle}
              onPress={() => {
                if (qty == 1) return;
                setQty(qty - 1);
                quantityFunc(
                  item.productId,
                  qty,
                  2,
                  item.productDetails.node.priceRange.minVariantPrice.amount,
                );
              }}>
              <Icon
                iconFamily={'AntDesign'}
                name={'minus'}
                style={styles.MinusStyle}
              />
            </TouchableOpacity>
            <Text style={styles.NumStyle}>{qty}</Text>
            <TouchableOpacity
              style={styles.cartStyle}
              onPress={() => {
                setQty(qty + 1);
                quantityFunc(
                  item.productId,
                  qty,
                  1,
                  item.productDetails.node.priceRange.minVariantPrice.amount,
                );
              }}>
              <Icon
                iconFamily={'Ionicons'}
                name={'md-add'}
                color={Color.light}
                style={styles.AddStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                onOpenDeleteCart();
                setCartItemIndex(index);
                setCartItemAmount(productDetails.price);
                setCartItemQuantity(qty);
              }}>
              <DeleteSvg />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const CheckOut = ({navigation}) => {
  const [cartItemIndex, setCartItemIndex] = useState(0);
  const [cartItemAmount, setCartItemAmount] = useState(0);
  const [cartItemQuantity, setCartItemQuantity] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [removeCart, setRemoveCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const closeDeleteCart = () => {
    setRemoveCart(false);
  };
  const onOpenDeleteCart = () => {
    setRemoveCart(true);
  };
  const onOpenSuccessOrder = () => {
    setSuccessOrder(true);
  };

  const {cart, address, generalSettings} = useSelector(state => ({...state}));

  const removeItemFromCart = () => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: {
        index: cartItemIndex,
        amount: cartItemQuantity * cartItemAmount,
      },
    });
    setRefresh(!refresh);
    closeDeleteCart();
  };

  useEffect(() => {
    setCartData(cart.addedItems);
    setSubTotal(cart.total);
  }, [refresh]);

  console.log('ddddd', cart.total);
  const quantityFunc = (id, quantity, type, price, total, setQty) => {
    if (type === 2 && quantity === 1) {
      return;
    }

    const tempArr = [...cart.addedItems];
    // const tempAmount = cart.total;
    const filtered = tempArr.filter(x => {
      if (x.productId === id) {
        return (x.quantity = type === 1 ? quantity + 1 : quantity - 1);
      }
      return x;
    });

    // const getAmount = tempArr.filter(x => {
    //   if (x.productId === id) {
    //     return (x.quantity = type === 1 ? quantity + 1 : quantity - 1);
    //   }
    // });
    dispatch({
      type: 'UPDATE_ITEM',
      payload: {
        updatedItems: filtered,
        price: type === 1 ? (cart.total += +price) : cart.total - price,
      },
    });
  };

  const placeOrderReq = (setPaid = false) => {
    const filteredItems = cart.addedItems.map(item => {
      const {productId, quantity, productDetails, selectedVariation} = item;
      const filteredItem = {
        product_id: productId,
        quantity,
        productDetails,
      };

      if (selectedVariation) {
        filteredItem.variation_id = selectedVariation.id;
      }

      return filteredItem;
    });
    console.log('sssss', productDetails);

    const filteredGateways = generalSettings.gateways.find(
      gateway => gateway.id === paymentMethod,
    );
    console.log(filteredGateways);

    const formData = {
      payment_method: filteredGateways.id,
      payment_method_title: filteredGateways.title,
      set_paid: setPaid,
      ...{billing: address.billing},
      ...{shipping: address.shipping},
      line_items: filteredItems,
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Flat Rate',
          total: '8.00',
        },
      ],
      customer_id: address.id,
      customer_note: '',
    };

    placeOrder(formData, setLoading, setSuccessOrder, dispatch, navigation);

    console.log(formData);
  };

  const handlePlaceOrder = () => {
    // console.log('paymentMethod', paymentMethod);

    if (!address.shipping.address_1) {
      showMessage({
        type: 'danger',
        message: 'Please set shipping address before proceeding to checkout',
      });
      return;
    }

    if (paymentMethod == '') {
      showMessage({
        type: 'danger',
        message: 'Please select payment method',
      });
      return;
    }
    if (paymentMethod == 'stripe') {
      setLoading(true);
      openPaymentSheet();
      return;
    }
    // setLoading(true);
    placeOrderReq(false);

    // alert('click');
  };

  // useEffect(() => {
  //   initializePaymentSheet();
  // }, []);

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer, publishableKey} =
      await fetchPaymentSheetParams({
        order_amount: cart.total + 8,
        user_id: address.id,
      });
    // console.log(await fetchPaymentSheetParams({ order_amount: cart.total, user_id: address.id }))

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    // console.log(error);
    if (!error) {
      // setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const {error} = await presentPaymentSheet();

    if (error) {
      showMessage({
        message: error.message,
        type: 'danger',
      });
      // Alert.alert(`Error code: ${error.code}`, error.message);
      setLoading(false);
    } else {
      placeOrderReq(true);
      // Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  if (cartData.length <= 0) {
    return (
      <>
        <AppBar
          theme="dark"
          title="Checkout"
          customStyle={{paddingHorizontal: Window.fixPadding * 2}}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <NoResult />
          <View>
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
            <Button
              text="Explore products"
              isIcon={false}
              theme="tertiary"
              navLink="ProductListing"
            />
          </View>
        </View>
      </>
    );
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor={Color.light}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
        translucent
      />
      <ScrollView style={{...GlobalStyle.Container, paddingBottom: 10}}>
        <AppBar theme="dark" title="Checkout" />

        <View
          style={{
            ...GlobalStyle.borderStyle,
            marginBottom: Window.fixPadding * 1.5,
          }}
        />

        <Heading name="Order Items" />
        {cartData.map((item, index) => (
          <>
            <ProductList
              item={item}
              quantityFunc={quantityFunc}
              index={index}
              onOpenDeleteCart={onOpenDeleteCart}
              setCartItemIndex={setCartItemIndex}
              setCartItemAmount={setCartItemAmount}
              setCartItemQuantity={setCartItemQuantity}
            />
            {index + 1 === cartData.length ? null : <View />}
          </>
        ))}
        <View
          style={{
            ...GlobalStyle.borderStyle,
            marginVertical: Window.fixPadding * 2,
          }}
        />
        <Heading name="Payment Method" />
        <View>
          {/* <RadioButton.Group
            onValueChange={newValue => setPaymentMethod(newValue)}
            value={paymentMethod}>
            {generalSettings.gateways.map((item, i) => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value={item.id} />
                <Text style={GlobalStyle.textStlye}>{item.title}</Text>
              </View>
            ))}
          </RadioButton.Group> */}
          {/* <RadioButton
            value="first"
            status={paymentMethod === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setPaymentMethod('first')}
          /> */}
        </View>

        <View
          style={{
            ...GlobalStyle.borderStyle,
            marginVertical: Window.fixPadding,
          }}
        />
        <View style={{marginTop: Window.fixPadding}}>
          <Heading name="Order Summery" />
          <OrderSummary quantity={1} subTotal={cart.total} item={cart} />
        </View>
      </ScrollView>
      <View style={{padding: Window.fixPadding}}>
        <Button
          loading={loading}
          text={`Place Order - $${(cart.total + 8).toFixed(2)}`}
          theme="tertiary"
          navLink="Payment"
          onPressFunc={handlePlaceOrder}
        />
      </View>

      {/* Delete cart Popup  */}

      <BottomPopupHOC
        title="Remove"
        visible={removeCart}
        setVisible={setRemoveCart}
        onTouchOutside={setRemoveCart}
        PopupBody={
          <RemoveProduct
            closeDeleteCart={closeDeleteCart}
            removeItemFromCart={removeItemFromCart}
          />
        }
      />

      {/* Success order Popup */}

      <BottomPopupHOC
        title="Order Placed"
        visible={successOrder}
        setVisible={setSuccessOrder}
        PopupBody={<SuccessOrder />}
      />
    </SafeAreaView>
  );
};

export default CheckOut;

const RemoveProduct = ({closeDeleteCart, removeItemFromCart}) => {
  return (
    <View style={{}}>
      <Text style={styles.text}>
        Are you sure you want to remove this product?
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 24,
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <Button
            text="Cancel"
            isIcon={false}
            theme="alternate"
            onPressFunc={() => closeDeleteCart()}
          />
        </View>
        <View style={{flex: 1}}>
          <Button
            text="Yes, Remove"
            isIcon={false}
            theme="tertiary"
            onPressFunc={removeItemFromCart}
          />
        </View>
      </View>
    </View>
  );
};

const SuccessOrder = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          backgroundColor: 'rgb(235,251,253)',
          height: 90,
          width: 90,
          borderRadius: 90 / 2,
          alignSelf: 'center',
          marginBottom: Window.fixPadding,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon
          iconFamily={'Feather'}
          name={'check-square'}
          size={45}
          color={Color.tertiary}
        />
      </View>

      <Text
        style={{
          ...GlobalStyle.textStlye,
          textAlign: 'center',
          marginBottom: Window.fixPadding * 2,
        }}>
        Thank you for choosing our products! {'\n'}Happy Shoping
      </Text>

      <Button
        text="Continue Shopping"
        theme="tertiary"
        navLink="BottomTabScreen"
      />
      <TouchableOpacity onPress={() => navigation.replace('MyOrder')}>
        <Text
          style={{
            ...GlobalStyle.textStlye,
            textAlign: 'center',
            marginTop: Window.fixPadding * 1.5,
          }}>
          Track Order
        </Text>
      </TouchableOpacity>
    </View>
  );
};
