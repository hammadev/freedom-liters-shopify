import React, { useState } from 'react';
import {
  View,
  Text,

} from 'react-native';
import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import { Font, GlobalStyle, Window } from '../../../globalStyle/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField2 from '../../../components/TextFeild2';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileReq } from '../../../apis/auth';
import { showMessage } from 'react-native-flash-message';

const PersonalInfo = ({ navigation }) => {
  const { auth, address } = useSelector(state => ({ ...state }));
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(auth.meta.first_name);
  const [lastName, setLastName] = useState(auth.meta.last_name);
  const [userName, setUserName] = useState(auth.user.data.display_name);
  const [phone, setPhone] = useState(auth.user.data.user_phone);
  const [email, setEmail] = useState(auth.user.data.user_email);

  const handleSubmit = () => {

    if (firstName === '') {
      showMessage({
        message: 'Please enter First Name',
        type: 'danger',
      });
      return;
    }
    if (lastName === '') {
      showMessage({
        message: 'Please enter First Name',
        type: 'danger',
      });
      return;
    }
    const updatedAddress = { ...address };
    updatedAddress.first_name = firstName;
    updatedAddress.last_name = lastName;
    updatedAddress.billing.first_name = firstName;
    updatedAddress.billing.last_name = lastName;
    updatedAddress.shipping.first_name = firstName;
    updatedAddress.shipping.last_name = lastName;
    updateProfileReq(
      {
        user_id: auth.user.data.ID,
        user_phone: phone,
        first_name: firstName,
        last_name: lastName,
      },
      navigation,
      setLoading,
      dispatch,
      'BottomTabScreen',
      updatedAddress
    );
  };

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <AppBar
        theme='dark'
        title='Personal Information'
      />
      <Text
        style={{
          marginTop: 8,
          lineHeight: 20,
          fontSize: 13,
          fontFamily: Font.Gilroy_Regular,
          color: 'rgba(8, 14, 30, 0.4)',
        }}>
        This may include details you have provided to us such as your name, your
        number & email...
      </Text>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <View style={{ width: '48%', marginRight: 5 }}>
          <TextField2
            label="First Name"
            onChanged={setFirstName}
            customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
            value={firstName}
          />
        </View>
        <View style={{ width: '48%', marginLeft: 5 }}>
          <TextField2
            label="Last Name"
            onChanged={setLastName}
            customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
            value={lastName}
          />

        </View>
      </View>
      <TextField2
        label="User Name"
        onChanged={setUserName}
        customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
        value={userName}
      />
      <TextField2
        label="Email"
        onChanged={setEmail}
        customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
        value={email}
      />
      <TextField2
        label="Phone"
        onChanged={setPhone}
        customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
        value={phone}
      />

      <View style={{ marginTop: 20 }}>
        <Button
          loading={loading}
          text="Update Profile"
          onPressFunc={handleSubmit}
          icon="mail"
          isIcon={false}
          theme="tertiary"
        />
      </View>
    </SafeAreaView>
  );
};
export default PersonalInfo;
