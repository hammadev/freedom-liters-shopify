import {Platform, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hasNotch} from 'react-native-device-info';
import {Color, Font, GlobalStyle, Window} from '../globalStyle/Theme';
import AppBar from './AppBar';
import {NotLoginSvg} from '../assets/svgs/ProfileSvgs';
import Button from './Button';

const NotLogin = ({ShowBackButton = false}) => {
  return (
    <SafeAreaView
      style={{backgroundColor: '#F9F9F9', flex: 1}}
      edges={{
        top: 'maximum',
        right: 'maximum',
        left: 'maximum',
        bottom: hasNotch && Platform.OS === 'ios' ? '' : 'maximum',
      }}>
      <StatusBar animated={true} backgroundColor={'#F9F9F9'} barStyle={'dark-content'} showHideTransition={'fade'} />
      <View style={{paddingHorizontal: Window.fixPadding * 2, flex: 1}}>
        {ShowBackButton && <AppBar />}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <NotLoginSvg width={Window.width / 1.5} height={Window.height / 3} />
          <Text
            style={{
              color: Color.tertiary,
              fontFamily: Font.Urbanist_Bold,
              fontSize: 30,
              marginTop: 22,
            }}>
            Your are not login
          </Text>
          <Text
            style={{
              color: Color.tertiary,
              fontFamily: Font.Urbanist_Regular,
              fontSize: 16,
              textAlign: 'center',
              marginVertical: 12,
            }}>
            Please login to continue
          </Text>
          <Button text={'Go to login'} theme="tertiary" navLink="SignIn" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotLogin;

const styles = StyleSheet.create({});
