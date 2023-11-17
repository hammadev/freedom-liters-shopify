import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Keyboard, ImageBackground, SafeAreaView, useColorScheme} from 'react-native';
import Button from '../../../components/Button';
import {GlobalStyle, Color, Window} from '../../../globalStyle/Theme';
import styles from '../AuthStyle';
import {useDispatch} from 'react-redux';
import TextField2 from '../../../components/TextFeild2';
import {handleCreateAccessToken} from '../../../apis/auth';
import {CREATE_CUSTOMER_ACCESS_TOKEN} from '../../../graphql/mutations/Auth';
import {useMutation} from '@apollo/client';
import StatusAppBar from '../../../components/StatusAppBar';
import Toast from 'react-native-toast-message';
import {LogoSvg} from '../../../assets/svgs/Logo';

const SignIn = ({navigation}) => {
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const [createCustomerAccessToken, {loading, error, data}] = useMutation(CREATE_CUSTOMER_ACCESS_TOKEN);

  const handleSubmit = () => {
    Keyboard.dismiss();
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email == '' || password == '') {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Fields cannot be empty.',
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return;
    }

    if (!email.match(mailformat)) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Please enter valid email',
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return;
    }

    const input = {
      email,
      password,
    };
    handleCreateAccessToken(createCustomerAccessToken, input, dispatch, navigation);
  };
  const scheme = useColorScheme();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#021851'}}>
      <StatusAppBar />
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          paddingVertical: Window.fixPadding,
          paddingHorizontal: Window.fixPadding * 1.2,
          backgroundColor: 'none',
        }}
        source={require('../../../assets/images/pics/auth.bg.png')}>
        <Text
          onPress={() => navigation.navigate('BottomTabScreen')}
          style={{
            alignSelf: 'flex-end',
            color: scheme == 'dark' ? '#fff' : '#fff',
            fontSize: 15,
            paddingVertical: Window.fixPadding * 1.5,
            marginTop: 20,
          }}>
          Skip
        </Text>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <LogoSvg />
        </View>
        <Text
          style={{
            ...GlobalStyle.heading,
            color: Color.white,
            marginTop: Window.fixPadding * 3,
            marginBottom: Window.fixPadding * 3,
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
        <View style={{marginTop: 50, marginBottom: Window.fixPadding * 2}}>
          <Button text="Login" icon="mail" isIcon={false} theme="white" navLink="SignUp" loading={loading} onPressFunc={handleSubmit} />
        </View>
        <View style={{justifyContent: 'flex-end', flex: 1}}>
          <View style={{...styles.BottonContainer}}>
            <Text style={{...styles.TextStyle, color: Color.white}}>Don't have an account yet?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={{
                  ...styles.SecondTextStyle,
                  color: '#FBBC05',
                  paddingLeft: 5,
                }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;
