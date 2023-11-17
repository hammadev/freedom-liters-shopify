import React, {useState} from 'react';
import {View, Text, ScrollView, Platform, SafeAreaView, ImageBackground} from 'react-native';
import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import {ShareIcon} from '../../../assets/svgs/SocialIconsSvgs';
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
import AppStatusBar from '../../../components/AppStatusBar';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
const ProductDetail = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {product} = route.params;
  const [visible, setVisible] = useState(false);
  const [loadingSpinner, setloadingSpinner] = useState(false);
  const [cartCreate, {data, loading, error}] = useMutation(CREATE_CART_ADD_ONE_ITEM);
  const [cartLinesAdd] = useMutation(ADD_MORE_ITEM);
  const {auth, cart} = useSelector(state => ({
    ...state,
  }));
  const Add_To_Card = async () => {
    if (auth) {
      setloadingSpinner(true);
      const CART_ID = await AsyncStorage.getItem('CART_ID');
      let variables;
      let mutationFunc;
      let isCreateCart;
      if (CART_ID) {
        console.log('CART_ID', CART_ID);
        console.log('Add Item In Cart');
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
        console.log('Cart Is Creating....');
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
      handleCreateCart(mutationFunc, variables, navigation, isCreateCart, dispatch);
      setloadingSpinner(false);
    } else {
      showMessage({
        message: 'Please Login First',
        type: 'danger',
      });
      navigation.navigate('SignIn');
    }
    console.log('CAT REDUX', cart);
  };

  return (
    <SafeAreaView
      style={{backgroundColor: Color.white, flex: 1}}
      edges={{
        top: 'maximum',
        right: 'maximum',
        left: 'maximum',
        bottom: hasNotch && Platform.OS === 'ios' ? '' : 'maximum',
      }}>
      <AppStatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 0}}
        style={{backgroundColor: Color.white, flex: 1}}>
        <ImageBackground
          resizeMode="cover"
          source={{uri: product.node.featuredImage?.url}}
          style={{
            width: '100%',
            paddingVertical: Window.fixPadding * 2,
            height: Window.height / 2.8,
          }}>
          <View style={styles.overlay} />
          <AppBar
            theme="dark"
            header="solid"
            customStyle={{paddingHorizontal: Window.fixPadding * 2}}
            right={
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ShareIcon />
              </View>
            }
          />
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
              {product.node.priceRange.minVariantPrice.amount + ' ' + product.node.priceRange.minVariantPrice.currencyCode}
            </Text>
          </View>
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
