import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextField2 from '../../../components/TextFeild2';
import {useSelector} from 'react-redux';
import {handleProfileUpdate} from '../../../apis/auth';
import {showMessage} from 'react-native-flash-message';
import {SkypeIndicator} from 'react-native-indicators';
import {FETCH_CUSTOMER_INFO} from '../../../graphql/queries/Customer';
import {CUSTOMER_UPDATE} from '../../../graphql/mutations/Auth';
import {useMutation, useQuery} from '@apollo/client';
import {ScrollView} from 'react-native';
import PhoneInputComponent from '../../../components/PhoneInputComponent';

const PersonalInfoEdit = ({navigation}) => {
  const {auth} = useSelector(state => ({...state}));

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');

  const {loading, error, data, refetch} = useQuery(FETCH_CUSTOMER_INFO, {
    variables: {
      customerAccessToken: auth.accessToken,
    },
  });
  useEffect(() => {
    if (data && data.customer) {
      console.log(data.customer.phone);
      setFirstName(data.customer.firstName);
      setLastName(data.customer.lastName);
      setPhone(data.customer.phone ? data.customer.phone.slice(2) : '');
      setEmail(data.customer.email);
      setDisplayName(data.customer.displayName);
    }
  }, [data]);

  if (error) {
    console.log(error);
  }

  const [customerUpdate, {loading: updateLoading, error: updateError, data: updateData}] = useMutation(CUSTOMER_UPDATE);

  const handleSubmit = async () => {
    if (firstName === '') {
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

    // if (phone === '') {
    //   showMessage({
    //     message: "Phone can't be blank",
    //     type: 'danger',
    //   });
    //   return;
    // }
    if (email === '') {
      showMessage({
        message: "Email can't be blank",
        type: 'danger',
      });
      return;
    }

    const variables = {
      customerAccessToken: auth.accessToken,
      customer: {
        firstName,
        lastName,
        email,
      },
    };

    if(phone){
      variables.customer.phone= '+1'+phone;
    }

    handleProfileUpdate(customerUpdate, variables, refetch);
  };

  return (
    <SafeAreaView style={GlobalStyle.Container}>

      <AppBar theme="light" title="Personal Information" />
      <ScrollView>
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

        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: Font.Gilroy_Bold,
              color: Color.black,
            }}>
            Personal Information Edit
          </Text>
        </View>
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
            <TextField2
              label="First Name"
              onChanged={setFirstName}
              customStyle={{marginBottom: Window.fixPadding * 1.5}}
              maxLength={12}
              value={firstName}
            />
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
          disabled
        />

        <TextField2 label="Email" onChanged={setEmail} customStyle={{marginBottom: Window.fixPadding * 1.5}} value={email} disabled />

        <PhoneInputComponent
        text={phone} 
        setText={setPhone}
        isDark={false}
        />

        <View style={{marginTop: 20}}>
          <Button loading={updateLoading} text="Update Profile" onPressFunc={handleSubmit} icon="mail" isIcon={false} theme="tertiary" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PersonalInfoEdit;
