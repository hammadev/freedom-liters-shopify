import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Searchbar} from 'react-native-paper';
import {useState} from 'react';
import {Color, Window} from '../../../globalStyle/Theme';
import {useLazyQuery, useQuery} from '@apollo/client';
import {
  FILTER_PRODUCTS,
  GET_ALL_PRODUCT,
} from '../../../graphql/queries/Product';
import {FlatList} from 'react-native';
import ProductBox from '../product/_partials/ProductBox';
import {useSelector} from 'react-redux';
import ActivityLoader from '../../../components/ActivityLoader';
import {useEffect} from 'react';
import {BackIcon} from '../../../components/AppBar';
import BottomPopupHOC from '../../../components/BottomPopupHOC';
import {GlobalStyle} from '../../../globalStyle/Theme';
import {RadioButton} from 'react-native-paper';
import Button from '../../../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import {COLORS, CONTAINER_PADDING} from '../../../constants';
import FilterPopupSortOption from '../../../components/FilterPopupSortOption';

const SearchScreen = () => {
  const [searchValue, setSearcValue] = useState();
  const [ProductData, setProductData] = useState([]);
  const [loaderSpinner, setloaderSpinner] = useState(true);

  const [ShowFilterIcon, setShowFilterIcon] = useState(false);
  const [SortPopup, setSortPopup] = useState(false);
  const [checked, setChecked] = useState('');

  const {data, loader, error} = useQuery(GET_ALL_PRODUCT);

  const [
    getSortProducts,
    {data: sortData, loader: sortLoader, error: sortError},
  ] = useLazyQuery(FILTER_PRODUCTS, {
    onCompleted: sortData => {
      console.log(sortData.products.edges);
      setProductData(sortData.products.edges);
    },
  });

  const {wishlist} = useSelector(state => ({
    ...state,
  }));

  useEffect(() => {
    if (data && !loader && !error) {
      setProductData(data.products.edges);
      setloaderSpinner(false);
    }
  }, [data, loader, error]);

  const ApplyBtn = () => {
    setloaderSpinner(true);
    console.log('checked', checked);
    if (checked === 'newest') {
      getSortProducts({
        variables: {reverse: true, sortkey: 'CREATED_AT'},
      });
    }
    if (checked === 'lowtohigh') {
      getSortProducts({
        variables: {reverse: false, sortkey: 'PRICE'},
      });
    }
    if (checked === 'hightolow') {
      getSortProducts({
        variables: {reverse: true, sortkey: 'PRICE'},
      });
    }

    if (sortData && !sortLoader && !sortError) {
      setProductData(sortData.products.edges);
    }
    setloaderSpinner(false);
    setSortPopup(false);
  };

  const searchFilterFunction = text => {
    if (text) {
      const newData = data.products.edges.filter(item => {
        const itemData = item.node.title
          ? item.node.title.toUpperCase()
          : ''.toUpperCase();
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
    <SafeAreaView style={styles.container}>
      <Header
        search
        searchFilterFunction={searchFilterFunction}
        searchValue={searchValue}
        filterFunc={() => setSortPopup(true)}
      />

      <View
        style={{
          paddingHorizontal: CONTAINER_PADDING,
          flex: 1,
        }}>
        {!loaderSpinner ? (
          <FlatList
            style={{
              overflow: 'hidden',
              borderRadius: CONTAINER_PADDING,
              marginTop: 25,
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginVertical: Window.fixPadding}}
            data={ProductData}
            numColumns={2}
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

export default SearchScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
});
