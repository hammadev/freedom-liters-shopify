import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Button from '../../../components/Button';
import {GlobalStyle, Color, Window} from '../../../globalStyle/Theme';
// import styles from '../AuthStyle';
import {useDispatch} from 'react-redux';
import TextField2 from '../../../components/TextFeild2';
import {handleCreateAccessToken} from '../../../apis/auth';
import {CREATE_CUSTOMER_ACCESS_TOKEN} from '../../../graphql/mutations/Auth';
import {useMutation} from '@apollo/client';
import Toast from 'react-native-toast-message';
import {LogoSvg} from '../../../assets/svgs/Logo';
import {ScrollView} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, CONTAINER_PADDING, FONTS} from '../../../constants';

const SignIn = ({navigation}) => {
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [createCustomerAccessToken, {loading, error, data}] = useMutation(
    CREATE_CUSTOMER_ACCESS_TOKEN,
  );

  const handleSubmit = () => {
    Keyboard.dismiss();
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email == '') {
      showMessage({
        message: 'Email cannot be empty.',
        type: 'danger',
      });
      return;
    }
    if (password == '') {
      showMessage({
        message: 'Password cannot be empty.',
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
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          flex: 1,
        }}
        source={require('../../../assets/images/pics/auth.bg.png')}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{
            flex: 1,
            marginTop: insets.top + 15,
          }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: CONTAINER_PADDING,
          }}>
          <Text
            onPress={() => navigation.navigate('BottomTabScreen')}
            style={styles.skip}>
            Skip
          </Text>
          <View style={styles.logoContainer}>
            <LogoSvg />
          </View>
          <Text style={styles.screenHeading}>Sign In</Text>

          <TextField2
            icon={'email-outline'}
            label="Email"
            isDark={true}
            onChanged={setEmail}
          />
          <View style={{marginVertical: 5}} />
          <TextField2
            icon={'lock-outline'}
            label="Password"
            isDark={true}
            onChanged={setPassword}
            passwordFeild={true}
            setHidePass={setHidePass}
            hidePass={hidePass}
          />
          <View style={{marginVertical: 25}}>
            <Button
              text="Login"
              type="secondary"
              loading={loading}
              onPressFunc={handleSubmit}
            />
          </View>
        </ScrollView>
        <Text style={[styles.bottomText, {marginBottom: insets.bottom + 15}]}>
          Don't have an account yet?{' '}
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={{
              color: '#FBBC05',
              fontFamily: FONTS.bold,
            }}>
            Register
          </Text>
        </Text>
        <Toast />
      </ImageBackground>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.primary},
  logoContainer: {alignItems: 'center', marginTop: 25},
  skip: {
    alignSelf: 'flex-end',
    color: COLORS.white,
    fontSize: 15,
  },
  bottomText: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: FONTS.medium,
    alignSelf: 'center',
  },
  screenHeading: {
    fontSize: 16,
    fontFamily: FONTS.heading,
    color: COLORS.white,
    marginVertical: 25,
  },
});
