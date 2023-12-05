import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Window} from '../../../globalStyle/Theme';
import ProductBox from '../product/_partials/ProductBox';
import {NoResult} from '../../../assets/svgs/NotificationSvg';
import Button from '../../../components/Button';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {COLORS, CONTAINER_PADDING, FONTS} from '../../../constants';
import Header from '../../../components/Header';

const WishList = ({navigation}) => {
  const [WishlistData, setWishlistData] = useState([]);

  const GET_WISHLIST_DATA = async () => {
    const existingWishlist = await AsyncStorage.getItem('WishList_Items');
    setWishlistData(JSON.parse(existingWishlist));
  };

  useEffect(() => {
    GET_WISHLIST_DATA();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header label="WISHLIST" />

      <View style={styles.contentContainer}>
        <FlatList
          numColumns={2}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          style={styles.flatelistStyle}
          data={WishlistData.addedItems}
          renderItem={({item}) => <ProductBox item={item} />}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <NoResult />
              <View>
                <Text style={styles.text}>Empty</Text>
                <Text style={styles.subtitle}>
                  You do not have any product in wishlist
                </Text>
                <Button
                  text="Explore products"
                  isIcon={false}
                  type="primary"
                  navLink="ProductListing"
                />
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default WishList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    paddingHorizontal: CONTAINER_PADDING,
    flex: 1,
  },
  flatelistStyle: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: CONTAINER_PADDING,
    marginTop: 25,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
  },
  text: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: Window.fixPadding * 2,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.secondary,
    textAlign: 'center',
    marginVertical: Window.fixPadding,
  },
});
