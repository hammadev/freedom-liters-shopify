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
import ActivityLoader from '../../../components/ActivityLoader';
import {useEffect} from 'react';
import BottomPopupHOC from '../../../components/BottomPopupHOC';
import Button from '../../../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import {COLORS, CONTAINER_PADDING} from '../../../constants';
import FilterPopupSortOption from '../../../components/FilterPopupSortOption';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';

const SearchScreen = () => {
  const [searchValue, setSearcValue] = useState();
  const [ProductData, setProductData] = useState([]);
  const [loaderSpinner, setloaderSpinner] = useState(true);
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
      />

      <View
        style={{
          paddingHorizontal: CONTAINER_PADDING,
          flex: 1,
        }}>
        {!loaderSpinner ? (
          <FlatList
            style={{
              flex: 1,
              overflow: 'hidden',
              borderRadius: CONTAINER_PADDING,
              marginTop: 25,
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            data={ProductData}
            numColumns={2}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            renderItem={(item, index) => (
              <ProductBox item={item.item} index={index} />
            )}
          />
        ) : (
          <ActivityLoader />
        )}
      </View>
      <BottomPopupHOC
        title="Sort"
        color={COLORS.primary}
        PopupBody={
          <>
            <FilterPopupSortOption checked={checked} setChecked={setChecked} />
            <View style={{marginTop: 15}}>
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

export default SearchScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
});
