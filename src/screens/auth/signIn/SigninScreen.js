import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Button from '../../../components/Button';
import { GlobalStyle, Color, Window } from '../../../globalStyle/Theme';
// import styles from '../AuthStyle';
import { useDispatch } from 'react-redux';
import TextField2 from '../../../components/TextFeild2';
import { handleCreateAccessToken } from '../../../apis/auth';
import { CREATE_CUSTOMER_ACCESS_TOKEN } from '../../../graphql/mutations/Auth';
import { useMutation } from '@apollo/client';
import Toast from 'react-native-toast-message';
import { LogoSvg } from '../../../assets/svgs/Logo';
import { ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, CONTAINER_PADDING, FONTS } from '../../../constants';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';

const SignIn = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const Goto_Home = () => {
    navigation.navigate('BottomTabScreen')
  }
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
          <Text
            onPress={() => navigation.navigate('BottomTabScreen')}
            style={styles.skip}>
            Skip
          </Text>

          <Text style={styles.screenHeading}>Sign In</Text>

          <TextField2
            label="Email"
            isDark={true}
            onChanged={setEmail}
          />
          <View style={{ marginVertical: 5 }} />
          <TextField2
            label="Password"
            onChanged={setPassword}
            passwordFeild={true}
            setHidePass={setHidePass}
            hidePass={hidePass}
          />
          <View style={{ marginVertical: 25 }}>
            <Button
              text="Login"
              type="secondary"
              onPressFunc={Goto_Home}
              loading={loading}
            />
          </View>
        </ScrollView>
        <Text style={[styles.bottomText, { marginBottom: insets.bottom + 15 }]}>
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
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  logoContainer: { alignItems: 'center', marginTop: 25 },
  skip: {
    alignSelf: 'flex-end',
    color: COLORS.black,
    fontSize: 15,
  },
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
});
