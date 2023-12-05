import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, Image, StyleSheet} from 'react-native';
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
import {COLORS, CONTAINER_PADDING} from '../../../constants';

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

  const [
    customerUpdate,
    {loading: updateLoading, error: updateError, data: updateData},
  ] = useMutation(CUSTOMER_UPDATE);

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

    if (phone) {
      variables.customer.phone = '+1' + phone;
    }

    handleProfileUpdate(customerUpdate, variables, refetch);
  };

  return (
    <SafeAreaView style={styles.container}>
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
          This may include details you have provided to us such as your name,
          your number & email...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '48%'}}>
            <TextField2
              type="secondary"
              label="First Name"
              onChanged={setFirstName}
              maxLength={12}
              value={firstName}
            />
          </View>
          <View style={{width: '48%'}}>
            <TextField2
              type="secondary"
              label="Last Name"
              onChanged={setLastName}
              value={lastName}
            />
          </View>
        </View>
        <View style={{marginVertical: 7.5}} />

        <TextField2
          type="secondary"
          label="Display Name"
          onChanged={setDisplayName}
          value={displayName}
          disabled
        />
        <View style={{marginVertical: 7.5}} />

        <TextField2
          type="secondary"
          label="Email"
          onChanged={setEmail}
          value={email}
          disabled
        />
        <View style={{marginVertical: 7.5}} />

        <PhoneInputComponent
          type="secondary"
          text={phone}
          setText={setPhone}
          isDark={false}
        />

        <View style={{marginTop: 20}}>
          <Button
            loading={updateLoading}
            text="Update Profile"
            onPressFunc={handleSubmit}
            icon="mail"
            isIcon={false}
            theme="tertiary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PersonalInfoEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: CONTAINER_PADDING,
  },
});
