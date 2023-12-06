import {ImageBackground, StatusBar, View} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Window} from '../globalStyle/Theme';
import {LogoSvg} from '../assets/svgs/Logo';
import {SkypeIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {useQuery} from '@apollo/client';
import {
  GET_FEATURED_PRODUCT,
  GET_LATEST_PRODUCT,
  GET_ONSALE_PRODUCT,
} from '../graphql/queries/Product';
import {GET_ALL_CATEGORIES, GET_CATEGORIES} from '../graphql/queries/Category';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();

  // (GET_FEATURED_PRODUCT)
  const {
    loading: featuredProductLoading,
    error: featuredProductError,
    data: featuredProductData,
  } = useQuery(GET_FEATURED_PRODUCT);

  // (GET_LATEST_PRODUCT)
  const {
    loading: latestProductLoading,
    error: latestProductError,
    data: latestProductData,
  } = useQuery(GET_LATEST_PRODUCT);

  // (GET_ONSALE_PRODUCT)
  const {
    loading: onsaleProductLoading,
    error: onsaleProductError,
    data: onsaleProductData,
  } = useQuery(GET_ONSALE_PRODUCT);

  // (GET_ALL_CATEGORIES)
  const {
    loading: allcategoriesLoading,
    error: allcategoriesError,
    data: allcategoriesData,
  } = useQuery(GET_ALL_CATEGORIES);

  useEffect(() => {
    if (!allcategoriesLoading && !allcategoriesError && allcategoriesData) {
      // Dispatch All categories data in Redux
      dispatch({
        type: 'ALL_CATEGORIES',
        Payload: allcategoriesData.collections,
      });
    }

    if (
      !featuredProductLoading &&
      !featuredProductError &&
      featuredProductData
    ) {
      // Dispatch Featrued product data in Redux
      dispatch({
        type: 'FEATURED_PRODUCTS',
        Payload: featuredProductData.products,
      });
    }
    if (!latestProductLoading && !latestProductError && latestProductData) {
      // Dispatch latest product data in Redux
      dispatch({
        type: 'LATEST_PRODUCTS',
        Payload: latestProductData.products,
      });
    }

    if (!onsaleProductLoading && !onsaleProductError && onsaleProductData) {
      // Dispatch Onsale data in Redux
      dispatch({
        type: 'ONSALE_PRODUCTS',
        Payload: onsaleProductData.products,
      });
    }

    // Check if both sets of data have been successfully fetched and stored in Redux
    if (
      !latestProductLoading &&
      !onsaleProductLoading &&
      !featuredProductLoading
    ) {
      checkUser();
    }
  }, [
    featuredProductLoading,
    featuredProductError,
    featuredProductData,
    latestProductLoading,
    latestProductError,
    latestProductData,
    onsaleProductLoading,
    onsaleProductError,
    onsaleProductData,
    dispatch,
    navigation,
  ]);

  const checkUser = async () => {
    const timer = setTimeout(async () => {
      await AsyncStorage.getItem('auth').then(async res => {
        if (res) {
          let parsedRes = JSON.parse(res);
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: parsedRes,
          });
          navigation.replace('BottomTabScreen');
        } else {
          try {
            const check = await AsyncStorage.getItem('onBoardCompleted');
            if (check !== null) {
              navigation.replace('SignIn');
            } else {
              navigation.replace('OnBoarding');
            }
          } catch (e) {
            console.log(e);
          }
        }
      });
    }, 1000);
    return () => clearTimeout(timer);
  };

  return (
    <>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={'light-content'}
        showHideTransition={'fade'}
        translucent
      />
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/images/pics/splash_bg.png')}>
        <View
          style={{
            flex: 0.9,
            justifyContent: 'flex-end',
            paddingLeft: 24,
          }}>
          <LogoSvg />
          <View
            style={{
              position: 'absolute',
              top: Window.height / 1.8,
              left: 0,
              right: 0,
            }}>
            {featuredProductLoading &&
              latestProductLoading &&
              onsaleProductLoading && (
                <SkypeIndicator size={50} color={Color.white} />
              )}
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Splash;
