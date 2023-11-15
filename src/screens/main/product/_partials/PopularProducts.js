import {StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import {Window} from '../../../../globalStyle/Theme';
import ProductBox from './ProductBox';
import {useSelector} from 'react-redux';

const PopularProducts = () => {
  const {product, wishlist} = useSelector(state => ({...state}));

  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal: Window.fixPadding * 2,
        marginBottom: Window.fixPadding,
      }}
      data={product.latest.edges}
      renderItem={({item, index}) => <ProductBox wishlist={wishlist} customStyle={{width: Window.width / 2.3}} item={item} index={index} />}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{width: Window.fixPadding * 1.5}}></View>}
    />
  );
};

export default PopularProducts;
