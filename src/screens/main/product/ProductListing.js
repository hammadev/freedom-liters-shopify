import {View} from 'react-native';
import React from 'react';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {Searchbar} from 'react-native-paper';
import {useState} from 'react';
import {Color, Window} from '../../../globalStyle/Theme';
import {SearchFilterSvg} from '../../../assets/svgs/SearchSvg';
import {useQuery} from '@apollo/client';
import {FlatList} from 'react-native';
import ProductBox from '../product/_partials/ProductBox';
import {useSelector} from 'react-redux';
import ActivityLoader from '../../../components/ActivityLoader';
import {useEffect} from 'react';
import StatusAppBar from '../../../components/StatusAppBar';
import {GET_ONE_CATEGORIES_PRODUCT} from '../../../graphql/queries/Category';
import {BackIcon} from '../../../components/AppBar';

const ProductListing = route => {
  const [ProductData, setProductData] = useState([]);
  const [searchValue, setSearcValue] = useState();
  const [loading, setLoading] = useState(true);

  const {data, loader, error} = useQuery(GET_ONE_CATEGORIES_PRODUCT, {
    variables: {
      handle: route.route.params?.handle,
    },
  });

  const {wishlist} = useSelector(state => ({
    ...state,
  }));
  useEffect(() => {
    if (data && !loader && !error) {
      setProductData(data.collection.products.edges);
    }
  }, [data, loader, error]);

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
      <StatusAppBar />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
        <View
          style={{
            marginRight: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BackIcon theme={'light'} />
        </View>
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
        <View
          style={{
            marginLeft: 8,
            borderRadius: 20,
            backgroundColor: Color.tertiary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SearchFilterSvg />
        </View>
      </View>
      <View style={{flex: 1}}>
        {ProductData ? (
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
