import React, { useRef, useState } from 'react';
import { View, Text, Platform, ImageBackground, StatusBar } from 'react-native';
import Button from '../../../components/Button';
import { Color, Font, GlobalStyle, Window } from '../../../globalStyle/Theme';
import PopularProducts from './_partials/PopularProducts';
import Heading from '../../../components/Heading';
import RenderHtml from 'react-native-render-html';
import BottomPopupHOC from '../../../components/BottomPopupHOC';
import VariationsDetails from '../../../components/VariationsDetails';
import { hasNotch } from 'react-native-device-info';
import { StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import {
  ADD_MORE_ITEM,
  CREATE_CART_ADD_ONE_ITEM,
} from '../../../graphql/mutations/Cart';
import { handleCreateCart } from '../../../apis/cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import { useEffect } from 'react';
import {
  PanGestureHandler,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { COLORS, CONTAINER_PADDING, FONTS, HEIGHT } from '../../../constants';
import BackButton from '../../../components/BackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ColorCheckSvg } from '../../../assets/svgs/CartSvg';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';

const ProductDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const ref = useRef(null);
  const isFocused = useIsFocused();
  const [ProductImages, setProductImages] = useState(null);
  const [loadingSpinner, setloadingSpinner] = useState(false);
  const [selectedColor, setselectedColor] = useState(null);
  const [selectedSize, setselectedSize] = useState(null);
  const [NewPrice, setNewPrice] = useState(null);
  const [NewArr, setNewArr] = useState([]);
  const [allSizes, setAllSizes] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const insets = useSafeAreaInsets();
  const [cartCreate] = useMutation(CREATE_CART_ADD_ONE_ITEM);
  const [cartLinesAdd] = useMutation(ADD_MORE_ITEM);
  const [open, setOpen] = useState(false);
  const [allSizesIndex, setAllSizesIndex] = useState(null);
  const [allColorsIndex, setAllColorsIndex] = useState(null);



  //ANIMATED GESTURES ====> START
  const handleScroll = e => {
    if (e.nativeEvent.contentOffset.y > 1) {
      setOpen(true);
      progress.value = withTiming(
        Platform.OS === 'ios' ? HEIGHT - insets.top : HEIGHT,
      );
    } else if (e.nativeEvent.contentOffset.y < 1) {
      setOpen(false);
      progress.value = withTiming(
        Platform.OS === 'ios' ? HEIGHT / 1.5 + 25 : HEIGHT / 1.5 + 75,
      );
    }
  };
  const progress = useSharedValue(
    Platform.OS === 'ios' ? HEIGHT / 1.5 + 25 : HEIGHT / 1.5 + 75,
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
          Platform.OS === 'ios' ? HEIGHT - insets.top : HEIGHT,
        );

        // You can trigger a callback or perform any other logic here
      } else {
        runOnJS(setOpen)(false);
        progress.value = withTiming(
          Platform.OS === 'ios' ? HEIGHT / 1.5 + 25 : HEIGHT / 1.5 + 75,
        );
      }

      // Add any additional handling for other directions if needed
    },
  });
  //ANIMATED GESTURES ====> END


  const designNow = () => {
    navigation.navigate('CustomDesign')
  }
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
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <ImageBackground
          resizeMode="cover"
          source={item.image}
          style={styles.productImage}>
          <View style={[styles.overlay, { paddingTop: insets.top + 10 }]}>
            <BackButton type="secondary" />
          </View>
        </ImageBackground>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[reanimatedStyle, styles.card]}>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              onMomentumScrollBegin={handleScroll}>
              <View
                style={{
                  paddingHorizontal: CONTAINER_PADDING,
                }}>
                <View style={styles.row}>
                  <Text style={styles.heading}>{item.title}</Text>

                  <Text style={styles.price}>
                    $150
                  </Text>
                </View>
                {allSizes.length > 0 && (
                  <>
                    <Text style={[styles.subHeading, { marginTop: 10 }]}>
                      Sizes
                    </Text>

                    <ScrollView
                      style={{
                        marginVertical: 15,
                        borderRadius: 10,
                        overflow: 'hidden',
                      }}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                      {/* {allSizes.map((item, index) => (
                        <TouchableOpacity
                          onPress={() => HandleSize(item)}
                          key={index}
                          style={[
                            styles.sizeBox,
                            {
                              backgroundColor:
                                selectedSize === item
                                  ? COLORS.primary
                                  : '#FAF7F1',
                              marginLeft: index === 0 ? 0 : 5,
                              marginRight: index === allSizes.length ? 0 : 5,
                            },
                          ]}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily:
                                selectedSize === item
                                  ? FONTS.semiBold
                                  : FONTS.light,
                              color:
                                selectedSize === item
                                  ? COLORS.white
                                  : COLORS.secondary,
                            }}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))} */}
                    </ScrollView>
                  </>
                )}
                {allColors.length > 0 && (
                  <>
                    <Text style={[styles.subHeading, { marginTop: 0 }]}>
                      Colors
                    </Text>

                    <ScrollView
                      style={{
                        marginVertical: 15,
                        borderRadius: 35,
                        overflow: 'hidden',
                      }}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                      {/* {allColors.map((item, index) => (
                        <TouchableOpacity
                          onPress={() => HandleColor(item)}
                          key={index}
                          style={[
                            styles.sizeBox,
                            {
                              backgroundColor:
                                selectedColor === item
                                  ? COLORS.primary
                                  : '#FAF7F1',
                              marginLeft: index === 0 ? 0 : 5,
                              marginRight: index === allColors.length ? 0 : 5,
                            },
                          ]}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily:
                                selectedColor === item
                                  ? FONTS.semiBold
                                  : FONTS.light,
                              color:
                                selectedColor === item
                                  ? COLORS.white
                                  : COLORS.secondary,
                            }}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))} */}
                    </ScrollView>
                  </>
                )}
                <View style={styles.border} />

                <Text style={[styles.heading, { marginTop: 10 }]}>
                  Description
                </Text>
                <Text style={{ marginTop: 10, textAlign: 'justify', fontSize: 16 }}>
                  {item.description}
                </Text>
                {/* 
                <RenderHtml
                  systemFonts={[FONTS.regular]}
                  tagsStyles={{
                    p: {
                      color: COLORS.secondary,
                      fontFamily: FONTS.regular,
                      fontSize: 12,
                      lineHeight: 14,
                      letterSpacing: -0.3,
                    },
                    iframe: {
                      display: 'none',
                    },
                  }}
                  contentWidth={Window.width}
                  source={{html: product.node.descriptionHtml}}
                /> */}

                <View style={styles.border} />
                <Text style={[styles.heading, { marginTop: 10 }]}>Latest</Text>
              </View>
              <PopularProducts />
            </ScrollView>
            <View
              style={[
                styles.bottomButtonContainer,
                { paddingBottom: insets.bottom + 15 },
              ]}>
              <Button
                onPressFunc={designNow}
                type="primary"
                loading={loadingSpinner}
                text="Design Now"
              />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </ScrollView>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.white, flex: 1 },
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 10,
  },
  heading: { fontSize: 14, color: COLORS.tertiary, fontFamily: FONTS.heading },
  subHeading: {
    fontSize: 14,
    color: COLORS.tertiary,
    fontFamily: FONTS.semiBold,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: CONTAINER_PADDING,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  border: { height: 1, backgroundColor: '#080E1E0D', marginVertical: 10 },
  productImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: Window.height / 3,
  },
  price: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.tertiary,
  },
  sizeBox: {
    // width: 100,
    paddingHorizontal: 15,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorBox: {
    height: 35,
    width: 35,
    borderRadius: 35,
    // opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  ProductSize: {
    width: 100,
    padding: 5,
    borderRadius: 15,
    marginRight: 8,
    marginTop: 10,
  },
  ProductColor: {
    width: 35,
    height: 35,
    padding: 5,
    borderRadius: 10,
    marginRight: 8,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonContainer: {
    backgroundColor: COLORS.white,
    paddingTop: 15,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5.84,
    elevation: 12,
    paddingHorizontal: CONTAINER_PADDING,
  },
});
