import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import Button from '../../../components/Button';
import {GlobalStyle, Color, Window} from '../../../globalStyle/Theme';
import styles from '../AuthStyle';
import AppBar from '../../../components/AppBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextField2 from '../../../components/TextFeild2';
import {CREATE_CUSTOMER_ACCOUNT} from '../../../graphql/mutations/Auth';
import {useMutation} from '@apollo/client';
import {handleCreateAccount} from '../../../apis/auth';
import Toast from 'react-native-toast-message';
import StatusAppBar from '../../../components/StatusAppBar';

const SignUp = ({navigation}) => {
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [createCustomerAccount, {loading, error, data}] = useMutation(CREATE_CUSTOMER_ACCOUNT);
  const handleSubmit = () => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordformat = /^\w+(?:[ `'?!]\w+)*[`.?!]?$/;

    if (firstName == '' || lastName == '' || password == '' || confirmPassword == '') {
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

    if (!password.match(passwordformat)) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Atleast one special character in password',
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return;
    }

    if (password < 5) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Password must contain at least 5 characters',
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Password & confirm password not match',
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return;
    }

    const variables = {
      input: {
        acceptsMarketing: true,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        phone: phone,
      },
    };
    handleCreateAccount(createCustomerAccount, variables, navigation);
  };
  const Goto_Login = () => {
    navigation.replace('SignIn');
  };
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
        <ScrollView>
          <AppBar right={'Skip'} onPressFunc={Goto_Login} theme={'dark'} />
          <Text
            style={{
              ...GlobalStyle.heading,
              color: Color.white,
              marginVertical: Window.fixPadding * 2,
            }}>
            Sign Up
          </Text>

          <View style={{marginTop: Window.fixPadding}}>
            <TextField2
              icon={'account-circle-outline'}
              label="First Name"
              placeholder={'Doe'}
              isDark={true}
              onChanged={setFirstName}
              customStyle={{marginBottom: Window.fixPadding * 1.5}}
            />
            <TextField2
              icon={'account-circle-outline'}
              label="Last Name"
              placeholder={'john'}
              isDark={true}
              onChanged={setLastName}
              customStyle={{marginBottom: Window.fixPadding * 1.5}}
            />
            <TextField2
              icon={'email-outline'}
              label="Email"
              placeholder={'Email@gmail.com'}
              isDark={true}
              onChanged={setEmail}
              customStyle={{marginBottom: Window.fixPadding * 1.5}}
            />

            <TextField2
              icon={'phone-outline'}
              label="Phone"
              value={phone}
              placeholder={'+923X-XXXXXXXX'}
              isDark={true}
              onChanged={setPhone}
              customStyle={{marginBottom: Window.fixPadding * 1.5}}
            />

            <TextField2
              icon={'lock-outline'}
              label="Password"
              placeholder={'xxxxxx'}
              isDark={true}
              onChanged={setPassword}
              passwordFeild={true}
              setHidePass={setHidePass}
              hidePass={hidePass}
              customStyle={{marginBottom: Window.fixPadding * 1.5}}
            />
            <TextField2
              icon={'lock-outline'}
              label="Confirm Password"
              isDark={true}
              placeholder={'xxxxxx'}
              onChanged={setConfirmPassword}
              passwordFeild={true}
              setHidePass={setHideConfirmPass}
              hidePass={hideConfirmPass}
              customStyle={{marginBottom: Window.fixPadding * 1.5}}
            />
          </View>

          <View style={{marginVertical: Window.fixPadding * 2}}>
            <Button
              loading={loading}
              text="Register"
              onPressFunc={handleSubmit}
              icon="mail"
              isIcon={false}
              theme="white"
              navLink="CodeVerification"
            />
          </View>
          <View style={styles.BottonContainer}>
            <Text style={{...styles.TextStyle, color: Color.white}}>Already have an account ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text
                style={{
                  ...styles.SecondTextStyle,
                  color: '#FBBC05',
                  paddingLeft: 5,
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Toast />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUp;
