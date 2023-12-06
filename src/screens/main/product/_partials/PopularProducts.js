import {View} from 'react-native';
import React from 'react';
import ProductBox from './ProductBox';
import {useSelector} from 'react-redux';
import {CONTAINER_PADDING} from '../../../../constants';
import {FlatList} from 'react-native-gesture-handler';

const PopularProducts = () => {
  const {product} = useSelector(state => ({...state}));

  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal: CONTAINER_PADDING,
        marginVertical: 15,
      }}
      data={product.latest.edges}
      renderItem={({item, index}) => (
        <ProductBox relatedProducts={true} item={item} index={index} />
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{width: 10}}></View>}
    />
  );
};

export default PopularProducts;
