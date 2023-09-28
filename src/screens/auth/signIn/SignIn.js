import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Keyboard,
  ImageBackground,
} from 'react-native';
import Button from '../../../components/Button';
import TextField from '../../../components/TextFeild';
import { GlobalStyle, Color, Window, Font } from '../../../globalStyle/Theme';
import styles from '../AuthStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { showMessage } from 'react-native-flash-message';
import { signinReq } from '../../../apis/auth';
import { useDispatch } from 'react-redux';
import { EmailSvg } from '../../../assets/svgs/AuthSvg';
import { LogoIcon, LogoSvg } from '../../../assets/svgs/Logo';
import TextField2 from '../../../components/TextFeild2';

const SignIn = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (userName === '') {
      showMessage({
        message: 'Please enter username',
        type: 'danger',
      });
      return;
    }
    if (password === '') {
      showMessage({
        message: 'Please enter password',
        type: 'danger',
      });
      return;
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex.test(password)) {
      showMessage({
        message: 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.',
        type: 'danger',
      });
      return;
    }

    signinReq(
      {
        username: userName,
        password,
      },
      navigation,
      setLoading,
      dispatch,
      'BottomTabScreen',
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#021851' }}>
      <StatusBar backgroundColor={Color.tertiary} barStyle={'light-content'} />


      <ScrollView
        contentContainerStyle={{ justifyContent: 'center', }}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1, paddingTop: Window.height / 10 }}
      >
        <ImageBackground
          style={{ ...GlobalStyle.Container, backgroundColor: '#021851', paddingVertical: Window.fixPadding * 2 }}
          source={require('../../../assets/images/pics/auth.bg.png')}>
          <View style={{ alignItems: 'center' }}>
            <LogoSvg />
          </View>
          <Text
            style={{
              ...GlobalStyle.heading,
              color: Color.white,
              marginTop: Window.fixPadding * 4,
              marginBottom: Window.fixPadding * 1.5,
            }}>
            Sign In
          </Text>

          <View>
            <TextField2
              icon={'account-circle-outline'}
              label="Username"
              isDark={true}
              onChanged={setUserName}
              customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
            />
            <TextField2
              icon={'lock-outline'}
              label="Password"
              isDark={true}
              onChanged={setPassword}
              passwordFeild={true}
              setHidePass={setHidePass}
              hidePass={hidePass}
              customStyle={{ marginBottom: Window.fixPadding }}
            />
          </View>
          <TouchableOpacity
            style={{
              position: 'relative',
            }}
            onPress={() => navigation.navigate('CodeVerification')}
          >
            <Text
              style={{
                paddingTop: 5,
                fontFamily: Font.Gilroy_SemiBold,
                color: '#FBBC05',
                fontSize: 13,
                position: 'absolute',
                right: 0,
              }}>
              Forget Password?
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 50, marginBottom: Window.fixPadding * 2 }}>
            <Button
              text="Login"
              icon="mail"
              isIcon={false}
              theme="white"
              navLink="SignUp"
              loading={loading}
              onPressFunc={handleSubmit}
            />
            <Button
              text="Continue without login"
              icon="mail"
              isIcon={false}
              theme="secondary"
              navLink="BottomTabScreen"
              loading={loading}
            />
          </View>
          <View style={{ ...styles.BottonContainer }}>
            <Text style={{ ...styles.TextStyle, color: Color.white }}>
              Don’t have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={{
                  ...styles.SecondTextStyle,
                  color: '#FBBC05',
                  paddingLeft: 5,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView >
  );
};

export default SignIn;
