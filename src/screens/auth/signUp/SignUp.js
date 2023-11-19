import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StatusBar, ScrollView, ImageBackground} from 'react-native';
import Button from '../../../components/Button';
import {GlobalStyle, Color, Window, Font} from '../../../globalStyle/Theme';
import styles from '../AuthStyle';
import AppBar from '../../../components/AppBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {showMessage} from 'react-native-flash-message';
import TextField2 from '../../../components/TextFeild2';
import {CREATE_CUSTOMER_ACCOUNT} from '../../../graphql/mutations/Auth';
import {useMutation} from '@apollo/client';
import {handleCreateAccount} from '../../../apis/auth';

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
    const passwordformat = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

    if (firstName === '') {
      showMessage({
        message: "First Name can't be blank",
        type: 'danger',
      });
      return;
    }
    if (password.match(passwordformat)) {
      showMessage({
        message: "First Name can't be blank",
        type: 'danger',
      });
      return;
    }
    if (lastName === '') {
      showMessage({
        message: "Last Name can't be blank",
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

    if (confirmPassword === '') {
      showMessage({
        message: "Confirm Password can't be blank",
        type: 'danger',
      });
      return;
    }

    if (password !== confirmPassword) {
      showMessage({
        message: 'Password & confirm password not match',
        type: 'danger',
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
    // console.log(variables);
    // return;

    handleCreateAccount(createCustomerAccount, variables, navigation);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground style={{flex: 1, backgroundColor: '#021851'}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: Window.fixPadding,
            paddingHorizontal: Window.fixPadding * 2,
          }}
          keyboardShouldPersistTaps={'handled'}>
          <AppBar />
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
              isDark={true}
              onChanged={setFirstName}
              customStyle={{marginBottom: Window.fixPadding * 1.5}}
            />
            <TextField2
              icon={'account-circle-outline'}
              label="Last Name"
              isDark={true}
              onChanged={setLastName}
              customStyle={{marginBottom: Window.fixPadding * 1.5}}
            />

            <TextField2
              icon={'email-outline'}
              label="Email"
              isDark={true}
              onChanged={setEmail}
              customStyle={{marginBottom: Window.fixPadding * 1.5}}
            />

            <TextField2
              icon={'phone-outline'}
              label="Phone"
              isDark={true}
              title={'title'}
              onChanged={setPhone}
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
              customStyle={{marginBottom: Window.fixPadding * 1.5}}
            />
            <TextField2
              icon={'lock-outline'}
              label="Confirm Password"
              isDark={true}
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
            <Text style={{...styles.TextStyle, color: Color.white}}>Don’t have an account?</Text>
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
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUp;
