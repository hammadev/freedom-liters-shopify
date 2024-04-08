import { StyleSheet, View } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { FlatList } from 'react-native';
import ProductBox from '../product/_partials/ProductBox';
import { useSelector } from 'react-redux';
import ActivityLoader from '../../../components/ActivityLoader';
import { useEffect } from 'react';
import { GET_ONE_CATEGORIES_PRODUCT } from '../../../graphql/queries/Category';
import {
  FILTER_CATEGORY_PRODUCTS,
  GET_ALL_FEATURED_PRODUCT,
  GET_ALL_LATEST_PRODUCT,
  GET_ALL_ONSALE_PRODUCT,
  GET_ALL_PRODUCT,
} from '../../../graphql/queries/Product';
import BottomPopupHOC from '../../../components/BottomPopupHOC';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, CONTAINER_PADDING, WIDTH } from '../../../constants';
import FilterPopupSortOption from '../../../components/FilterPopupSortOption';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';

const ProductListing = route => {
  const [ProductData, setProductData] = useState([]);
  const [ProductfilterData, setProductfilterData] = useState([]);
  const [searchValue, setSearcValue] = useState();
  const [loaderSpinner, setloaderSpinner] = useState(true);

  const [SortPopup, setSortPopup] = useState(false);
  const [checked, setChecked] = useState('');

  const data = [
    {
      id: 1,
      title: 'T shirts',
      image: require('../../../assets/images/images/sample_tshirt.png'),
      description: '4.2 oz./yd², 52/48 airlume combed and ring-spun cotton/polyester, 32 singles, Athletic Heather and Black Heather are 90/10 airlume combed and ring-spun cotton/polyester. Retail fit, unisex sizing, shoulder taping, Tear-away label.'
    },
    {
      id: 2,
      title: 'T shirts',
      image: require('../../../assets/images/images/sample_tshirt.png'),
      description: '4.2 oz./yd², 52/48 airlume combed and ring-spun cotton/polyester, 32 singles, Athletic Heather and Black Heather are 90/10 airlume combed and ring-spun cotton/polyester. Retail fit, unisex sizing, shoulder taping, Tear-away label.'
    },
    {
      id: 3,
      title: 'T shirts',
      image: require('../../../assets/images/images/sample_tshirt.png'),
      description: '4.2 oz./yd², 52/48 airlume combed and ring-spun cotton/polyester, 32 singles, Athletic Heather and Black Heather are 90/10 airlume combed and ring-spun cotton/polyester. Retail fit, unisex sizing, shoulder taping, Tear-away label.'
    },
    {
      id: 4,
      title: 'T shirts',
      image: require('../../../assets/images/images/sample_tshirt.png'),
      description: '4.2 oz./yd², 52/48 airlume combed and ring-spun cotton/polyester, 32 singles, Athletic Heather and Black Heather are 90/10 airlume combed and ring-spun cotton/polyester. Retail fit, unisex sizing, shoulder taping, Tear-away label.'
    },
    {
      id: 5,
      title: 'T shirts',
      image: require('../../../assets/images/images/sample_tshirt.png'),
      description: '4.2 oz./yd², 52/48 airlume combed and ring-spun cotton/polyester, 32 singles, Athletic Heather and Black Heather are 90/10 airlume combed and ring-spun cotton/polyester. Retail fit, unisex sizing, shoulder taping, Tear-away label.'
    },
  ]

  const {
    data: featuredProductData,
    loader: featuredProductLoader,
    error: featuredProductError,
  } = useQuery(GET_ALL_FEATURED_PRODUCT);
  const {
    data: latestProductData,
    loader: latestProductLoader,
    error: latestProductError,
  } = useQuery(GET_ALL_LATEST_PRODUCT);
  const {
    data: onSaleProductData,
    loader: onSaleProductLoader,
    error: onSaleProductError,
  } = useQuery(GET_ALL_ONSALE_PRODUCT);
  const {
    data: AllProductsData,
    loader: AllProductsLoader,
    error: AllProductsError,
  } = useQuery(GET_ALL_PRODUCT);

  const searchFilterFunction = text => {
    if (text) {
      const newData = ProductData.filter(item => {
        const itemData = item.node.title
          ? item.node.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setProductData(newData);
      setSearcValue(text);
    } else {
      setProductData(ProductfilterData);
      setSearcValue(text);
    }
  };

  const ApplyBtn = () => {
    setloaderSpinner(true);
    if (checked === 'lowtohigh') {
      getProductsOfProductTypeInCollection({
        variables: {
          handle: route.route.params?.handle,
          reverse: false,
          sortkey: 'PRICE',
        },
      });
    }
    if (checked === 'hightolow') {
      getProductsOfProductTypeInCollection({
        variables: {
          handle: route.route.params?.handle,
          reverse: true,
          sortkey: 'PRICE',
        },
      });
    }

    if (sortData && !sortLoader && !sortError) {
      console.log(
        'sortData.collection.products.edges',
        sortData.collection.products.edges,
      );
      setProductData(sortData.collection.products.edges);
      setProductfilterData(sortData.collection.products.edges);
    }
    setloaderSpinner(false);
    setSortPopup(false);
  };


  setTimeout(() => {
    setloaderSpinner(false)
  }, 3000);

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={COLORS.white}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      />
      <Header
        search
        searchFilterFunction={searchFilterFunction}
        searchValue={searchValue}
        filterFunc={() => setSortPopup(true)}
        searchPlaceholder={
          route.route.params ? route.route.params.title : 'Products'
        }
      />
      <View style={{ paddingHorizontal: CONTAINER_PADDING, flex: 1 }}>
        {!loaderSpinner ? (
          <FlatList
            style={{
              flex: 1,
              overflow: 'hidden',
              borderRadius: CONTAINER_PADDING,
              marginTop: 25,
            }}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            data={data}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={(item, index) => (
              <ProductBox
                customStyle={{ width: WIDTH / 2.3 }}
                item={item.item}
                index={index}
              />
            )}
          />
        ) : (
          <ActivityLoader />
        )}
      </View>
      <BottomPopupHOC
        title="Sort "
        color={COLORS.primary}
        PopupBody={
          <>
            <FilterPopupSortOption checked={checked} setChecked={setChecked} />
            <View style={{ marginTop: 15 }}>
              <Button text="Apply" type="primary" onPressFunc={ApplyBtn} />
            </View>
          </>
        }
        visible={SortPopup}
        setVisible={setSortPopup}
      />
    </SafeAreaView>
  );
};

export default ProductListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
