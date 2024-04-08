import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Button from '../../../components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextField2 from '../../../components/TextFeild2';
import { CREATE_CUSTOMER_ACCOUNT } from '../../../graphql/mutations/Auth';
import { useMutation } from '@apollo/client';
import { handleCreateAccount } from '../../../apis/auth';
import Toast from 'react-native-toast-message';
import { hasLowerCase, hasNumber, hasUpperCase } from '../../../utils/utils';
import { showMessage } from 'react-native-flash-message';
import PhoneInputComponent from '../../../components/PhoneInputComponent';
import { COLORS, CONTAINER_PADDING, FONTS } from '../../../constants';
import BackButton from '../../../components/BackButton';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';

const SignUp = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={'light-content'}
        showHideTransition={'fade'}
        translucent
      />
      <View
        style={{
          flex: 1,
        }}
      >
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <BackButton type="primary" />

            <Text
              onPress={() => navigation.navigate('BottomTabScreen')}
              style={styles.skip}>
              Skip
            </Text>

          </View>
          <Text style={styles.screenHeading}>Sign Up</Text>
          <TextField2
            label="First Name *"
            placeholder={'john'}
            maxLength={10}
            onChanged={setFirstName}
          />
          <View style={{ marginVertical: 5 }} />
          <TextField2
            label="Last Name *"
            placeholder={'doe'}
            maxLength={10}
            onChanged={setLastName}
          />
          <View style={{ marginVertical: 5 }} />
          <TextField2
            label="Email *"
            placeholder={'jhondoe@gmail.com'}
            onChanged={setEmail}
          />
          <View style={{ marginVertical: 5 }} />
          <PhoneInputComponent text={phone} setText={setPhone} />
          <View style={{ marginVertical: 5 }} />
          <TextField2
            label="Password *"
            placeholder={'xxxxxx'}
            onChanged={setPassword}
            passwordFeild={true}
            setHidePass={setHidePass}
            hidePass={hidePass}
          />
          <View style={{ marginVertical: 5 }} />
          <TextField2
            label="Confirm Password *"
            placeholder={'xxxxxx'}
            onChanged={setConfirmPassword}
            passwordFeild={true}
            setHidePass={setHideConfirmPass}
            hidePass={hideConfirmPass}
          />
          <View style={{ marginVertical: 25 }}>
            <Button
              loading={loading}
              text="Register"
              type="secondary"
            />
          </View>
        </ScrollView>
        <Text style={[styles.bottomText, { marginBottom: insets.bottom + 15 }]}>
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
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  bottomText: {
    color: COLORS.black,
    fontSize: 12,
    fontFamily: FONTS.medium,
    alignSelf: 'center',
  },
  screenHeading: {
    fontSize: 20,
    color: COLORS.black,
    marginVertical: 25,
  },
  skip: {
    alignSelf: 'flex-end',
    color: COLORS.black,
    fontSize: 15,
  },
});
