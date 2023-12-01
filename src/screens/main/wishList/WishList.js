import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import AppBar from '../../../components/AppBar';
import {GlobalStyle, Window} from '../../../globalStyle/Theme';
import ProductBox from '../product/_partials/ProductBox';
import {CartEmptyIcon, NoResult} from '../../../assets/svgs/NotificationSvg';
import Button from '../../../components/Button';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
const WishList = ({navigation}) => {
  const {wishlist} = useSelector(state => ({...state}));
  const [WishlistData, setWishlistData] = useState('');

  const GET_WISHLIST_DATA = async () => {
    const existingWishlist = await AsyncStorage.getItem('WishList_Items');
    setWishlistData(JSON.parse(existingWishlist));
  };

  useEffect(() => {
    //AsyncStorage.removeItem('WishList_Items');
    GET_WISHLIST_DATA();
  }, [GET_WISHLIST_DATA]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <AppBar
        theme="light"
        center={<Text style={{...GlobalStyle.heading, fontSize: 22, color: 'black'}}> Wishlist</Text>}
        customStyle={{paddingHorizontal: Window.fixPadding * 2}}
      />

      <FlatList
        contentContainerStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: Window.fixPadding * 2,
          paddingVertical: Window.fixPadding,
          flexDirection: 'row',
        }}
        style={{flex: 1}}
        data={WishlistData}
        renderItem={({item}) => <ProductBox item={item.addedItems} customStyle={{width: Window.width / 2.3}} wishlist={wishlist} />}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{width: 15}} />}
        ListEmptyComponent={() => (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '20%'}}>
            <NoResult />
            <View>
              <Text style={{...GlobalStyle.heading, textAlign: 'center', marginTop: Window.fixPadding * 2}}>Empty</Text>
              <Text style={{...GlobalStyle.textStlye, textAlign: 'center', marginVertical: Window.fixPadding}}>
                You do not have any product in wishlist
              </Text>
              <Button text="Explore products" isIcon={false} theme="tertiary" navLink="ProductListing" />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
export default WishList;
