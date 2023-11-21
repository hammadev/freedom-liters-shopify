import React, {useState} from 'react';
import {View, Text, StatusBar, ScrollView, Keyboard, ImageBackground} from 'react-native';
import Button from '../../../components/Button';
import {GlobalStyle, Color, Window, Font} from '../../../globalStyle/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {LogoIcon, LogoSvg} from '../../../assets/svgs/Logo';
import TextField2 from '../../../components/TextFeild2';
import {handleForgetPassword} from '../../../apis/auth';
import {SEND_PASSWORD_RESET_EMAIL} from '../../../graphql/mutations/Auth';
import {useMutation} from '@apollo/client';
import AppBar from '../../../components/AppBar';
import BottomPopupHOC from '../../../components/BottomPopupHOC';

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);

  const [sendPasswordResetEmail, {loading, error, data}] = useMutation(SEND_PASSWORD_RESET_EMAIL);

  const handleSubmit = async () => {
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

    const variables = {
      email,
    };

    handleForgetPassword(sendPasswordResetEmail, variables);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#021851'}}>
      <ScrollView contentContainerStyle={{justifyContent: 'center', flex: 1}} keyboardShouldPersistTaps="handled">
        <ImageBackground
          style={{...GlobalStyle.Container, backgroundColor: '#021851', paddingVertical: Window.fixPadding * 2}}
          source={require('../../../assets/images/pics/auth.bg.png')}>
          <AppBar />
          <View style={{alignItems: 'center', marginTop: Window.height / 15}}>
            <LogoSvg />
          </View>
          <Text
            style={{
              ...GlobalStyle.heading,
              color: Color.white,
              marginTop: Window.fixPadding * 4,
              marginBottom: Window.fixPadding * 1.5,
            }}>
            Forget Password
          </Text>

          <TextField2
            icon={'email-outline'}
            label="Email"
            isDark={true}
            onChanged={setEmail}
            customStyle={{marginBottom: Window.fixPadding * 1.5}}
          />

          <View style={{marginVertical: Window.fixPadding}}>
            <Button text="Forget Password" isIcon={false} theme="white" loading={loading} onPressFunc={handleSubmit} />
          </View>
        </ImageBackground>
      </ScrollView>
      <BottomPopupHOC
        visible={visible}
        setVisible={setVisible}
        title="Success Password"
        PopupBody={
          <View>
            <Text
              style={{
                ...GlobalStyle.textStlye,
                textAlign: 'center',
              }}>
              Password Successfully Changed!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ForgetPassword;
