import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Button from '../../../components/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextField2 from '../../../components/TextFeild2';
import {CREATE_CUSTOMER_ACCOUNT} from '../../../graphql/mutations/Auth';
import {useMutation} from '@apollo/client';
import {handleCreateAccount} from '../../../apis/auth';
import Toast from 'react-native-toast-message';
import {hasLowerCase, hasNumber, hasUpperCase} from '../../../utils/utils';
import {showMessage} from 'react-native-flash-message';
import PhoneInputComponent from '../../../components/PhoneInputComponent';
import {COLORS, CONTAINER_PADDING, FONTS} from '../../../constants';
import BackButton from '../../../components/BackButton';

const SignUp = ({navigation}) => {
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const insets = useSafeAreaInsets();

  const [createCustomerAccount, {loading, error, data}] = useMutation(
    CREATE_CUSTOMER_ACCOUNT,
  );
  const handleSubmit = () => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordformat = /^\w+(?:[ `'?!]\w+)*[`.?!]?$/;

    if (firstName == '') {
      showMessage({
        message: 'First Name cannot be empty',
        type: 'danger',
      });
      return;
    }

    if (!hasLowerCase(password)) {
      showMessage({
        message: 'Atlest one small letter in password',
        type: 'danger',
      });
      return;
    }

    if (!hasNumber(password)) {
      showMessage({
        message: 'Atlest one number in password',
        type: 'danger',
      });
      return;
    }

    if (!hasUpperCase(password)) {
      showMessage({
        message: 'Atlest one Capital letter in password',
        type: 'danger',
      });
      return;
    }

    if (lastName == '') {
      showMessage({
        message: 'Last Name cannot be empty',
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

    if (confirmPassword == '') {
      showMessage({
        message: 'confirm Password cannot be empty.',
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

    if (password.match(passwordformat)) {
      showMessage({
        message: 'Atleast one special character in password',
        type: 'danger',
      });
      return;
    }

    if (password < 5) {
      showMessage({
        message: 'Password must contain at least 6 characters',
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
      },
    };
    if (phone) {
      variables.input.phone = '+1' + phone;
    }
    handleCreateAccount(createCustomerAccount, variables, navigation);
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
          <BackButton type="secondary" />
          <Text style={styles.screenHeading}>Sign Up</Text>
          <TextField2
            icon={'account-circle-outline'}
            label="First Name *"
            placeholder={'john'}
            maxLength={10}
            onChanged={setFirstName}
          />
          <View style={{marginVertical: 5}} />
          <TextField2
            icon={'account-circle-outline'}
            label="Last Name *"
            placeholder={'doe'}
            maxLength={10}
            onChanged={setLastName}
          />
          <View style={{marginVertical: 5}} />
          <TextField2
            icon={'email-outline'}
            label="Email *"
            placeholder={'jhondoe@gmail.com'}
            onChanged={setEmail}
          />
          <View style={{marginVertical: 5}} />
          <PhoneInputComponent text={phone} setText={setPhone} />
          <View style={{marginVertical: 5}} />
          <TextField2
            icon={'lock-outline'}
            label="Password *"
            placeholder={'xxxxxx'}
            onChanged={setPassword}
            passwordFeild={true}
            setHidePass={setHidePass}
            hidePass={hidePass}
          />
          <View style={{marginVertical: 5}} />
          <TextField2
            icon={'lock-outline'}
            label="Confirm Password *"
            placeholder={'xxxxxx'}
            onChanged={setConfirmPassword}
            passwordFeild={true}
            setHidePass={setHideConfirmPass}
            hidePass={hideConfirmPass}
          />
          <View style={{marginVertical: 25}}>
            <Button
              loading={loading}
              text="Register"
              onPressFunc={handleSubmit}
              type="secondary"
            />
          </View>
        </ScrollView>
        <Text style={[styles.bottomText, {marginBottom: insets.bottom + 15}]}>
          Already have an account ?{' '}
          <Text
            onPress={() => navigation.navigate('SignIn')}
            style={{
              color: '#FBBC05',
              fontFamily: FONTS.bold,
            }}>
            Login
          </Text>
        </Text>
        <Toast />
      </ImageBackground>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.primary},
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
