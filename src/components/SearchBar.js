import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Searchbar} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Color, Font} from '../globalStyle/Theme';
import {GET_ALL_PRODUCT} from '../graphql/queries/Product';
import {useQuery} from '@apollo/client';
import ProductBox from '../screens/main/product/_partials/ProductBox';

const SearchBar = ({}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedQuery, setSearchedQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    loading: loadingAllProduct,
    error: errorAllProduct,
    data: dataAllProduct,
  } = useQuery(GET_ALL_PRODUCT);
  const All_Product = dataAllProduct.products;
  const onChangeSearch = query => setSearchQuery(query);
  const theme = {
    roundness: 120 / 8,
    colors: {
      onSurface: Color.black,
      onSurfaceVariant: Color.black,
    },
  };
  useEffect(() => {
    if (All_Product) {
      setData(All_Product);
    }
  }, [All_Product]);
  const heightProgress = useSharedValue(58);
  const reanimatedHeightStyle = useAnimatedStyle(() => {
    return {
      height: heightProgress.value,
    };
  }, []);

  return (
    <Animated.View
      style={[
        reanimatedHeightStyle,
        {overflow: 'hidden', padding: 20, flex: 1},
      ]}>
      <Searchbar
        theme={theme}
        placeholder="Search"
        onClearIconPress={() => {
          setLoading(false);
        }}
        onChangeText={text => {
          onChangeSearch(text);
        }}
        value={searchQuery}
        style={[
          {
            marginTop: 5,
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderRadius: 100,
            borderColor: '#CBD1DA',
          },
        ]}
        mode="view"
        rippleColor={Color.primary}
        showDivider={false}
        inputStyle={{minHeight: 48}}
      />

      {loading ? (
        <View style={{marginTop: 50}}>
          <ActivityIndicator animating={true} color={Color.tertiary} />
        </View>
      ) : data.length > 0 ? (
        <>
          <Text style={styles.sectionSubHeading}>
            Showing results of {searchedQuery} ({data.length})
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={All_Product}
            style={{flex: 1, borderRadius: 100, overflow: 'hidden'}}
            contentContainerStyle={{
              flexGrow: 1,
              borderRadius: 100,
              paddingBottom: 150,
            }}
            renderItem={({item, index}) => (
              <ProductBox
                wishlist={wishlist}
                customStyle={{width: Window.width / 2.3}}
                item={item}
                index={index}
              />
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={
              <View
                style={{
                  marginVertical: 5,
                }}
              />
            }
          />
        </>
      ) : (
        <View style={{alignItems: 'center'}}>
          {searchedQuery !== '' && (
            <Text style={[styles.sectionSubHeading, {alignSelf: 'flex-start'}]}>
              Showing results of {searchedQuery} ({data.length})
            </Text>
          )}
          {/* <SvgXml
            xml={searchedQuery !== '' ? noSearchResults : searchSvg}
            width={Window.width / 1.5}
            height={Window.height / 2}
          /> */}
        </View>
      )}
    </Animated.View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  title: {
    fontFamily: Font.Gilroy_Bold,
    fontSize: 16,
    color: Color.tertiary,
    marginVertical: 25,
  },
  sectionSubHeading: {
    fontSize: 16,
    color: Color.black,
    fontFamily: Font.Gilroy_Medium,
    marginVertical: 25,
  },
});
