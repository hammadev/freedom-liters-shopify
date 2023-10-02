import { ImageBackground, SafeAreaView, StatusBar, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color, GlobalStyle, Window } from '../globalStyle/Theme';
import { LogoSvg } from '../assets/svgs/Logo';
import { SkypeIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signinReq } from '../apis/auth';
import {useDispatch} from 'react-redux';
import {gql, useQuery} from '@apollo/client';
import {GET_LATEST_PRODUCT} from '../graphql/queries/Product';
import {GET_COLLECTION} from '../graphql/queries/Collection';
import {Checkout} from '../graphql/queries/Orders';

const Splash = ({navigation}) => {
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Fetch the first query (GET_LATEST_PRODUCT)
  const {
    loading: latestProductLoading,
    error: latestProductError,
    data: latestProductData,
  } = useQuery(GET_LATEST_PRODUCT);

  // Fetch the second query (GET_COLLECTION)
  const {
    loading: collectionLoading,
    error: collectionError,
    data: collectionData,
  } = useQuery(GET_COLLECTION);
  // const { loading, error, data } = useQuery(GET_COLLECTION);

  // Fetch the third query (GET_COLLECTION)

  // const {
  //   loading: checkoutLoading,
  //   error: checkoutError,
  //   data: checkoutData,
  // } = useQuery(Checkout);

  // const {
  //   loading: checkoutLoading,
  //   error: checkoutError,
  //   data: checkoutData,
  // } = useQuery(Checkout);

  useEffect(() => {
    if (!latestProductLoading && !latestProductError && latestProductData) {
      // Dispatch an action to store the latest product data in Redux
      dispatch({
        type: 'PRODUCTS',
        Payload: latestProductData.products,
      });
    }

    if (!collectionLoading && !collectionError && collectionData) {
      // Dispatch an action to store the collection data in Redux
      dispatch({
        type: 'CATEGORIES',
        Payload: collectionData.collections,
      });
    }

    // Check if both sets of data have been successfully fetched and stored in Redux
    if (!latestProductLoading && !collectionLoading) {
      // Navigate to the next screen (replace 'BottomTabScreen' with your desired destination)
      navigation.replace('BottomTabScreen');
    }
  }, [
    latestProductLoading,
    latestProductError,
    latestProductData,
    collectionLoading,
    collectionError,
    collectionData,
    dispatch,
    navigation,
  ]);

  const checkUser = async () => {
    const timer = setTimeout(async () => {
      await AsyncStorage.getItem('credentials').then(async res => {
        if (res) {
          let parsedRes = JSON.parse(res);
          signinReq(
            {
              username: parsedRes.username,
              password: parsedRes.password,
            },
            navigation,
            setLoading,
            dispatch,
            'BottomTabScreen',
            1,
          );
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

  // if (loading) {
  //   return <Text>Loading...</Text>;
  // }

  // if (error) {
  //   return <Text>Error: {error.message}</Text>;
  // }

  // const product  s = data.products.edges;
  // console.log('Fetched products:', data.products.edges);

  return (
    // <SafeAreaView style={{...GlobalStyle.Container}}>
    <>
      <StatusBar backgroundColor={Color.tertiary} barStyle={'light-content'} />
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
              // justifyContent: 'center',
              top: Window.height / 1.8,
              // alignItems: 'center',
              left: 0,
              right: 0,
            }}>
            {collectionLoading && (
              <SkypeIndicator size={50} color={Color.white} />
            )}
          </View>
        </View>
      </ImageBackground>
    </>
    // </SafeAreaView>
  );
};

export default Splash;
