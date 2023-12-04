import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import {Color, GlobalStyle, Window} from '../../../globalStyle/Theme';

import SearchBar from '../../../components/SearchBar';
import {useSelector} from 'react-redux';
import {BackHandler} from 'react-native';
import ProductBox from '../product/_partials/ProductBox';
import {StatusBar} from 'react-native';
import Banner from './Banner';
import {COLORS, HEIGHT} from '../../../constants';
import {useRef} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';

export const CatBox = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductListing', {catId: item.id})}>
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
  const [SearchVale, setSearcValue] = useState(false);
  const [statusBarContent, setStatusBarContent] = useState('light-content');
  const [statusBarBg, setStatusBarBg] = useState('transparent');
  const {product, wishlist} = useSelector(state => ({
    ...state,
  }));
  const isFocused = useIsFocused();
  const subscription = BackHandler.addEventListener(
    'hardwareBackPress',
    onBackPress,
  );
  subscription.remove();
  const onBackPress = () => {
    setSearcValue(false);
  };
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setStatusBarContent('light-content');
    setStatusBarBg('transparent');
  }, [isFocused]);

  return (
    <View style={{backgroundColor: Color.light, flex: 1}}>
      <StatusBar
        backgroundColor={statusBarBg}
        translucent={false}
        barStyle={statusBarContent}
        showHideTransition="fade"
        animated
      />
      {SearchVale ? (
        <SearchBar />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
            {
              listener: event => {
                if (event.nativeEvent.contentOffset.y > HEIGHT / 3) {
                  setStatusBarContent(
                    Platform.OS === 'android'
                      ? 'light-content'
                      : 'dark-content',
                  );
                  setStatusBarBg(COLORS.primary);
                } else {
                  setStatusBarContent('light-content');
                  setStatusBarBg('transparent');
                }
              },
            },
            {useNativeDriver: false},
          )}>
          <Banner />

          <View
            style={{
              padding: Window.fixPadding * 2,
              marginVertical: Window.fixPadding,
            }}>
            {/* Featured Product List */}
            <View style={styles.heading}>
              <Text style={GlobalStyle.heading}>Featured</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductListing', {
                    value: 1,
                    title: 'Featured',
                  })
                }>
                <Text style={GlobalStyle.showMoreStyle}>See All</Text>
              </TouchableOpacity>
            </View>

            <View>
              {product && (
                <FlatList
                  contentContainerStyle={{marginVertical: Window.fixPadding}}
                  data={product.featured.edges}
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
            </View>

            {/* Latest Product List */}
            <View style={styles.heading}>
              <Text style={GlobalStyle.heading}>Latest</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductListing', {
                    value: 2,
                    title: 'Latest',
                  })
                }>
                <Text style={GlobalStyle.showMoreStyle}>See All</Text>
              </TouchableOpacity>
            </View>

            <View>
              {product && (
                <FlatList
                  contentContainerStyle={{marginVertical: Window.fixPadding}}
                  data={product.latest.edges}
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
            </View>

            {/* On Sale Product List */}
            <View style={styles.heading}>
              <Text style={GlobalStyle.heading}>ONSALE</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductListing', {
                    value: 3,
                    title: 'ONSALE',
                  })
                }>
                <Text style={GlobalStyle.showMoreStyle}>See All</Text>
              </TouchableOpacity>
            </View>

            <View>
              {product && (
                <FlatList
                  contentContainerStyle={{marginVertical: Window.fixPadding}}
                  data={product.onsale.edges}
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
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  heading: {
    marginTop: Window.fixPadding * 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
