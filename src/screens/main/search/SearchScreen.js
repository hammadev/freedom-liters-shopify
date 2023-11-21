import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {Searchbar} from 'react-native-paper';
import {useState} from 'react';
import {Color, Window} from '../../../globalStyle/Theme';
import {SearchFilterSvg} from '../../../assets/svgs/SearchSvg';
import {useQuery} from '@apollo/client';
import {GET_ALL_PRODUCT} from '../../../graphql/queries/Product';
import {FlatList} from 'react-native';
import ProductBox from '../product/_partials/ProductBox';
import {useSelector} from 'react-redux';
import ActivityLoader from '../../../components/ActivityLoader';
import {useEffect} from 'react';
import StatusAppBar from '../../../components/StatusAppBar';
import {BackIcon} from '../../../components/AppBar';

const SearchScreen = () => {
  const [searchValue, setSearcValue] = useState();
  const [ProductData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ShowFilterIcon, setShowFilterIcon] = useState(false);

  const {data, loader, error} = useQuery(GET_ALL_PRODUCT);
  const {wishlist} = useSelector(state => ({
    ...state,
  }));

  useEffect(() => {
    if (data && !loader && !error) {
      setProductData(data.products.edges);
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
      const newData = data.products.edges.filter(item => {
        const itemData = item.node.title ? item.node.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setProductData(newData);
      setSearcValue(text);
    } else {
      setProductData(data.products.edges);
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
          onClearIconPress={() => {
            setLoading(false);
          }}
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
            paddingHorizontal: 20,
            borderRadius: 20,
            marginLeft: 8,
            backgroundColor: Color.tertiary,
            justifyContent: 'center',
          }}
          onPress={() => setShowFilterIcon(!ShowFilterIcon)}>
          <View>
            <Image style={{width: 15, height: 15}} source={require('../../../assets/images/pics/filter.png')} />
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
            <Image style={{width: 20, height: 20, marginRight: 5}} source={require('../../../assets/images/pics/filter-search.png')} />
            <Text>Filters</Text>
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
            <Image style={{width: 20, height: 20, marginRight: 5}} source={require('../../../assets/images/pics/arrow-down.png')} />
            <Text>Sort</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{width: '100%', flex: 1, marginTop: 10}}>
        {ProductData ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginVertical: Window.fixPadding}}
            data={ProductData}
            numColumns={2}
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

export default SearchScreen;
