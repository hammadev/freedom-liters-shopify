import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {Searchbar} from 'react-native-paper';
import {useState} from 'react';
import {Color, Window, GlobalStyle} from '../../../globalStyle/Theme';
import {useQuery} from '@apollo/client';
import {FlatList} from 'react-native';
import ProductBox from '../product/_partials/ProductBox';
import {useSelector} from 'react-redux';
import ActivityLoader from '../../../components/ActivityLoader';
import {useEffect} from 'react';
import StatusAppBar from '../../../components/StatusAppBar';
import {GET_ONE_CATEGORIES_PRODUCT} from '../../../graphql/queries/Category';
import AppBar from '../../../components/AppBar';
import {GET_ALL_FEATURED_PRODUCT, GET_ALL_LATEST_PRODUCT, GET_ALL_ONSALE_PRODUCT, GET_ALL_PRODUCT} from '../../../graphql/queries/Product';
import {Text} from 'react-native';

const ProductListing = route => {
  const [ProductData, setProductData] = useState([]);
  const [searchValue, setSearcValue] = useState();
  const [loading, setLoading] = useState(true);
  const [ShowFilterIcon, setShowFilterIcon] = useState(false);

  const {data, loader, error} = useQuery(GET_ONE_CATEGORIES_PRODUCT, {
    variables: {
      handle: route.route.params?.handle,
    },
  });
  const {data: featuredProductData, loader: featuredProductLoader, error: featuredProductError} = useQuery(GET_ALL_FEATURED_PRODUCT);
  const {data: latestProductData, loader: latestProductLoader, error: latestProductError} = useQuery(GET_ALL_LATEST_PRODUCT);
  const {data: onSaleProductData, loader: onSaleProductLoader, error: onSaleProductError} = useQuery(GET_ALL_ONSALE_PRODUCT);
  const {data: AllProductsData, loader: AllProductsLoader, error: AllProductsError} = useQuery(GET_ALL_PRODUCT);

  const {wishlist} = useSelector(state => ({
    ...state,
  }));

  console.log(route.route.params?.value);
  useEffect(() => {
    if (route.route.params?.value == 0) {
      if (data && !loader && !error) {
        setProductData(data.collection.products.edges);
      }
    } else if (route.route.params?.value == 1) {
      if (featuredProductData && !featuredProductLoader && !featuredProductError) {
        setProductData(featuredProductData.products.edges);
      }
    } else if (route.route.params?.value == 2) {
      if (latestProductData && !latestProductLoader && !latestProductError) {
        setProductData(latestProductData.products.edges);
      }
    } else if (route.route.params?.value == 3) {
      if (onSaleProductData && !onSaleProductLoader && !onSaleProductError) {
        setProductData(onSaleProductData.products.edges);
      }
    } else if (route.route.params?.value == 4) {
      if (AllProductsData && !AllProductsLoader && !AllProductsError) {
        setProductData(AllProductsData.products.edges);
      }
    }
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
      const newData = data.collection.products.edges.filter(item => {
        const itemData = item.node.title ? item.node.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setProductData(newData);
      setSearcValue(text);
    } else {
      setProductData(data.collection.products.edges);
      setSearcValue(text);
    }
  };

  return (
    <Animated.View style={[reanimatedHeightStyle, {overflow: 'hidden', padding: 20, flex: 1}]}>
      <AppBar theme="light" center={<Text style={{...GlobalStyle.heading, fontSize: 22, color: 'black'}}>Products</Text>} />

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
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
            <Image style={{width: 20, height: 20}} source={require('../../../assets/images/pics/filter.png')} />
          </View>
        </TouchableOpacity>
      </View>
      {ShowFilterIcon && (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: Color.gryLight,
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 20,
            }}>
            <Image
              style={{width: 20, height: 20, marginRight: 5, tintColor: Color.black}}
              source={require('../../../assets/images/pics/filter-search.png')}
            />
            <Text style={{color: Color.black}}>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: Color.gryLight,
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 20,
            }}>
            <Image
              style={{width: 20, height: 20, marginRight: 5, tintColor: Color.black}}
              source={require('../../../assets/images/pics/arrow-down.png')}
            />
            <Text style={{color: Color.black}}>Sort</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{flex: 1, marginTop: 15}}>
        {ProductData.length ? (
          <FlatList
            contentContainerStyle={{marginVertical: Window.fixPadding}}
            data={ProductData}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={(item, index) => (
              <ProductBox wishlist={wishlist} customStyle={{width: Window.width / 2.3}} item={item.item} index={index} />
            )}
          />
        ) : (
          <ActivityLoader />
        )}
      </View>
    </Animated.View>
  );
};

export default ProductListing;
