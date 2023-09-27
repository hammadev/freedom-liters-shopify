import {
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { Font, Window, Color, GlobalStyle } from '../globalStyle/Theme';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import Icon from '../core/Icon';
import { useDispatch } from 'react-redux';

const Variations = ({ item, active, setActive }) => {
  return (
    <TouchableOpacity
      onPress={() => setActive(item.id)}
      style={{
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        justifyContent: 'center',
        backgroundColor: active.id === item ? Color.tertiary : '#FAF7F1',
        alignItems: 'center',
        width: 49,
        height: 48,
        marginLeft: 10,
      }}>
      <Text
        style={{
          fontFamily: Font.Gilroy_SemiBold,
          fontSize: 15,
          paddingHorizontal: 15,
          color: active.id === item ? Color.white : Color.secondary,
        }}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};
const ProductColors = ({ item, activeColor, setActiveColor }) => {
  return (
    <TouchableOpacity
      onPress={() => setActiveColor(item)}
      style={{
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        justifyContent: 'center',
        backgroundColor: activeColor === item ? Color.tertiary : '#FAF7F1',
        alignItems: 'center',
        width: 85,
        height: 49,
        marginLeft: 10,
      }}>
      <Text
        style={{
          fontFamily: Font.Gilroy_SemiBold,
          fontSize: 15,
          paddingHorizontal: 15,
          color: activeColor === item ? Color.white : Color.secondary,
        }}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};
const Cart = ({ item, quantity, setQuantity }) => {
  const decrementValue = name => {
    if (quantity === 1) {
      return;
    }
    setQuantity(prevVal => prevVal - 1);
  };
  const incrementValue = name => {
    if (quantity === 10) {
      return;
    }
    setQuantity(prevVal => prevVal + 1);
  };
  return (
    <View
      style={{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}>
      <Text
        style={{
          color: Color.primary,
          fontFamily: Font.Gilroy_SemiBold,
          fontSize: 15,
        }}>
        Quantity
      </Text>
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
        <Text style={styles.NumStyle}>{quantity}</Text>
        <TouchableOpacity
          style={styles.cartStyle}
          onPress={() => incrementValue('adult')}>
          <Icon
            iconFamily={'Ionicons'}
            name={'md-add'}
            color={Color.light}
            style={styles.AddStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const DeliveryDetails = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 24,
        paddingHorizontal: 20,
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: '#FAF7F1',
          width: 94,
          height: 94,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16,
        }}>
        <Image
          style={{ width: 48, height: 48 }}
          source={{ uri: item.productDetails.images[0]?.src }}
        />
      </View>
      <View style={{ paddingLeft: 24 }}>
        <Text
          style={{
            color: Color.primary,
            fontFamily: Font.Gilroy_SemiBold,
            fontSize: 17,
          }}>
          {item.productDetails.name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              marginTop: 11,
              color: Color.primary,
              fontFamily: Font.Gilroy_SemiBold,
              fontSize: 20,
              textAlign: 'center',
            }}>
            ${item.productDetails.price}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              textDecorationLine: 'line-through',
              paddingLeft: 5,
              fontSize: 13,
              fontFamily: Font.Gilroy_Medium,
              color: Color.secondary,
            }}>
            ${item?.productDetails.sale_price}
          </Text>
        </View>
      </View>
    </View>
  );
};

const EditPopup = ({
  onTouchOutside,
  openPopup,
  popupData,
  onShowDeliveryPopup,
  product,
}) => {
  const [active, setActive] = useState(1);
  const [activeColor, setActiveColor] = useState(1);
  const [priceAmount, setPriceAmount] = useState(product.productDetails.price);

  console.log('dddddss', product);
  // const product = productData;

  const navigation = useNavigation('');
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);

  useEffect(() => {
    setPriceAmount(product.productDetails.price);
  }, []);

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
      visible={openPopup}
      onRequestClose={onTouchOutside}
      style={{}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000AA',
          justifyContent: 'flex-end',
          // height: Window.height * 0.7,
        }}>
        {renderOutsideTouchable(onTouchOutside)}
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            borderTopRightRadius: 44,
            borderTopLeftRadius: 44,
            height: Window.height * 0.7,
          }}>
          <View style={{ flex: 1 }}>
            <View style={{}}>
              <DeliveryDetails item={product} />
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
              <Text
                style={{
                  color: Color.primary,
                  fontFamily: Font.Gilroy_SemiBold,
                  fontSize: 15,
                }}>
                {/* {product.attributes && product.attributes[1]?.name} */}
              </Text>
              {product.attributes && (
                <FlatList
                  style={{ marginTop: 20 }}
                  contentContainerStyle={{ paddingHorizontal: 0 }}
                  data={product.attributes[1]?.options}
                  renderItem={({ item }) => (
                    <ProductColors
                      item={item}
                      activeColor={activeColor}
                      setActiveColor={setActiveColor}
                    />
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                />
              )}
            </View>
            <View style={{ marginTop: 28, paddingHorizontal: 20 }}>
              <Text
                style={{
                  color: Color.primary,
                  fontFamily: Font.Gilroy_SemiBold,
                  fontSize: 15,
                }}>
                {product.attributes && product.attributes[0]?.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  alignItems: 'center',
                }}>
                {product.attributes &&
                  product.attributes[0]?.options.map((item, i) => (
                    <Variations
                      item={item}
                      key={i}
                      active={active}
                      setActive={setActive}
                    />
                  ))}
              </View>
            </View>
            <Cart
              quantity={quantity}
              setQuantity={setQuantity}
              setPriceAmount={setPriceAmount}
            />
            <View style={{ flex: 1, marginTop: 24, paddingHorizontal: 20 }}>
              <Button
                text={`Add to Basket - $${priceAmount * quantity} `}
                theme="tertiary"
                navLink="CheckOut"
                onPressFunc={async () => {
                  dispatch({
                    type: 'ADD_TO_CART',
                    payload: {
                      productId: product.id,
                      productDetails: product,
                      totalPrice: priceAmount * quantity,
                      quantity: quantity,
                    },
                  });
                  onTouchOutside();
                  navigation.navigate('CheckOut');
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditPopup;

const styles = StyleSheet.create({
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
