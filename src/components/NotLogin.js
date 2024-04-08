import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { hasNotch } from 'react-native-device-info';
import AppBar from './AppBar';
import { NotLoginSvg } from '../assets/svgs/ProfileSvgs';
import Button from './Button';
import { COLORS, CONTAINER_PADDING, FONTS, HEIGHT, WIDTH } from '../constants';

const NotLogin = ({ ShowBackButton = false }) => {
  return (
    <SafeAreaView
      style={styles.container}
      edges={{
        top: 'maximum',
        right: 'maximum',
        left: 'maximum',
        bottom: hasNotch && Platform.OS === 'ios' ? '' : 'maximum',
      }}>
      {ShowBackButton && <AppBar />}
      <View
        style={{
          paddingHorizontal: CONTAINER_PADDING,
        }}>
        <View style={{ alignSelf: 'center' }}>
          <NotLoginSvg width={WIDTH / 1.5} height={HEIGHT / 3} />
        </View>
        <Text style={styles.heading}>Your are not login</Text>
        <Text style={styles.subHeading}>Please login to continue</Text>
        <Button text={'Go to login'} type="primary" navLink="SignIn" />
      </View>
    </SafeAreaView>
  );
};

export default NotLogin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    color: COLORS.black,
    fontFamily: FONTS.bold,
    fontSize: 24,
    marginTop: 22,
    alignSelf: 'center',
  },
  subHeading: {
    color: COLORS.gryLight,
    fontFamily: FONTS.regular,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 12,
  },
});
