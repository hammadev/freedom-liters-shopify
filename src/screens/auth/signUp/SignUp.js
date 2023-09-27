import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Button from '../../../components/Button';
import TextField from '../../../components/TextFeild';
import { GlobalStyle, Color, Window, Font } from '../../../globalStyle/Theme';
import styles from '../AuthStyle';
import AppBar from '../../../components/AppBar';
import Data from '../AuthData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signupReq } from '../../../apis/auth';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import Icon from '../../../core/Icon';
import { ChevronSvg, EmailSvg, UsernameSvg } from '../../../assets/svgs/AuthSvg';
import TextField2 from '../../../components/TextFeild2';

const SignUp = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (userName === '') {
      showMessage({
        message: 'Please enter username',
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

    if (confirmPassword === '') {
      showMessage({
        message: 'Please enter confirm password',
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
    signupReq(
      {
        username: userName,
        email,
        password,
      },
      navigation,
      setLoading,
      dispatch,
      'BottomTabScreen',
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1, backgroundColor: '#021851' }}>



        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingVertical: Window.fixPadding, paddingHorizontal: Window.fixPadding * 2 }}
          keyboardShouldPersistTaps={'handled'}>
          <AppBar
          />
          <Text
            style={{
              ...GlobalStyle.heading,
              color: Color.white,
              marginVertical: Window.fixPadding * 2
            }}>
            Sign Up
          </Text>

          <View style={{ marginTop: Window.fixPadding }}>
            <TextField2
              icon={'account-circle-outline'}
              label="Username"
              isDark={true}
              onChanged={setUserName}
              customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
            />
            <TextField2
              icon={'email-outline'}
              label="Email"
              isDark={true}
              onChanged={setEmail}
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
              customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
            />
            <TextField2
              icon={'lock-outline'}
              label="Confirm Password"
              isDark={true}
              onChanged={setConfirmPassword}
              passwordFeild={true}
              setHidePass={setHideConfirmPass}
              hidePass={hideConfirmPass}
              customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
            />

          </View>

          <View style={{ marginVertical: Window.fixPadding * 2 }}>
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
            <Text style={{ ...styles.TextStyle, color: Color.white }}>
              Don’t have an account?
            </Text>
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
