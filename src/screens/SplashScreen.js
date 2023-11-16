import {ImageBackground, StatusBar, View} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Window} from '../globalStyle/Theme';
import {LogoSvg} from '../assets/svgs/Logo';
import {SkypeIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {useQuery} from '@apollo/client';
import {GET_FEATURED_PRODUCT, GET_LATEST_PRODUCT, GET_ONSALE_PRODUCT} from '../graphql/queries/Product';
import {GET_CATEGORIES} from '../graphql/queries/Category';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();

  // Fetch the second query (GET_FEATURED_PRODUCT)
  const {loading: featuredProductLoading, error: featuredProductError, data: featuredProductData} = useQuery(GET_FEATURED_PRODUCT);

  // Fetch the first query (GET_LATEST_PRODUCT)
  const {loading: latestProductLoading, error: latestProductError, data: latestProductData} = useQuery(GET_LATEST_PRODUCT);

  // Fetch the first query (GET_LATEST_PRODUCT)
  const {loading: onsaleProductLoading, error: onsaleProductError, data: onsaleProductData} = useQuery(GET_ONSALE_PRODUCT);

  // Fetch the first query (GET_LATEST_PRODUCT)
  const {loading: categoriesLoading, error: categoriesError, data: categoriesData} = useQuery(GET_CATEGORIES);
  console.log('catt', categoriesData);
  useEffect(() => {
    if (!categoriesLoading && !categoriesError && categoriesData) {
      // Dispatch an action to store the categories data in Redux
      dispatch({
        type: 'CATEGORIES',
        Payload: categoriesData.collections,
      });
    }
    if (!featuredProductLoading && !featuredProductError && featuredProductData) {
      // Dispatch an action to store the latest product data in Redux
      dispatch({
        type: 'FEATURED_PRODUCTS',
        Payload: featuredProductData.products,
      });
    }
    if (!latestProductLoading && !latestProductError && latestProductData) {
      // Dispatch an action to store the latest product data in Redux
      dispatch({
        type: 'LATEST_PRODUCTS',
        Payload: latestProductData.products,
      });
    }

    if (!onsaleProductLoading && !onsaleProductError && onsaleProductData) {
      // Dispatch an action to store the collection data in Redux
      dispatch({
        type: 'ONSALE_PRODUCTS',
        Payload: onsaleProductData.products,
      });
    }

    // Check if both sets of data have been successfully fetched and stored in Redux
    if (!latestProductLoading && !onsaleProductLoading && !featuredProductLoading) {
      checkUser();
    }
  }, [
    categoriesLoading,
    categoriesError,
    categoriesData,
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
      <StatusBar backgroundColor={Color.tertiary} barStyle={'light-content'} />
      <ImageBackground style={{flex: 1}} source={require('../assets/images/pics/splash_bg.png')}>
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
            {featuredProductLoading && latestProductLoading && onsaleProductLoading && categoriesLoading && (
              <SkypeIndicator size={50} color={Color.white} />
            )}
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Splash;
