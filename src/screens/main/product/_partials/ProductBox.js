import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import Icon from '../../../../core/Icon';
import {Color, Font, GlobalStyle, Window} from '../../../../globalStyle/Theme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ADD_MORE_ITEM,
  CREATE_CART_ADD_ONE_ITEM,
} from '../../../../graphql/mutations/Cart';
import {handleCreateCart} from '../../../../apis/cart';
import {useMutation} from '@apollo/client';
import {useState} from 'react';

const ProductBox = ({item, customStyle, wishlist}) => {
  const [showFavIcon, setShowFavIcon] = useState(false);
  const navigation = useNavigation();
  const [cartCreate, {data, loading, error}] = useMutation(
    CREATE_CART_ADD_ONE_ITEM,
  );
  const [cartLinesAdd] = useMutation(ADD_MORE_ITEM);

  useEffect(() => {
    getWishlistData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // ;
  };
  // console.log(existingWishlist);
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
        onPress={async () => {
          const existingWishlist = await AsyncStorage.getItem('WishList_Items');
          // AsyncStorage.removeItem('WishList_Items');
          if (existingWishlist !== null) {
            const ParseData = JSON.parse(existingWishlist);
            if (ParseData.addedItems.some(e => e.node.id === item.node.id)) {
              const filterData = ParseData.addedItems.filter(
                (x, i) => x.node.id !== item.node.id,
              );
              await AsyncStorage.setItem(
                'WishList_Items',
                JSON.stringify({addedItems: filterData}),
              );
              setShowFavIcon(false);
            } else {
              const AddItemsNew = {addedItems: [...ParseData.addedItems, item]};
              await AsyncStorage.setItem(
                'WishList_Items',
                JSON.stringify(AddItemsNew),
              );
              setShowFavIcon(true);
            }
          } else {
            const NewObject = {addedItems: [item]};
            await AsyncStorage.setItem(
              'WishList_Items',
              JSON.stringify(NewObject),
            );
            setShowFavIcon(true);
          }
        }}>
        <Icon
          iconFamily={'AntDesign'}
          style={{fontSize: 14}}
          color={showFavIcon ? '#F91212' : Color.secondary}
          name={showFavIcon ? 'heart' : 'hearto'}
        />
      </TouchableOpacity>
      {item.node.variants.edges[0].node.selectedOptions.length > 1 ? (
        <TouchableOpacity
          style={style.addToCartIconContainer}
          onPress={() =>
            navigation.navigate('ProductDetail', {
              product: item,
            })
          }>
          <Icon
            iconFamily={'AntDesign'}
            style={{fontSize: 18}}
            color={Color.white}
            name={'arrowright'}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={style.addToCartIconContainer}
          onPress={() => Add_To_Card(item.node.variants.edges[0].node)}>
          <Icon
            iconFamily={'AntDesign'}
            style={{fontSize: 18}}
            color={Color.white}
            name={'plus'}
          />
        </TouchableOpacity>
      )}

      {item.node ? (
        <Image
          style={style.proImg}
          source={{uri: item.node.featuredImage?.url}}
        />
      ) : (
        <Image
          style={style.proImg}
          source={require('../../../../assets/images/products/noimage.png')}
        />
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
