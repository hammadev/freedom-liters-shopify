import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {Searchbar} from 'react-native-paper';
import {useState} from 'react';
import {Color, Window} from '../../../globalStyle/Theme';
import {useLazyQuery, useQuery} from '@apollo/client';
import {FILTER_PRODUCTS, GET_ALL_PRODUCT} from '../../../graphql/queries/Product';
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

const SortOption = ({ApplyBtn, checked, setChecked}) => {
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text
          style={{
            ...GlobalStyle.textStlye,
            color: '#424242',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Newest
        </Text>
        <RadioButton value="newest" status={checked === 'newest' ? 'checked' : 'unchecked'} onPress={() => setChecked('newest')} />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15}}>
        <Text
          style={{
            ...GlobalStyle.textStlye,
            color: '#424242',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Price: Low To High
        </Text>
        <RadioButton value="lowtohigh" status={checked === 'lowtohigh' ? 'checked' : 'unchecked'} onPress={() => setChecked('lowtohigh')} />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text
          style={{
            ...GlobalStyle.textStlye,
            color: '#424242',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Price: High To Low
        </Text>
        <RadioButton value="hightolow" status={checked === 'hightolow' ? 'checked' : 'unchecked'} onPress={() => setChecked('hightolow')} />
      </View>

      <View style={{marginTop: 15}}>
        <Button text="Apply" isIcon={false} theme="tertiary" loading={false} onPressFunc={ApplyBtn} />
      </View>
    </View>
  );
};

const SearchScreen = () => {
  const [searchValue, setSearcValue] = useState();
  const [ProductData, setProductData] = useState([]);
  const [loaderSpinner, setloaderSpinner] = useState(true);

  const [ShowFilterIcon, setShowFilterIcon] = useState(false);
  const [SortPopup, setSortPopup] = useState(false);
  const [checked, setChecked] = useState('');

  const {data, loader, error} = useQuery(GET_ALL_PRODUCT);

  const [getSortProducts, {data: sortData, loader: sortLoader, error: sortError}] = useLazyQuery(FILTER_PRODUCTS, {
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
    let variables;
    if (checked === 'newest') {
      getSortProducts({
        variables: {reverse: true, sortkey: 'CREATED_AT'},
      });
      console.log('Newest ', variables);
    }
    if (checked === 'lowtohigh') {
      getSortProducts({
        variables: {reverse: false, sortkey: 'PRICE'},
      });
      console.log('low To high', variables);
    }
    if (checked === 'hightolow') {
      getSortProducts({
        variables: {reverse: true, sortkey: 'PRICE'},
      });
      console.log('High To Low', variables);
    }

    if (sortData && !sortLoader && !sortError) {
      setProductData(sortData.products.edges);
    }
    setloaderSpinner(false);
    setSortPopup(false);
  };

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
    <Animated.View style={[reanimatedHeightStyle, {overflow: 'hidden', padding: 18, flex: 1}]}>
      <StatusBar backgroundColor={Color.tertiary} />
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
            }}
            onPress={() => setSortPopup(true)}>
            <Image
              style={{width: 20, height: 20, marginRight: 5, tintColor: Color.black}}
              source={require('../../../assets/images/pics/arrow-down.png')}
            />
            <Text style={{color: Color.black}}>Sort</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{width: '100%', flex: 1, marginTop: 10}}>
        {!loaderSpinner ? (
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
      <BottomPopupHOC
        title="Sort "
        color={Color.primary}
        PopupBody={<SortOption ApplyBtn={ApplyBtn} checked={checked} setChecked={setChecked} />}
        visible={SortPopup}
        setVisible={setSortPopup}
      />
    </Animated.View>
  );
};

export default SearchScreen;
