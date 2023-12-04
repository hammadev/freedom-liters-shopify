import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Searchbar} from 'react-native-paper';
import {useState} from 'react';
import {Color, Window, GlobalStyle} from '../../../globalStyle/Theme';
import {useLazyQuery, useQuery} from '@apollo/client';
import {FlatList} from 'react-native';
import ProductBox from '../product/_partials/ProductBox';
import {useSelector} from 'react-redux';
import ActivityLoader from '../../../components/ActivityLoader';
import {useEffect} from 'react';
import {GET_ONE_CATEGORIES_PRODUCT} from '../../../graphql/queries/Category';
import AppBar from '../../../components/AppBar';
import {
  FILTER_CATEGORY_PRODUCTS,
  GET_ALL_FEATURED_PRODUCT,
  GET_ALL_LATEST_PRODUCT,
  GET_ALL_ONSALE_PRODUCT,
  GET_ALL_PRODUCT,
} from '../../../graphql/queries/Product';
import {Text} from 'react-native';
import BottomPopupHOC from '../../../components/BottomPopupHOC';
import {RadioButton} from 'react-native-paper';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, CONTAINER_PADDING} from '../../../constants';
import FilterPopupSortOption from '../../../components/FilterPopupSortOption';

const ProductListing = route => {
  const [ProductData, setProductData] = useState([]);
  const [ProductfilterData, setProductfilterData] = useState([]);
  const [searchValue, setSearcValue] = useState();
  const [ShowFilterIcon, setShowFilterIcon] = useState(false);
  const [loaderSpinner, setloaderSpinner] = useState(true);

  const [SortPopup, setSortPopup] = useState(false);
  const [checked, setChecked] = useState('');

  const {data, loader, error} = useQuery(GET_ONE_CATEGORIES_PRODUCT, {
    variables: {
      handle: route.route.params?.handle,
    },
  });
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

  const [
    getProductsOfProductTypeInCollection,
    {data: sortData, loader: sortLoader, error: sortError},
  ] = useLazyQuery(FILTER_CATEGORY_PRODUCTS, {
    onCompleted: sortData => {
      console.log(
        'sortData.collection.products.edges',
        sortData.collection.products.edges,
      );
      setProductData(sortData.collection.products.edges);
    },
  });

  const {wishlist} = useSelector(state => ({
    ...state,
  }));

  useEffect(() => {
    if (route.route.params?.value == 0) {
      if (data && !loader && !error) {
        setProductData(data.collection.products.edges);
        setProductfilterData(data.collection.products.edges);
        setloaderSpinner(false);
      }
    } else if (route.route.params?.value == 1) {
      if (
        featuredProductData &&
        !featuredProductLoader &&
        !featuredProductError
      ) {
        setProductData(featuredProductData.products.edges);
        setProductfilterData(featuredProductData.products.edges);
        setloaderSpinner(false);
      }
    } else if (route.route.params?.value == 2) {
      if (latestProductData && !latestProductLoader && !latestProductError) {
        setProductData(latestProductData.products.edges);
        setProductfilterData(latestProductData.products.edges);
        setloaderSpinner(false);
      }
    } else if (route.route.params?.value == 3) {
      if (onSaleProductData && !onSaleProductLoader && !onSaleProductError) {
        setProductData(onSaleProductData.products.edges);
        setProductfilterData(onSaleProductData.products.edges);
        setloaderSpinner(false);
      }
    } else if (route.route.params?.value == 4) {
      if (AllProductsData && !AllProductsLoader && !AllProductsError) {
        setProductData(AllProductsData.products.edges);
        setProductfilterData(AllProductsData.products.edges);
        setloaderSpinner(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data,
    loader,
    error,
    featuredProductData,
    featuredProductLoader,
    featuredProductError,
    latestProductData,
    latestProductLoader,
    latestProductError,
    onSaleProductData,
    onSaleProductLoader,
    onSaleProductError,
    AllProductsData,
    AllProductsLoader,
    AllProductsError,
  ]);

  const heightProgress = useSharedValue(50);
  const reanimatedHeightStyle = useAnimatedStyle(() => {
    return {
      height: heightProgress.value,
    };
  }, []);

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

  return (
    <SafeAreaView style={styles.container}>
      <Header
        search
        searchFilterFunction={searchFilterFunction}
        searchValue={searchValue}
        filterFunc={() => setSortPopup(true)}
        searchPlaceholder={
          route.route.params ? route.route.params.title : 'Products'
        }
      />
      <View style={{paddingHorizontal: CONTAINER_PADDING, flex: 1}}>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <Searchbar
            placeholder="Search"
            onChangeText={text => {
              searchFilterFunction(text);
            }}
            value={searchValue}
            style={[
              {
                flex: 1,
                marginTop: 5,
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderRadius: 100,
                borderColor: 'black',
              },
            ]}
            mode="view"
            rippleColor={Color.primary}
            showDivider={false}
            inputStyle={{minHeight: 48}}
          />
          {!route.route.params.value > 0 ? (
            <TouchableOpacity
              style={{
                paddingHorizontal: 15,
                borderRadius: 15,
                marginLeft: 8,
                backgroundColor: Color.tertiary,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowFilterIcon(!ShowFilterIcon)}>
              <View>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../assets/images/pics/filter.png')}
                />
              </View>
            </TouchableOpacity>
          ) : null}
        </View> */}

        {/* {ShowFilterIcon && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 15,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: Color.gryLight,
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 20,
              }}
              onPress={() => setSortPopup(true)}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
                  tintColor: Color.black,
                }}
                source={require('../../../assets/images/pics/arrow-down.png')}
              />
              <Text style={{color: Color.black}}>Sort</Text>
            </TouchableOpacity>
          </View>
        )} */}

        <View style={{flex: 1}}>
          {!loaderSpinner ? (
            <FlatList
              style={{
                overflow: 'hidden',
                borderRadius: CONTAINER_PADDING,
                marginTop: 25,
              }}
              contentContainerStyle={{}}
              data={ProductData}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={(item, index) => (
                <ProductBox
                  wishlist={wishlist}
                  customStyle={{width: Window.width / 2.3}}
                  item={item.item}
                  index={index}
                />
              )}
            />
          ) : (
            <ActivityLoader />
          )}
        </View>
      </View>
      <BottomPopupHOC
        title="Sort "
        color={Color.primary}
        PopupBody={
          <>
            <FilterPopupSortOption checked={checked} setChecked={setChecked} />
            <View style={{marginTop: 15}}>
              <Button
                text="Apply"
                isIcon={false}
                theme="tertiary"
                loading={false}
                onPressFunc={ApplyBtn}
              />
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
