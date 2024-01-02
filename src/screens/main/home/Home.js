import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Platform,
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
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';
import {
  FlatList,
  PanGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler';

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
  const [open, setOpen] = useState(false);
  const [SearchVale, setSearcValue] = useState(false);
  const insets = useSafeAreaInsets();

  const {product} = useSelector(state => ({
    ...state,
  }));
  const subscription = BackHandler.addEventListener(
    'hardwareBackPress',
    onBackPress,
  );
  subscription.remove();
  const onBackPress = () => {
    setSearcValue(false);
  };
  //ANIMATED GESTURES ====> START
  const handleScroll = e => {
    if (e.nativeEvent.contentOffset.y > 1) {
      setOpen(true);
      progress.value = withTiming(
        Platform.OS === 'ios'
          ? HEIGHT - insets.top - (insets.bottom + 60)
          : HEIGHT - 60 + insets.bottom,
      );
    } else if (e.nativeEvent.contentOffset.y < 1) {
      setOpen(false);
      progress.value = withTiming(
        Platform.OS === 'ios'
          ? HEIGHT / 1.5 - (insets.top - insets.bottom) - 15
          : HEIGHT / 1.5 + 10,
      );
    }
  };
  const progress = useSharedValue(
    Platform.OS === 'ios'
      ? HEIGHT / 1.5 - (insets.top - insets.bottom) - 15
      : HEIGHT / 1.5 + 10,
  );
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      height: progress.value,
    };
  }, []);
  const translateY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: event => {
      if (event.translationY < 0) {
        // Swipe up detected, perform desired action
        runOnJS(setOpen)(true);
        progress.value = withTiming(
          Platform.OS === 'ios'
            ? HEIGHT - insets.top - (insets.bottom + 60)
            : HEIGHT - 60 + insets.bottom,
        );

        // You can trigger a callback or perform any other logic here
      } else {
        runOnJS(setOpen)(false);
        progress.value = withTiming(
          Platform.OS === 'ios'
            ? HEIGHT / 1.5 - (insets.top - insets.bottom) - 15
            : HEIGHT / 1.5 + 10,
        );
      }

      // Add any additional handling for other directions if needed
    },
  });
  //ANIMATED GESTURES ====> END
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={'light-content'}
        showHideTransition={'fade'}
        translucent
      />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Banner />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[reanimatedStyle, styles.card]}>
            <ScrollView
              style={{flex: 1}}
              contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              onMomentumScrollBegin={handleScroll}>
              {/* Featured Product List */}
              <SeactionRow
                heading="Dresses"
                onPressLeft={() => {
                  navigation.navigate('ProductListing', {
                    value: 1,
                    title: 'Featured',
                  });
                }}
              />
              {product.featured && (
                <FlatList
                  contentContainerStyle={{paddingHorizontal: CONTAINER_PADDING}}
                  data={product.featured?.edges}
                  renderItem={({item, index}) => (
                    <ProductBox item={item} index={index} />
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{width: 10}} />}
                />
              )}
              {/* On Sale Product List */}
              <SeactionRow
                heading="Bags"
                onPressLeft={() => {
                  navigation.navigate('ProductListing', {
                    value: 3,
                    title: 'ONSALE',
                  });
                }}
              />
              {product.onsale && (
                <FlatList
                  contentContainerStyle={{paddingHorizontal: CONTAINER_PADDING}}
                  data={product.onsale.edges}
                  renderItem={({item, index}) => (
                    <ProductBox item={item} index={index} />
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
              {product.latest && (
                <FlatList
                  contentContainerStyle={{paddingHorizontal: CONTAINER_PADDING}}
                  data={product.latest?.edges}
                  renderItem={({item, index}) => (
                    <ProductBox item={item} index={index} />
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{width: 10}} />}
                />
              )}
            </ScrollView>
          </Animated.View>
        </PanGestureHandler>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {backgroundColor: COLORS.white, flex: 1},
  card: {
    backgroundColor: COLORS.white,
    // height: HEIGHT / 1.17 - 60,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    overflow: 'hidden',
    // marginTop: Window.fixPadding * 2,
    elevation: 10,
    justifyContent: 'flex-end',
  },
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
