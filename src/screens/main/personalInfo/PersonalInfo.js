import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextField2 from '../../../components/TextFeild2';
import {useDispatch, useSelector} from 'react-redux';
import {handleProfileUpdate} from '../../../apis/auth';
import {showMessage} from 'react-native-flash-message';
import {SkypeIndicator} from 'react-native-indicators';
import {FETCH_CUSTOMER_INFO} from '../../../graphql/queries/Customer';
import {CUSTOMER_UPDATE} from '../../../graphql/mutations/Auth';
import {useMutation, useQuery} from '@apollo/client';

const PersonalInfo = ({navigation}) => {
  const {auth, address} = useSelector(state => ({...state}));
  const dispatch = useDispatch();

  // const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [displayName, setDisplayName] = useState(null);

  const {loading, error, data, refetch} = useQuery(FETCH_CUSTOMER_INFO, {
    variables: {
      customerAccessToken: auth.accessToken,
    },
  });

  useEffect(() => {
    if (data && data.customer) {
      console.log('Customer Info:', data.customer);
      setFirstName(data.customer.firstName);
      setLastName(data.customer.lastName);
      setPhone(data.customer.phone);
      setEmail(data.customer.email);
      setDisplayName(data.customer.displayName);
    }
  }, [data]);

  if (error) {
    console.log(error);
  }

  const [customerUpdate, {loading: updateLoading, error: updateError, data: updateData}] = useMutation(CUSTOMER_UPDATE);

  const handleSubmit = async () => {
    if (firstName === null) {
      showMessage({
        message: "First Name can't be blank",
        type: 'danger',
      });
      return;
    }
    if (lastName === null) {
      showMessage({
        message: "Last Name can't be blank",
        type: 'danger',
      });
      return;
    }
    if (phone === null) {
      showMessage({
        message: "Phone can't be blank",
        type: 'danger',
      });
      return;
    }
    if (email === null) {
      showMessage({
        message: "Email can't be blank",
        type: 'danger',
      });
      return;
    }

    const variables = {
      customerAccessToken: auth.accessToken,
      customer: {
        phone,
        firstName,
        lastName,
        email,
      },
    };

    handleProfileUpdate(customerUpdate, variables, refetch);
  };

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Color.light} />

      <AppBar theme="dark" title="Personal Information" />
      {loading && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.3)',
            width: Window.width,
            height: Window.height,
            zIndex: 1,
          }}>
          <SkypeIndicator />
        </View>
      )}
      <Text
        style={{
          marginTop: 8,
          lineHeight: 20,
          fontSize: 13,
          fontFamily: Font.Gilroy_Regular,
          color: 'rgba(8, 14, 30, 0.4)',
        }}>
        This may include details you have provided to us such as your name, your number & email...
      </Text>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <View style={{width: '48%', marginRight: 5}}>
          <TextField2 label="First Name" onChanged={setFirstName} customStyle={{marginBottom: Window.fixPadding * 1.5}} value={firstName} />
        </View>
        <View style={{width: '48%', marginLeft: 5}}>
          <TextField2 label="Last Name" onChanged={setLastName} customStyle={{marginBottom: Window.fixPadding * 1.5}} value={lastName} />
        </View>
      </View>

      <TextField2
        label="Display Name"
        onChanged={setDisplayName}
        customStyle={{marginBottom: Window.fixPadding * 1.5}}
        value={displayName}
        // numberOfLines={4}
        disabled
      />

      <TextField2 label="Email" onChanged={setEmail} customStyle={{marginBottom: Window.fixPadding * 1.5}} value={email} disabled />

      <TextField2 label="Phone" onChanged={setPhone} customStyle={{marginBottom: Window.fixPadding * 1.5}} value={phone} />

      <View style={{marginTop: 20}}>
        <Button loading={updateLoading} text="Update Profile" onPressFunc={handleSubmit} icon="mail" isIcon={false} theme="tertiary" />
      </View>
    </SafeAreaView>
  );
};
export default PersonalInfo;
