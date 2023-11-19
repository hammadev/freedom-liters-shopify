import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from '../../../../core/Icon';
import {Color, Font, GlobalStyle, Window} from '../../../../globalStyle/Theme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ADD_MORE_ITEM, CREATE_CART_ADD_ONE_ITEM} from '../../../../graphql/mutations/Cart';
import {handleCreateCart} from '../../../../apis/cart';
import {useState} from 'react';
import {useMutation} from '@apollo/client';

const ChipComponent = ({type}) =>
  type === 'featured' ? (
    <View style={{...style.heartIconContainer, top: 50}}>
      <Icon iconFamily={'Fontisto'} name={'star'} size={15} color={Color.yellow} />
    </View>
  ) : type === 'onsale' ? (
    <View
      style={{
        width: 'auto',
        borderColor: Color.primary,
        position: 'absolute',
        zIndex: 2,
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: Window.fixPadding,
        backgroundColor: Color.white,
        left: 10,
        top: 10,
      }}>
      <Text style={{...GlobalStyle.textStlye, fontSize: 11}}>On Sale</Text>
    </View>
  ) : null;

const ProductBox = ({item, customStyle, wishlist}) => {
  const [loadingSpinner, setloadingSpinner] = useState(false);
  const [cartCreate, {data, loading, error}] = useMutation(CREATE_CART_ADD_ONE_ITEM);
  const [cartLinesAdd] = useMutation(ADD_MORE_ITEM);
  const {auth} = useSelector(state => ({
    ...state,
  }));

  const Add_To_Card = async item => {
    console.log(item.id);
    if (auth) {
      setloadingSpinner(true);
      const CART_ID = await AsyncStorage.getItem('CART_ID');
      let variables;
      let mutationFunc;
      let isCreateCart;
      if (CART_ID) {
        variables = {
          cartId: CART_ID,
          lines: {
            merchandiseId: item.id,
            quantity: 1,
          },
        };
        mutationFunc = cartLinesAdd;
        isCreateCart = 0;
      } else {
        variables = {
          cartInput: {
            lines: {
              merchandiseId: item.id,
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
  };
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={{
        ...customStyle,
        ...style.container,
        marginRight: 5,
      }}
      onPress={() =>
        navigation.navigate('ProductDetail', {
          product: item,
        })
      }>
      <TouchableOpacity
        style={style.heartIconContainer}
        onPress={() => {
          if (wishlist.addedItems.some(e => e.node.id === item.node.id)) {
            dispatch({
              type: 'REMOVE_SINGLE_FROM_WISHLIST',
              payload: item.node.id,
            });
          } else {
            dispatch({
              type: 'ADD_SINGLE_TO_WISHLIST',
              payload: item,
            });
          }
        }}>
        <Icon
          iconFamily={'AntDesign'}
          style={{fontSize: 14}}
          color={wishlist.addedItems.some(e => e.node.id === item.node.id) ? '#F91212' : Color.secondary}
          name={wishlist.addedItems.some(e => e.node.id === item.node.id) ? 'heart' : 'hearto'}
        />
      </TouchableOpacity>
      <TouchableOpacity style={style.addToCartIconContainer} onPress={() => Add_To_Card(item.node.variants.edges[0].node)}>
        <Icon iconFamily={'AntDesign'} style={{fontSize: 18}} color={Color.white} name={'plus'} />
      </TouchableOpacity>
      {item.node ? (
        <Image style={style.proImg} source={{uri: item.node.featuredImage?.url}} />
      ) : (
        <Image style={style.proImg} source={require('../../../../assets/images/products/noimage.png')} />
      )}
      <Text
        numberOfLines={1}
        style={{
          marginTop: 7,
          color: Color.primary,
          fontFamily: Font.Gilroy_SemiBold,
          fontSize: 15,
        }}>
        {item.node.title}
      </Text>
      <Text
        style={{
          marginTop: 4,
          color: '#1B2336',
          fontFamily: Font.Gilroy_Medium,
          fontSize: 15,
        }}>
        $ {item.node.priceRange.minVariantPrice.amount}
      </Text>
      <View
        style={{
          marginTop: 6,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: '#363B44',
            fontFamily: Font.Gilroy_Medium,
            fontSize: 11,
          }}></Text>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <Text
            style={{
              color: 'rgba(8, 14, 30, 0.6)',
              fontFamily: Font.Gilroy_Medium,
              fontSize: 13,
            }}>
            ({item.node.totalInventory} in stock)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductBox;

const style = StyleSheet.create({
  container: {
    marginVertical: Window.fixPadding / 1.5,
    backgroundColor: Color.white,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 16,
    position: 'relative',
    padding: Window.fixPadding * 1.5,
  },
  proImg: {
    width: '100%',
    height: 140,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIconContainer: {
    position: 'absolute',
    right: 22,
    top: 20,
    backgroundColor: Color.white,
    zIndex: 2,
    width: 25,
    height: 25,
    borderRadius: 32 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 22,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addToCartIconContainer: {
    position: 'absolute',
    right: 20,
    top: '53%',
    zIndex: 2,
    backgroundColor: Color.tertiary,
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 22,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
