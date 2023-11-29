import React, {useState} from 'react';
import {View, Text, ScrollView, Platform, SafeAreaView} from 'react-native';
import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import PopularProducts from './_partials/PopularProducts';
import Heading from '../../../components/Heading';
import RenderHtml from 'react-native-render-html';
import BottomPopupHOC from '../../../components/BottomPopupHOC';
import VariationsDetails from '../../../components/VariationsDetails';
import {hasNotch} from 'react-native-device-info';
import {StyleSheet} from 'react-native';
import {useMutation} from '@apollo/client';
import {ADD_MORE_ITEM, CREATE_CART_ADD_ONE_ITEM} from '../../../graphql/mutations/Cart';
import {handleCreateCart} from '../../../apis/cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ImageBackground} from 'react-native';
const ProductDetail = ({route, navigation}) => {
  const {product} = route.params;
  const [visible, setVisible] = useState(false);
  const [ProductImages, setProductImages] = useState(null);
  const [loadingSpinner, setloadingSpinner] = useState(false);
  const [cartCreate, {data, loading, error}] = useMutation(CREATE_CART_ADD_ONE_ITEM);
  const [selectedColor, setselectedColor] = useState(null);
  const [selectedSize, setselectedSize] = useState(null);
  const [NewPrice, setNewPrice] = useState(null);
  const [NewArr, setNewArr] = useState([]);

  const [allSizes, setAllSizes] = useState([]);
  const [allColors, setAllColors] = useState([]);

  const [cartLinesAdd] = useMutation(ADD_MORE_ITEM);
  const {auth} = useSelector(state => ({
    ...state,
  }));

  console.log('product.node.variants.edges', NewArr);
  useEffect(() => {
    setProductImages(product.node.featuredImage.url);

    if (selectedColor && selectedSize) {
      const filtered = product.node.variants.edges.filter(
        item => item.node.selectedOptions[0].value === selectedSize && item.node.selectedOptions[1].value === selectedColor
      );
      setNewArr(filtered[0].node);
      setProductImages(filtered[0].node.image.url);
      setNewPrice(filtered[0].node.price.amount);
    }
  }, [product, selectedColor, selectedSize, NewPrice]);

  const Add_To_Card = async () => {
    if (product.node.variants.edges.length > 1) {
      if (selectedColor && selectedSize) {
        console.log('True');
        setloadingSpinner(true);
        const CART_ID = await AsyncStorage.getItem('CART_ID');
        let variables;
        let mutationFunc;
        let isCreateCart;
        if (CART_ID) {
          variables = {
            cartId: CART_ID,
            lines: {
              merchandiseId: NewArr.id,
              quantity: 1,
            },
          };
          mutationFunc = cartLinesAdd;
          isCreateCart = 0;
        } else {
          variables = {
            cartInput: {
              lines: {
                merchandiseId: NewArr.id,
                quantity: 1,
              },
            },
          };
          mutationFunc = cartCreate;
          isCreateCart = 1;
        }
        handleCreateCart(mutationFunc, variables, navigation, isCreateCart, 1);
        setloadingSpinner(false);
      } else {
        showMessage({
          message: 'Please Select Color & Size First',
          type: 'danger',
        });
      }
    } else {
      console.log('True');
      setloadingSpinner(true);
      const CART_ID = await AsyncStorage.getItem('CART_ID');
      let variables;
      let mutationFunc;
      let isCreateCart;
      if (CART_ID) {
        variables = {
          cartId: CART_ID,
          lines: {
            merchandiseId: product.node.variants.edges[0].node.id,
            quantity: 1,
          },
        };
        mutationFunc = cartLinesAdd;
        isCreateCart = 0;
      } else {
        variables = {
          cartInput: {
            lines: {
              merchandiseId: product.node.variants.edges[0].node.id,
              quantity: 1,
            },
          },
        };
        mutationFunc = cartCreate;
        isCreateCart = 1;
      }
      handleCreateCart(mutationFunc, variables, navigation, isCreateCart, 1);
      setloadingSpinner(false);
    }
    // if (auth) {
    //   console.log('Auth hy');
    // } else {
    //   showMessage({
    //     message: 'Please Login First',
    //     type: 'danger',
    //   });
    //   navigation.navigate('SignIn');
    // }
  };

  const getUniqueVariant = index => {
    const productEdge = product.node.variants.edges;
    const tempProductData = [];
    const uniqueVariant = [];

    // Extract titles from productEdge
    for (let a = 0; a < productEdge.length; a++) {
      tempProductData.push(productEdge[a].node.selectedOptions[index].value);
    }

    // Filter out unique titles
    for (let b = 0; b < tempProductData.length; b++) {
      if (!uniqueVariant.includes(tempProductData[b])) {
        uniqueVariant.push(tempProductData[b]);
      }
    }

    return uniqueVariant;
  };

  const checkAllVarientValues = (index, returnIndex, selectedOption) => {
    const productEdge = product.node.variants.edges;
    const tempProductData = [];
    const tempProductReturnData = [];
    const uniqueVariant = [];

    if (productEdge.length && index !== null) {
      for (let a = 0; a < productEdge.length; a++) {
        if (productEdge[a].node.selectedOptions[index]) {
          tempProductData.push(productEdge[a].node.selectedOptions[index].value);
        }
      }

      for (let a = 0; a < productEdge.length; a++) {
        if (productEdge[a].node.selectedOptions[index]) {
          tempProductReturnData.push(productEdge[a].node.selectedOptions[returnIndex].value);
        }
      }

      for (let b = 0; b < tempProductData.length; b++) {
        if (tempProductData[b].toLowerCase() === selectedOption.toLowerCase()) {
          uniqueVariant.push(tempProductReturnData[b]);
        }
      }
    }

    return uniqueVariant;
  };

  useEffect(() => {
    if (allColors.length > 0) {
      setAllColors(checkAllVarientValues(0, 1, selectedSize));
    }
  }, [selectedSize]);

  useEffect(() => {
    if (allSizes.length > 0) {
      setAllSizes(checkAllVarientValues(1, 0, selectedColor));
    }
  }, [selectedColor]);

  const HandleSize = index => {
    // console.log(index);
    setselectedSize(index);
  };

  const HandleColor = index => {
    // console.log(index);
    setselectedColor(index);
  };

  useEffect(() => {
    setAllSizes(getUniqueVariant(0));
    setAllColors(getUniqueVariant(1));
  }, []);

  return (
    <SafeAreaView
      style={{backgroundColor: Color.white, flex: 1}}
      edges={{
        top: 'maximum',
        right: 'maximum',
        left: 'maximum',
        bottom: hasNotch && Platform.OS === 'ios' ? '' : 'maximum',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        style={{backgroundColor: Color.white, flex: 1}}>
        <ImageBackground
          resizeMode="cover"
          source={{uri: ProductImages}}
          style={{
            width: '100%',
            paddingVertical: Window.fixPadding * 2,
            height: Window.height / 3,
          }}>
          <View style={styles.overlay} />
          <AppBar theme="dark" header="solid" customStyle={{paddingHorizontal: 100}} />
        </ImageBackground>

        <View style={{backgroundColor: Color.white, paddingTop: 20}}>
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <Heading name={product.node.title} />
            <Text
              style={{
                fontSize: 20,
                fontFamily: Font.Gilroy_Bold,
                color: Color.primary,
              }}>
              {NewPrice ? NewPrice : product.node.priceRange.minVariantPrice.amount}
              {product.node.priceRange.minVariantPrice.currencyCode}
            </Text>
          </View>
          {product.node.variants.edges[0].node.selectedOptions.length > 1 && (
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 8,
              }}>
              <Heading name="Size" />
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {allSizes.map(item => (
                  <TouchableOpacity
                    onPress={() => HandleSize(item)}
                    style={{
                      backgroundColor: selectedSize === item ? 'red' : 'rgba(2, 28, 94, 0.9)',
                      width: 100,
                      padding: 5,
                      borderRadius: 15,
                      marginRight: 8,
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: Font.Gilroy_Regular,
                        color: Color.white,
                        textAlign: 'center',
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
          {product.node.variants.edges[0].node.selectedOptions.length > 1 && (
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 8,
              }}>
              <Heading name="Colors" />
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {allColors.map(item => (
                  <TouchableOpacity
                    onPress={() => HandleColor(item)}
                    style={{
                      backgroundColor: item.toLowerCase(),
                      width: 35,
                      height: 35,
                      padding: 5,
                      borderRadius: 10,
                      marginRight: 8,
                      marginTop: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {selectedColor == item ? <View style={{width: 10, height: 10, backgroundColor: 'red', borderRadius: 10}}></View> : null}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {product.latest && (
            <View
              style={{
                paddingHorizontal: Window.fixPadding * 2,
                marginTop: Window.fixPadding,
              }}>
              <Text style={{...GlobalStyle.textStlye}}>
                Category:{' '}
                {product?.latest.map((item, i) => {
                  if (i === 0) {
                    return item.name;
                  } else {
                    return ' / ' + item.name;
                  }
                })}
              </Text>
            </View>
          )}
          <View style={GlobalStyle.borderStyle} />
          <Heading
            containerStyle={{
              paddingHorizontal: Window.fixPadding * 2,
            }}
            name="Description"
          />

          <View style={{marginTop: 0, paddingHorizontal: 20}}>
            <RenderHtml
              tagsStyles={{
                p: {
                  color: 'black',
                  fontSize: 14,
                  letterSpacing: -0.3,
                },
                iframe: {
                  display: 'none',
                },
              }}
              contentWidth={Window.width}
              source={{html: product.node.descriptionHtml}}
            />
          </View>

          <View style={GlobalStyle.borderStyle} />

          <Heading
            name="Latest"
            containerStyle={{
              paddingHorizontal: Window.fixPadding * 2,
              marginTop: Window.fixPadding * 2,
            }}
          />
          <PopularProducts />

          {/* Select Vatiations Popup */}
          <BottomPopupHOC
            title="Select Varaition"
            visible={visible}
            setVisible={setVisible}
            product={product}
            PopupBody={<VariationsDetails product={product} />}
          />
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: Color.light,
          paddingVertical: 10,
          elevation: 10,
          marginTop: Window.fixPadding * 1.6,
        }}>
        <Button onPressFunc={Add_To_Card} theme="tertiary" loading={loadingSpinner} text="Add to Cart" />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
