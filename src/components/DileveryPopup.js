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
import { showMessage } from 'react-native-flash-message';
import { TouchableRipple } from 'react-native-paper';

const Attribute = ({
  attribute,
  setSelectedOptions,
  selectedOptions,
}) => {
  // const AttributeOption = ({item, selectedOption, name}) => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         if (selectedOptions.some(x => x.name === name)) {
  //           const filtered = selectedOptions.filter(
  //             option => option.name !== name,
  //           );
  //           filtered.push({
  //             name: name,
  //             option: item,
  //           });
  //           setSelectedOptions(filtered);
  //         } else {
  //           setSelectedOptions(prev => [
  //             ...prev,
  //             {
  //               name: name,
  //               option: item,
  //             },
  //           ]);
  //           // console.log('not find');
  //         }
  //         setActive(item);
  //       }}
  //       style={{
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //         borderRadius: 12,
  //         justifyContent: 'center',
  //         backgroundColor: active === item ? Color.tertiary : '#FAF7F1',
  //         alignItems: 'center',
  //         width: 85,
  //         height: 49,
  //       }}>
  //       <Text
  //         style={{
  //           fontFamily: Font.Gilroy_SemiBold,
  //           fontSize: 15,
  //           paddingHorizontal: 15,
  //           color: active === item ? Color.white : Color.secondary,
  //         }}>
  //         {item.node.title}sdfs
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // };
  // const productId = attribute.node.id;
  // console.log('0000', productId);
  return (
    <View style={{ marginTop: Window.fixPadding }}>
      <TouchableRipple
        onPress={() => {
          setSelectedOptions(attribute);
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 12,
          backgroundColor: Color.light,
          borderColor: selectedOptions.node.id === attribute.node.id ? Color.tertiary : Color.light,
          borderWidth: 2
        }}>
        <>
          <View
            style={{
              flexDirection: 'row',
              // alignItems: 'center',
            }}>
            <Image
              style={{ width: 48, height: 48 }}
              source={{ uri: attribute.node.image?.url }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  color: Color.primary,
                  fontFamily: Font.Gilroy_Regular,
                  fontSize: 14,
                }}>
                {attribute.node.title}
              </Text>
              <Text
                style={{
                  color: Color.primary,
                  fontFamily: Font.Gilroy_Regular,
                  fontSize: 14,
                  marginVertical: Window.fixPadding / 1.5,
                }}>
                Quantity Available: {attribute.node.quantityAvailable}
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: Color.primary,
              fontFamily: Font.Gilroy_Regular,
              fontSize: 15,
            }}>
            {attribute.node.price.amount +
              ' ' +
              attribute.node.price.currencyCode}
          </Text>
        </>
      </TouchableRipple>
    </View>
  );
};

const QtyRow = ({ quantity, setQuantity }) => {
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

const DileveryPopup = ({ onTouchOutside, openPopup, product }) => {
  // console.log('product.variations', product.variations);


    useEffect(() => {
    console.log('vvvvv', input);
  }, []);

  const [quantity, setQuantity] = useState(1);

  const [selectedVariation, setSelectedVariation] = useState(product.node.variants.edges[0]);

  // console.log(product.node.variants.edges[0].node.id);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToCart = async () => {
    if (product.type === 'variable') {
      if (selectedVariation == null) {
        showMessage('Alert', 'Please select variation');
        return;
      }
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productId: product.node.id,
        productDetails: product,
        totalPrice: selectedVariation.node.price.amount * quantity,
        quantity: quantity,
        ...(selectedVariation && { selectedVariation: selectedVariation }),
      },
    });

    onTouchOutside();

    navigation.navigate('CheckOut');
  };

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

  // console.log(product.node.variants.edges);
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
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {renderOutsideTouchable(onTouchOutside)}
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            borderTopRightRadius: 44,
            borderTopLeftRadius: 44,
            paddingHorizontal: Window.fixPadding * 2,
            elevation: 10,
            paddingVertical: Window.fixPadding * 2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: Window.fixPadding * 1.5,
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
                source={{
                  uri: selectedVariation
                    ? selectedVariation.node.image.url
                    : product.node.featuredImage?.url,
                }}
              />
            </View>
            <View style={{ paddingLeft: 24 }}>
              <Text
                style={{
                  color: Color.primary,
                  fontFamily: Font.Gilroy_SemiBold,
                  fontSize: 17,
                }}>
                {product.node.title}
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
                  {selectedVariation
                    &&
                    selectedVariation.node.price.amount + ' ' + selectedVariation.node.price.currencyCode
                  }
                </Text>

              </View>
            </View>
          </View>

          {product.node.variants.edges.map((attribute, i) => (
            <Attribute
              attribute={attribute}
              setSelectedOptions={setSelectedVariation}
              selectedOptions={selectedVariation}
              key={i}
            />
          ))}

          <QtyRow
            quantity={quantity}
            setQuantity={setQuantity}
          // setPriceAmount={setPriceAmount}
          />
          <View style={{ marginTop: Window.fixPadding * 4 }}>
            <Button
              text={`Add to Basket - ${(selectedVariation.node.price.amount * quantity).toFixed(2)} ${selectedVariation.node.price.currencyCode}`}
              theme="tertiary"
              navLink="CheckOut"
              onPressFunc={handleAddToCart}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DileveryPopup;

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
