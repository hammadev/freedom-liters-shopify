import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Icon from '../../../../core/Icon';
import { Color, Font, GlobalStyle, Window } from '../../../../globalStyle/Theme';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Chip } from 'react-native-paper';

const ChipComponent = ({ type }) => (
  type === 'featured' ?
    <View style={{ ...style.heartIconContainer, top: 50 }}>
      <Icon
        iconFamily={'Fontisto'}
        name={'star'}
        size={15}
        color={Color.yellow}
      />
    </View>
    :
    type === 'onsale' ?
      <View style={{ width: 'auto', borderColor: Color.primary, position: 'absolute', zIndex: 2, borderRadius: 8, borderWidth: 1, paddingHorizontal: Window.fixPadding, backgroundColor: Color.white, left: 10, top: 10 }}>
        <Text style={{ ...GlobalStyle.textStlye, fontSize: 11 }}>
          On Sale
        </Text>
      </View>
      : null
);

const ProductBox = ({ item, customStyle, wishlist }) => {

  const navigation = useNavigation();

  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={{
        ...customStyle,
        ...style.container
      }}
      onPress={() =>
        navigation.navigate('ProductDetail', {
          product: item,
        })
      }>
      {
        item.featured &&
        <ChipComponent type='featured' />
      }
      {
        item.on_sale &&
        <ChipComponent type='onsale' />
      }
      <TouchableOpacity
        style={style.heartIconContainer}
        onPress={() => {
          if (wishlist.addedItems.some(e => e.id === item.id)) {
            dispatch({
              type: 'REMOVE_SINGLE_FROM_WISHLIST',
              payload: item.id,
            });
          } else {
            dispatch({
              type: 'ADD_SINGLE_TO_WISHLIST',
              payload: item,
            });
          }
        }}
      >
        <Icon
          iconFamily={'AntDesign'}
          style={{ fontSize: 18 }}
          color={
            wishlist.addedItems.some(e => e.id === item.id)
              ? '#F91212'
              : Color.secondary
          }
          name={
            wishlist.addedItems.some(e => e.id === item.id)
              ? 'heart'
              : 'hearto'
          }
        />
      </TouchableOpacity>
      <Image
        style={style.proImg}
        source={{ uri: item.node.featuredImage?.url }}
      />
      <Text
        numberOfLines={1}
        style={{
          marginTop: 7,
          color: Color.primary,
          fontFamily: Font.Gilroy_SemiBold,
          fontSize: 13,
        }}>
        {item.node.title}
      </Text>
      <Text
        style={{
          marginTop: 4,
          color: '#1B2336',
          fontFamily: Font.Gilroy_Medium,
          fontSize: 11,
        }}>
        FROM {item.node.priceRange.minVariantPrice.amount + ' ' + item.node.priceRange.minVariantPrice.currencyCode}
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
          }}>
          {/* {item.categories.map((item, i) => {
            if (i === 0) {
              return item.name;
            } else {
              return ' / ' + item.name;
            }
          })} */}
        </Text>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          {/* <View style={{ paddingRight: 5 }}>
            <Icon
              iconFamily={'Fontisto'}
              name={'star'}
              size={10}
              color={Color.tertiary}
            />
          </View> */}
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
    flex: 1,
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
    padding: Window.fixPadding * 1.5
  },
  proImg: {
    width: '100%',
    height: 140,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',

  },
  heartIconContainer: {
    position: 'absolute', right: 10, top: 12, zIndex: 2,
    backgroundColor: Color.white,
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
  }
})