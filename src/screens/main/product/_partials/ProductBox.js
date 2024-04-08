import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import Icon from '../../../../core/Icon';
import { Color, Font, GlobalStyle, Window } from '../../../../globalStyle/Theme';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ADD_MORE_ITEM,
  CREATE_CART_ADD_ONE_ITEM,
} from '../../../../graphql/mutations/Cart';
import { handleCreateCart } from '../../../../apis/cart';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { COLORS, FONTS, RADIUS, WIDTH } from '../../../../constants';
import { TouchableRipple } from 'react-native-paper';

const ProductBox = ({ item, relatedProducts = false, GET_WISHLIST_DATA }) => {
  const [showFavIcon, setShowFavIcon] = useState(false);
  const navigation = useNavigation();
  const [cartCreate] = useMutation(CREATE_CART_ADD_ONE_ITEM);
  const [cartLinesAdd] = useMutation(ADD_MORE_ITEM);
  let isVariation = item.node.variants.edges[0].node.selectedOptions.length;
  useEffect(() => {
    getWishlistData();
  }, []);
  const getWishlistData = async () => {
    AsyncStorage.getItem('WishList_Items').then(res => {
      if (res !== null) {
        const ParseData = JSON.parse(res);

        const checkInWishlist = ParseData.addedItems.some(
          e => e.node.id === item.node.id,
        );
        setShowFavIcon(checkInWishlist);
      }
    });
  };
  const Add_To_Card = async item => {
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
    handleCreateCart(mutationFunc, variables, navigation, isCreateCart);
  };
  const wishlistHandler = async () => {
    const existingWishlist = await AsyncStorage.getItem('WishList_Items');
    if (existingWishlist !== null) {
      const ParseData = JSON.parse(existingWishlist);
      if (ParseData.addedItems.some(e => e.node.id === item.node.id)) {
        const filterData = ParseData.addedItems.filter(
          (x, i) => x.node.id !== item.node.id,
        );
        await AsyncStorage.setItem(
          'WishList_Items',
          JSON.stringify({ addedItems: filterData }),
        );
        setShowFavIcon(false);
        if (GET_WISHLIST_DATA) {
          GET_WISHLIST_DATA();
        }
      } else {
        const AddItemsNew = {
          addedItems: [...ParseData.addedItems, item],
        };
        await AsyncStorage.setItem(
          'WishList_Items',
          JSON.stringify(AddItemsNew),
        );
        setShowFavIcon(true);
        if (GET_WISHLIST_DATA) {
          GET_WISHLIST_DATA();
        }
      }
    } else {
      const NewObject = { addedItems: [item] };
      await AsyncStorage.setItem('WishList_Items', JSON.stringify(NewObject));
      setShowFavIcon(true);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableRipple
        style={styles.ripple}
        onPress={() =>
          navigation.navigate('ProductDetail', {
            product: item,
            relatedProducts,
          })
        }>
        <>
          <ImageBackground
            imageStyle={{ borderRadius: RADIUS, overflow: 'hidden' }}
            source={
              item.node
                ? { uri: item.node.featuredImage?.url }
                : require('../../../../assets/images/products/noimage.png')
            }
            style={{
              height: WIDTH / 2.75,
              borderRadius: RADIUS,
              overflow: 'hidden',
            }}>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={wishlistHandler}>
                <Icon
                  iconFamily={'AntDesign'}
                  style={{ fontSize: 16 }}
                  color={showFavIcon ? '#F91212' : Color.secondary}
                  name={showFavIcon ? 'heart' : 'hearto'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.iconContainer,
                  { backgroundColor: COLORS.green },
                ]}
                onPress={
                  isVariation > 1
                    ? () =>
                      navigation.navigate('ProductDetail', {
                        product: item,
                      })
                    : () => Add_To_Card(item.node.variants.edges[0].node)
                }>
                <Icon
                  iconFamily={'AntDesign'}
                  style={{ fontSize: 16 }}
                  color={COLORS.white}
                  name={isVariation > 1 ? 'arrowright' : 'plus'}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <Text numberOfLines={1} style={styles.productTitle}>
            {item.node.title}
          </Text>
          <View style={styles.row}>
            <Text style={styles.subTitle}>
              ${item.node.priceRange.minVariantPrice.amount}
            </Text>
            <Text style={styles.subTitle}>
              ({item.node.totalInventory} in stock)
            </Text>
          </View>
        </>
      </TouchableRipple>
    </View>
  );
};

export default ProductBox;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    width: WIDTH / 2.5,
    height: WIDTH / 2,
    borderRadius: RADIUS,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productTitle: {
    marginTop: 10,
    color: COLORS.tertiary,
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    marginLeft: 5,
  },
  subTitle: {
    marginTop: 5,
    color: COLORS.secondary,
    fontFamily: FONTS.medium,
    fontSize: 14,
    marginHorizontal: 5,
  },
  ripple: { width: '100%', height: '100%' },
  btnContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 5,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ////////////////////////////////////////////////////////////////
  proImg: {
    width: '100%',
    height: 140,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
