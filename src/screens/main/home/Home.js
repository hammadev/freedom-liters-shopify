import React, {useState} from 'react';
import {View, Text, ImageBackground, TouchableOpacity, Image, FlatList, ScrollView, StyleSheet, Platform, SafeAreaView} from 'react-native';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';

import {CartSvg, ManuSvg} from '../../../assets/svgs/HomePage';
import Icon from '../../../core/Icon';
import {useDispatch, useSelector} from 'react-redux';
// import {getAddress} from '../../../apis/profile';
import Heading from '../../../components/Heading';
import {hasNotch} from 'react-native-device-info';
import {GET_FEATURED_PRODUCT, GET_LATEST_PRODUCT, GET_ONSALE_PRODUCT} from '../../../graphql/queries/Product';
import {useQuery} from '@apollo/client';
import SearchBar from '../../../components/SearchBar';
import {BackHandler} from 'react-native';
import ProductBox from '../product/_partials/ProductBox';

import {CartSvg} from '../../../assets/svgs/HomePage';
import {useSelector} from 'react-redux';
import {hasNotch} from 'react-native-device-info';
import SearchBar from '../../../components/SearchBar';
import {BackHandler} from 'react-native';
import ProductBox from '../product/_partials/ProductBox';
import {CatBoxCat} from '../../../components/CategoryCart';
import StatusAppBar from '../../../components/StatusAppBar';
import Icon from '../../../core/Icon';

export const CatBox = ({item, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductListing', {catId: item.id})}>
      <ImageBackground
        style={{
          width: Window.width / 2.3,
          height: 140,
          flexDirection: 'row',
          marginTop: Window.fixPadding,
        }}
        source={item.image ? {uri: item.image.src} : require('../../../assets/images/products/review.png')}>
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
  const {product, categories, wishlist, cart} = useSelector(state => ({
    ...state,
  }));
  const [SearchVale, setSearcValue] = useState(false);

  const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
  subscription.remove();
  const onBackPress = () => {
    setSearcValue(false);
  };

  const Goto_Search = () => {
    navigation.navigate('Search');
  };

  // Fetch Latest Product
  const {loading: loadinglatestProduct, error: errorLatestProduct, data: dataLatestProduct} = useQuery(GET_LATEST_PRODUCT);
  // // Fetch Featured Product
  // const {
  //   loading: loadingFeaturedProduct,
  //   error: errorFeaturedProduct,
  //   data: dataFeaturedProduct,
  // } = useQuery(GET_FEATURED_PRODUCT);
  // // Fetch On Sale Product
  // const {
  //   loading: loadingOnSaleProduct,
  //   error: errorOnSaleProduct,
  //   data: dataOnSaleProduct,
  // } = useQuery(GET_ONSALE_PRODUCT);

  return (
    <SafeAreaView
      style={{backgroundColor: Color.light, flex: 1}}
      edges={{
        top: 'maximum',
        right: 'maximum',
        left: 'maximum',
        bottom: hasNotch && Platform.OS === 'ios' ? '' : 'maximum',
      }}>
      <StatusBar animated={true} showHideTransition={'fade'} barStyle={'light-content'} backgroundColor={'transparent'} translucent />
      <StatusAppBar />
      {SearchVale ? (
        <SearchBar />
      ) : (
        <ScrollView>
          <ImageBackground
            resizeMode="cover"
            style={{
              height: Window.height / 3,
              paddingHorizontal: 20,
              backgroundColor: Color.tertiary,
              paddingVertical: 35,
              height: Window.height / 2.9,
              paddingHorizontal: 20,
              backgroundColor: Color.tertiary,
              paddingVertical: 35,
              justifyContent: 'center',
            }}
            source={require('../../../assets/images/products/homeBg.png')}>
            <View style={styles.overlay} />
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={{paddingRight: 10}} onPress={() => Goto_Search()}>
                  <Icon iconFamily={'Feather'} size={20} style={{}} name={'search'} color={Color.white} />
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => navigation.navigate('CheckOut')}> */}

                <TouchableOpacity style={{paddingRight: 15}} onPress={() => Goto_Search()}>
                  <Icon iconFamily={'Feather'} style={{marginTop: 20}} size={20} name={'search'} color={Color.white} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: 20}} onPress={() => navigation.navigate('Cart')}>
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
                fontFamily: Font.Gilroy_Bold,
                fontSize: 32,
                color: Color.white,
              }}>
              Dress With Style
            </Text>
            <Image
              style={{
                marginLeft: 90,
                width: 80,
                height: 10,
                marginTop: -5,
              }}
              source={require('../../../assets/images/products/Vector2.png')}
            />
            <Text
              style={{
                marginTop: 5,
                fontSize: 20,
                fontFamily: Font.Gilroy_Bold,
                color: Color.white,
              }}>
              20% Discount
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 14,
                justifyContent: 'center',
                backgroundColor: Color.tertiary,
                width: 85,
                height: 40,
                borderRadius: 100,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Color.white,
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
                renderItem={({item}) => <CatBox item={item} navigation={navigation} />}
                numColumns={2}
                ListHeaderComponent={() => <Heading name={'Category'} showMore={true} showMoreLink={'Category'} />}
              />
            )}

            {[
              {heading: 'Featured', data_key: 'featured'},
              {heading: 'Latest', data_key: 'latest'},
              {heading: 'On Sale', data_key: 'onsale'},
            ].map((item, i) => (
              <>
                <Heading
                  key={i}
                  containerStyle={{marginTop: Window.fixPadding * 1.5}}
                  name={item.heading}
                  showMore={true}
                  showMoreLink={'ProductListing'}
                />
                {product && (
                  <FlatList
                    contentContainerStyle={{marginVertical: Window.fixPadding}}
                    data={product.all.edges}
                    renderItem={({item, index}) => (
                      <ProductBox wishlist={wishlist} customStyle={{width: Window.width / 2.3}} item={item} index={index} />
                    )}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{width: Window.fixPadding * 1.5}}></View>}
                  />
                )}
              </>
            ))}
            {/* Featured Product
          <View
            style={{
              marginTop: Window.fixPadding * 1.5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={GlobalStyle.heading}>Featured</Text>
            <TouchableOpacity>
              <Text style={GlobalStyle.showMoreStyle}>See All</Text>
            </TouchableOpacity>
          </View>
          <View>
            {product && (
              <FlatList
                contentContainerStyle={{marginVertical: Window.fixPadding}}
                data={product.all.edges}
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
          </View> */}
          </View>

          <View
            style={{
              padding: Window.fixPadding * 2,
              marginVertical: Window.fixPadding,
            }}>
            {/* Category List */}
            <View
              style={{
                marginTop: Window.fixPadding * 0.5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={GlobalStyle.heading}>Category</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Category')}>
                <Text style={GlobalStyle.showMoreStyle}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '100%'}}>
              {categories && (
                <FlatList
                  horizontal={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{marginVertical: Window.fixPadding}}
                  data={categories.categories.edges}
                  numColumns={2}
                  renderItem={item => <CatBoxCat navigation={navigation} item={item} />}
                />
              )}
            </View>

            {/* Featured Product List */}
            <View
              style={{
                marginTop: Window.fixPadding * 1.5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={GlobalStyle.heading}>Featured</Text>
              <TouchableOpacity>
                <Text style={GlobalStyle.showMoreStyle}>See All</Text>
              </TouchableOpacity>
            </View>
            <View>
              {product && (
                <FlatList
                  contentContainerStyle={{marginVertical: Window.fixPadding}}
                  data={product.featured.edges}
                  renderItem={({item, index}) => (
                    <ProductBox wishlist={wishlist} customStyle={{width: Window.width / 2.3}} item={item} index={index} />
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{width: Window.fixPadding * 1.5}}></View>}
                />
              )}
            </View>

            {/* Latest Product List */}
            <View
              style={{
                marginTop: Window.fixPadding * 1.5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={GlobalStyle.heading}>Latest</Text>
              <TouchableOpacity>
                <Text style={GlobalStyle.showMoreStyle}>See All</Text>
              </TouchableOpacity>
            </View>
            <View>
              {product && (
                <FlatList
                  contentContainerStyle={{marginVertical: Window.fixPadding}}
                  data={product.latest.edges}
                  renderItem={({item, index}) => (
                    <ProductBox wishlist={wishlist} customStyle={{width: Window.width / 2.3}} item={item} index={index} />
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{width: Window.fixPadding * 1.5}}></View>}
                />
              )}
            </View>

            {/* On Sale Product List */}
            <View
              style={{
                marginTop: Window.fixPadding * 1.5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={GlobalStyle.heading}>ONSALE</Text>
              <TouchableOpacity>
                <Text style={GlobalStyle.showMoreStyle}>See All</Text>
              </TouchableOpacity>
            </View>
            <View>
              {product && (
                <FlatList
                  contentContainerStyle={{marginVertical: Window.fixPadding}}
                  data={product.onsale.edges}
                  renderItem={({item, index}) => (
                    <ProductBox wishlist={wishlist} customStyle={{width: Window.width / 2.3}} item={item} index={index} />
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{width: Window.fixPadding * 1.5}}></View>}
                />
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
