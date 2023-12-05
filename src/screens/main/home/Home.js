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
import {COLORS, CONTAINER_PADDING, FONTS, HEIGHT} from '../../../constants';
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
    <View style={styles.container}>
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
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}
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

          {/* Featured Product List */}
          <SeactionRow
            heading="Featured"
            onPressLeft={() => {
              navigation.navigate('ProductListing', {
                value: 1,
                title: 'Featured',
              });
            }}
          />

          {product && (
            <FlatList
              contentContainerStyle={{paddingHorizontal: CONTAINER_PADDING}}
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
              ItemSeparatorComponent={() => <View style={{width: 10}} />}
            />
          )}

          {/* Latest Product List */}
          <SeactionRow
            heading="Latest"
            onPressLeft={() => {
              navigation.navigate('ProductListing', {
                value: 2,
                title: 'Latest',
              });
            }}
          />
          {product && (
            <FlatList
              contentContainerStyle={{paddingHorizontal: CONTAINER_PADDING}}
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
              ItemSeparatorComponent={() => <View style={{width: 10}} />}
            />
          )}

          {/* On Sale Product List */}
          <SeactionRow
            heading="ONSALE"
            onPressLeft={() => {
              navigation.navigate('ProductListing', {
                value: 3,
                title: 'ONSALE',
              });
            }}
          />
          {product && (
            <FlatList
              contentContainerStyle={{paddingHorizontal: CONTAINER_PADDING}}
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
              ItemSeparatorComponent={() => <View style={{width: 10}} />}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {backgroundColor: COLORS.white, flex: 1},
  heading: {
    fontSize: 14,
    fontFamily: FONTS.heading,
    color: COLORS.tertiary,
    textTransform: 'capitalize',
  },
  seeAll: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.secondary,
    textTransform: 'capitalize',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CONTAINER_PADDING,
    marginVertical: 25,
  },
});

const SeactionRow = ({onPressLeft, heading}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.seeAll} onPress={onPressLeft}>
        See all
      </Text>
    </View>
  );
};
