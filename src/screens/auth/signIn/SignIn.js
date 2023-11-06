import React, {useState} from 'react';
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
import {GlobalStyle, Color, Window, Font} from '../../../globalStyle/Theme';
import styles from '../AuthStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {showMessage} from 'react-native-flash-message';
import {signinReq} from '../../../apis/auth';
import {useDispatch} from 'react-redux';
import {LogoIcon, LogoSvg} from '../../../assets/svgs/Logo';
import TextField2 from '../../../components/TextFeild2';
import {handleCreateAccessToken} from '../../../apis/auth';
import {CREATE_CUSTOMER_ACCESS_TOKEN} from '../../../graphql/mutations/Auth';
import {useMutation} from '@apollo/client';
import AppBar from '../../../components/AppBar';

const SignIn = ({navigation}) => {
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const [createCustomerAccessToken, {loading, error, data}] = useMutation(
    CREATE_CUSTOMER_ACCESS_TOKEN,
  );

  const handleSubmit = () => {
    Keyboard.dismiss();
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email === '') {
      showMessage({
        message: "Email can't be blank",
        type: 'danger',
      });
      return;
    }

    if (!email.match(mailformat)) {
      showMessage({
        message: 'Please enter valid email',
        type: 'danger',
      });
      return;
    }

    if (password === '') {
      showMessage({
        message: "Password can't be blank",
        type: 'danger',
      });
      return;
    }

    if (password < 5) {
      showMessage({
        message: 'Password must contain at least 5 characters',
        type: 'danger',
      });
      return;
    }

    const input = {
      email,
      password,
    };

    handleCreateAccessToken(
      createCustomerAccessToken,
      input,
      dispatch,
      navigation,
    );

    // signinReq(
    //   {
    //     username: userName,
    //     password,
    //   },
    //   navigation,
    //   setLoading,
    //   dispatch,
    //   'BottomTabScreen',
    // );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#021851'}}>
      <StatusBar backgroundColor={Color.tertiary} barStyle={'light-content'} />

      <ScrollView
        contentContainerStyle={{justifyContent: 'center'}}
        keyboardShouldPersistTaps="handled"
        style={{flex: 1, paddingTop: Window.height / 10}}>
        <ImageBackground
          style={{
            ...GlobalStyle.Container,
            backgroundColor: '#021851',
            paddingVertical: Window.fixPadding * 2,
          }}
          source={require('../../../assets/images/pics/auth.bg.png')}>
          <View style={{alignItems: 'center'}}>
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
              icon={'email-outline'}
              label="Email"
              isDark={true}
              onChanged={setEmail}
              customStyle={{marginBottom: Window.fixPadding * 1.5}}
            />
            <TextField2
              icon={'lock-outline'}
              label="Password"
              isDark={true}
              onChanged={setPassword}
              passwordFeild={true}
              setHidePass={setHidePass}
              hidePass={hidePass}
              customStyle={{marginBottom: Window.fixPadding}}
            />
          </View>
          <TouchableOpacity
            style={{
              position: 'relative',
            }}
            onPress={() => navigation.navigate('ForgetPassword')}>
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
          <View style={{marginTop: 50, marginBottom: Window.fixPadding * 2}}>
            <Button
              text="Login"
              icon="mail"
              isIcon={false}
              theme="white"
              navLink="SignUp"
              loading={loading}
              onPressFunc={handleSubmit}
            />
            <View style={{marginVertical: Window.fixPadding * 2}}>
              <Button
                text="Continue without login"
                icon="mail"
                isIcon={false}
                theme="secondary"
                navLink="BottomTabScreen"
              />
            </View>
          </View>
          <View style={{...styles.BottonContainer, marginBottom: 50}}>
            <Text style={{...styles.TextStyle, color: Color.white}}>
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
    </SafeAreaView>
  );
};

export default SignIn;
