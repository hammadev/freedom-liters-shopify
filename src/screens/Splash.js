import { ImageBackground, SafeAreaView, StatusBar, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color, GlobalStyle, Window } from '../globalStyle/Theme';
import { LogoSvg } from '../assets/svgs/Logo';
import { SkypeIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signinReq } from '../apis/auth';
import { useDispatch } from 'react-redux';
import { CategoriesReq } from '../apis/categories';
import { ProductListingReq } from '../apis/product';
import { GeneralSettings } from '../apis/general_settings';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { GET_LATEST_PRODUCT } from '../graphql/queries/Product';

const Splash = ({ navigation }) => {
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_LATEST_PRODUCT);



  useEffect(() => {
    if (!loading && !error && data) {
      dispatch({
        type: 'PRODUCTS',
        Payload: data.products,
      })
      navigation.replace('BottomTabScreen');
    }
    // navigation.replace('SignIn');
    // Promise.all([
    //   CategoriesReq(dispatch),
    //   ProductListingReq(dispatch, 'featured'),
    //   ProductListingReq(dispatch, 'onsale'),
    //   ProductListingReq(dispatch, 'latest'),
    //   ProductListingReq(dispatch),
    //   GeneralSettings(dispatch),
    // ]
    // );
    // checkUser();
    // return () => setLoading(false);
  }, [loading, error, data, dispatch]);

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

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  // const product  s = data.products.edges;
  console.log('Fetched products:', data.products.edges);

  return (
    // <SafeAreaView style={{...GlobalStyle.Container}}>
    <>
      <StatusBar backgroundColor={Color.tertiary} barStyle={'light-content'} />
      <ImageBackground
        style={{ flex: 1 }}
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
            {loading && <SkypeIndicator size={50} color={Color.white} />}
          </View>
        </View>
      </ImageBackground>
    </>
    // </SafeAreaView>
  );
};

export default Splash;
