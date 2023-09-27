import { ImageBackground, SafeAreaView, StatusBar, View } from 'react-native';
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

const Splash = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // navigation.replace('SignIn');
    Promise.all([
      CategoriesReq(dispatch),
      ProductListingReq(dispatch, 'featured'),
      ProductListingReq(dispatch, 'onsale'),
      ProductListingReq(dispatch, 'latest'),
      ProductListingReq(dispatch),
      GeneralSettings(dispatch),
    ]
    );
    checkUser();
    return () => setLoading(false);
  }, []);

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
