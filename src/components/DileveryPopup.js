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


const Attribute = ({ attribute, setSelectedOptions, selectedOptions }) => {

  const [active, setActive] = useState();
  const AttributeOption = ({ item, selectedOption, name }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (selectedOptions.some(x => x.name === name)) {
            const filtered = selectedOptions.filter((option) =>
              option.name !== name
            )
            filtered.push({
              name: name,
              option: item
            })
            setSelectedOptions(filtered)

          } else {
            setSelectedOptions(prev => [...prev, {
              name: name,
              option: item
            }])
            console.log('not find');
          }
          setActive(item);
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 12,
          justifyContent: 'center',
          backgroundColor: active === item ? Color.tertiary : '#FAF7F1',
          alignItems: 'center',
          width: 85,
          height: 49,
        }}>
        <Text
          style={{
            fontFamily: Font.Gilroy_SemiBold,
            fontSize: 15,
            paddingHorizontal: 15,
            color: active === item ? Color.white : Color.secondary,
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ marginTop: Window.fixPadding }}>
      <Text
        style={{
          color: Color.primary,
          fontFamily: Font.Gilroy_SemiBold,
          fontSize: 15,
          marginVertical: Window.fixPadding / 1.5
        }}>
        {attribute.name}
      </Text>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 0 }}
        data={attribute.options}
        renderItem={({ item }) => (
          <AttributeOption
            item={item}
            name={attribute.name}
          // selectedOption={selectedOption}
          // setSelectedOption={setSelectedOption}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
      />
    </View>
  );
}

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
  const [priceAmount, setPriceAmount] = useState(product.price);
  const [quantity, setQuantity] = useState(1);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    setPriceAmount(product.price);
    setQuantity(1);
  }, [product.price])

  useEffect(() => {
    // console.log("rerender", selectedOptions);
    // const filterAttributes = [{ "name": "Color", "option": "Blue" }, { "name": "Size", "option": "L" }];

    if (product.type !== 'simple' && product.variations) {

      const filteredVariations = product.variations.filter(variation => {
        return selectedOptions.every(filterAttr => {
          const attribute = variation.attributes.find(attr => attr.name === filterAttr.name);
          return attribute && attribute.option === filterAttr.option;
        });
      });

      if (filteredVariations[0]?.attributes.length !== selectedOptions.length) {
        console.log("Error: The number of filtered variations does not match the number of filter attributes.");
      } else {
        filteredVariations[0] ? setSelectedVariation(filteredVariations[0]) : selectedVariation(null);
        setPriceAmount(filteredVariations[0].sale_price);
        // console.log('filteredVariations',filteredVariations[0]);
      }

    }

  }, [selectedOptions])

  const handleAddToCart = async () => {
    // if (product.type === 'variable') {
    //   if (selectedVariation == null) {
    //     showMessage('Alert', 'Please select variation');
    //     return;
    //   }
    // }

    console.log({
      productId: product.id,
      // productDetails: product,
      totalPrice: priceAmount * quantity,
      quantity: quantity,
      ...selectedVariation && { selectedVariation: selectedVariation }
    })

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productId: product.id,
        productDetails: product,
        totalPrice: priceAmount * quantity,
        quantity: quantity,
        ...selectedVariation && { selectedVariation: selectedVariation }
      },
    });
    onTouchOutside();
    navigation.navigate('CheckOut');

  }

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
            // height: Window.height * 0.5,
            paddingHorizontal: Window.fixPadding * 2,
            elevation: 10,
            paddingVertical: Window.fixPadding * 2
            // flex: 1
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
                source={{ uri: selectedVariation ? selectedVariation.image : product.images[0].src }}
              />
            </View>
            <View style={{ paddingLeft: 24 }}>
              <Text
                style={{
                  color: Color.primary,
                  fontFamily: Font.Gilroy_SemiBold,
                  fontSize: 17,
                }}>
                {product.name}
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
                  ${selectedVariation ? selectedVariation.sale_price : product.price}
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
                  ${selectedVariation ? selectedVariation.regular_price : product.regular_price}
                </Text>
              </View>
            </View>
          </View>

          {
            product.type !== 'simple' &&
            product.attributes.map((attribute, i) => (
              <Attribute attribute={attribute} setSelectedOptions={setSelectedOptions} selectedOptions={selectedOptions} key={i} />
            ))
          }

          <QtyRow
            quantity={quantity}
            setQuantity={setQuantity}
            setPriceAmount={setPriceAmount}
          />
          <View style={{ marginTop: Window.fixPadding * 4, }}>
            <Button
              text={`Add to Basket - $${priceAmount * quantity}`}
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
