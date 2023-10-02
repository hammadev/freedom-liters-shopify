import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CartSvg, ManuSvg} from '../../../assets/svgs/HomePage';
import Icon from '../../../core/Icon';
import {useDispatch, useSelector} from 'react-redux';
import {getAddress} from '../../../apis/profile';
import Heading from '../../../components/Heading';
import ProductBox from '../product/_partials/ProductBox';

const CatBox = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductListing', {catId: item.id})}>
      {/* item.image ? { uri: item.image } : require('../../../assets/images/products/review.png') */}
      <ImageBackground
        style={{
          width: Window.width / 2.3,
          height: 140,
          flexDirection: 'row',
          marginTop: Window.fixPadding,
        }}
        source={
          item.image
            ? {uri: item.image.src}
            : require('../../../assets/images/products/review.png')
        }>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            paddingBottom: 20,
            paddingHorizontal: Window.fixPadding,
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              ...GlobalStyle.heading,
              color: Color.white,
              lineHeight: Window.fixPadding * 2,
              fontSize: 14,
            }}>
            {item.name}
          </Text>
          <View
            style={{
              height: 3,
              width: item.name.length * 10,
              borderRadius: 10,
              marginTop: 12,
              backgroundColor: Color.white,
            }}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const Home = ({navigation}) => {
  const {auth, categories, product, wishlist, cart} = useSelector(state => ({
    ...state,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(product.all.edges);
    // getAddress(dispatch, auth.user.ID);
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: Color.light, flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Color.white} />

      <ScrollView>
        <ImageBackground
          resizeMode="cover"
          style={{
            height: 268,
            paddingHorizontal: 20,
            backgroundColor: Color.tertiary,
            paddingVertical: 20,
          }}
          source={require('../../../assets/images/products/homeBg.png')}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <ManuSvg /> */}
            <View />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{paddingRight: 10}}>
                <Icon
                  iconFamily={'Feather'}
                  size={20}
                  style={{}}
                  name={'search'}
                  color={Color.white}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('CheckOut')}>
                <View
                  style={{
                    zIndex: 1,
                    position: 'absolute',
                    right: -7,
                    top: -7,
                    backgroundColor: Color.yellow,
                    borderRadius: 100,
                    width: 16,
                    height: 16,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: Font.Gilroy_SemiBold,
                      color: Color.white,
                    }}>
                    {cart.addedItems.length}
                  </Text>
                </View>
                <CartSvg />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              marginTop: 27,
              fontFamily: Font.Automove_Personal,
              fontSize: 23,
              color: Color.white,
            }}>
            Dress With Style
          </Text>
          <Image
            style={{
              marginLeft: 140,
              width: 98,
              height: 10,
              // background: Color.tertiart,
            }}
            source={require('../../../assets/images/products/Vector2.png')}
          />
          <Text
            style={{
              marginTop: 8,
              fontSize: 20,
              fontFamily: Font.Gilroy_Bold,
              color: Color.white,
            }}>
            20% Discount
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 16,
              justifyContent: 'center',
              backgroundColor: Color.white,
              width: 85,
              height: 40,
              borderRadius: 100,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Color.tertiary,
                fontSize: 13,
                fontFamily: Font.Gilroy_Bold,
              }}>
              Buy Now
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <View
          style={{
            padding: Window.fixPadding * 2,
            marginVertical: Window.fixPadding,
          }}>
          {categories && categories[0] && (
            <FlatList
              contentContainerStyle={{marginBottom: Window.fixPadding}}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              data={categories[0].slice(0, 4)}
              renderItem={({item}) => (
                <CatBox item={item} navigation={navigation} />
              )}
              numColumns={2}
              ListHeaderComponent={() => (
                <Heading
                  name={'Category'}
                  showMore={true}
                  showMoreLink={'Category'}
                />
              )}
            />
          )}

          {[
            {heading: 'Featured', data_key: 'featured'},
            {heading: 'Latest', data_key: 'latest'},
            {heading: 'On Sale', data_key: 'onsale'},
          ].map((item, i) => (
            <>
              <Heading
                containerStyle={{marginTop: Window.fixPadding * 1.5}}
                name={item.heading}
                showMore={true}
                showMoreLink={'ProductListing'}
              />
              {product && (
                <FlatList
                  contentContainerStyle={{marginVertical: Window.fixPadding}}
                  data={
                    item.data_key === 'featured'
                      ? product.all.edges
                      : item.data_key === 'latest'
                      ? product.all.edges
                      : item.data_key === 'onsale'
                      ? product.all.edges
                      : product
                  }
                  // renderItem={({ item, index }) => {
                  //   console.log("item", item);
                  // }}
                  renderItem={({item, index}) => (
                    <ProductBox
                      wishlist={wishlist}
                      customStyle={{width: Window.width / 2.3}}
                      item={item}
                      index={index}
                    />
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => (
                    <View style={{width: Window.fixPadding * 1.5}}></View>
                  )}
                />
              )}
            </>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
