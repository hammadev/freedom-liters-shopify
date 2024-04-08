import { View } from 'react-native';
import React from 'react';
import ProductBox from './ProductBox';
import { useSelector } from 'react-redux';
import { CONTAINER_PADDING } from '../../../../constants';
import { FlatList } from 'react-native-gesture-handler';

const PopularProducts = () => {
  const { product } = useSelector(state => ({ ...state }));

  const data = [
    {
      id: 1,
      title: 'T shirts',
      image: require('../../../../assets/images/images/sample_tshirt.png'),
      description: '4.2 oz./yd², 52/48 airlume combed and ring-spun cotton/polyester, 32 singles, Athletic Heather and Black Heather are 90/10 airlume combed and ring-spun cotton/polyester. Retail fit, unisex sizing, shoulder taping, Tear-away label.'
    },
    {
      id: 2,
      title: 'T shirts',
      image: require('../../../../assets/images/images/sample_tshirt.png'),
      description: '4.2 oz./yd², 52/48 airlume combed and ring-spun cotton/polyester, 32 singles, Athletic Heather and Black Heather are 90/10 airlume combed and ring-spun cotton/polyester. Retail fit, unisex sizing, shoulder taping, Tear-away label.'
    },
    {
      id: 3,
      title: 'T shirts',
      image: require('../../../../assets/images/images/sample_tshirt.png'),
      description: '4.2 oz./yd², 52/48 airlume combed and ring-spun cotton/polyester, 32 singles, Athletic Heather and Black Heather are 90/10 airlume combed and ring-spun cotton/polyester. Retail fit, unisex sizing, shoulder taping, Tear-away label.'
    },
    {
      id: 4,
      title: 'T shirts',
      image: require('../../../../assets/images/images/sample_tshirt.png'),
      description: '4.2 oz./yd², 52/48 airlume combed and ring-spun cotton/polyester, 32 singles, Athletic Heather and Black Heather are 90/10 airlume combed and ring-spun cotton/polyester. Retail fit, unisex sizing, shoulder taping, Tear-away label.'
    },
    {
      id: 5,
      title: 'T shirts',
      image: require('../../../../assets/images/images/sample_tshirt.png'),
      description: '4.2 oz./yd², 52/48 airlume combed and ring-spun cotton/polyester, 32 singles, Athletic Heather and Black Heather are 90/10 airlume combed and ring-spun cotton/polyester. Retail fit, unisex sizing, shoulder taping, Tear-away label.'
    },
  ]

  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal: CONTAINER_PADDING,
        marginVertical: 15,
      }}
      data={data}
      renderItem={({ item, index }) => (
        <ProductBox item={item} index={index} />
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
    />
  );
};

export default PopularProducts;
