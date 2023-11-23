import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../../components/AppBar';
import {GlobalStyle, Font, Window, Color} from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import {RadioButton} from 'react-native-paper';
import {SkypeIndicator} from 'react-native-indicators';
import {useBackButton} from '../../../hooks';
import Button from '../../../components/Button';
import BottomPopupHOC from '../../../components/BottomPopupHOC';
import TextField2 from '../../../components/TextFeild2';
import {CUSTOMER_ADDRESS_CREATE, CUSTOMER_ADDRESS_UPDATE} from '../../../graphql/mutations/Auth';
import {useMutation, useQuery} from '@apollo/client';
import {FETCH_CUSTOMER_ADDRESS} from '../../../graphql/queries/Customer';
import {useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {handleCreateAddress} from '../../../apis/profile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeliverTo = ({item, setRadioState, radioState, navigation, editIcon, showModal, defaultAddressId}) => {
  const RadioClick = async itemID => {
    setRadioState(itemID);
    await AsyncStorage.setItem('address', itemID);
    console.log(itemID);
  };

  return (
    <View
      onPress={() => RadioClick(item.id)}
      style={{
        backgroundColor: Color.light,

        marginTop: 20,
        borderRadius: 24,
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        overflow: 'hidden',
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          margin: 20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', width: '65%'}}>
          <View
            style={{
              backgroundColor: 'rgba(239, 127, 1, 0.08)',
              borderRadius: 50,
              marginRight: 10,
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: Color.tertiary,
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}>
              <Icon iconFamily={'Ionicons'} name="ios-location-sharp" size={16} color={Color.light} />
            </View>
          </View>
          <View style={{}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{...styles.Heading}}>{item.firstName + ' ' + item.lastName}</Text>

              {radioState == item.id && (
                <View
                  style={{
                    backgroundColor: Color.grey,
                    marginLeft: 15,
                    alignItems: 'center',
                    borderRadius: 10,
                    width: 70,
                  }}>
                  <Text
                    style={{
                      color: Color.primary,
                      fontSize: 10,
                      paddingVertical: 5,
                      fontFamily: Font.Urbanist_SemiBold,
                      lineHeight: 12,
                    }}>
                    Default
                  </Text>
                </View>
              )}
            </View>
            <Text style={{...GlobalStyle.textStlye, marginVertical: 5}}>{item.phone}</Text>

            <Text style={{...styles.TextStyle}} numberOfLines={2}>
              {item.address1 + ', ' + item.address2 + ', '}
              {item.zip + ', ' + item.city + ', ' + item.province}
            </Text>
          </View>
        </View>
        {editIcon ? (
          <TouchableOpacity onPress={() => showModal(item)}>
            <Icon iconFamily={'MaterialCommunityIcons'} name="pencil-minus" size={20} color={Color.tertiary} />
          </TouchableOpacity>
        ) : (
          <RadioButton
            value="first"
            uncheckedColor={Color.primary}
            color={Color.primary}
            status={radioState == item.id ? 'checked' : 'unchecked'}
            onPress={() => RadioClick(item.id)}
          />
        )}
      </View>
    </View>
  );
};

const AddressListing = ({navigation}) => {
  const {auth} = useSelector(state => ({...state}));

  const [radioCheck, setRadioCheck] = useState('');
  const [editIcon, setEditIcon] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleAddress, setVisibleAddress] = useState(false);

  // address form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [country, setcountry] = useState('');
  const [zip, setZip] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [activeAddressId, setActiveAddressId] = useState(null);

  const [createCustomerAddress, {loading: createAddressLoading, error: createAddressError, data: createAddressData}] =
    useMutation(CUSTOMER_ADDRESS_CREATE);

  const [updateCustomerAddress, {loading: updateAddressLoading, error: updateAddressError, data: updateAddressData}] =
    useMutation(CUSTOMER_ADDRESS_UPDATE);

  const {loading, error, data, refetch} = useQuery(FETCH_CUSTOMER_ADDRESS, {
    variables: {
      customerAccessToken: auth.accessToken,
    },
  });
  useEffect(() => {
    Get_Defult_Address();
  }, [Get_Defult_Address]);

  const Get_Defult_Address = async () => {
    const DefultAddress = await AsyncStorage.getItem('address');
    console.log(DefultAddress);
    setRadioCheck(DefultAddress);
  };
  // console.log(data);

  const resetState = () => {
    setFirstName('');
    setLastName('');
    setPhone('');
    setAddress1('');
    setAddress2('');
    setcountry('');
    setZip('');
    setProvince('');
    setCity('');
  };

  const onBackPress = () => {
    navigation.goBack();
    return true;
  };

  useBackButton(navigation, onBackPress);

  const showModal = item => {
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setPhone(item.phone);
    setAddress1(item.address1);
    setAddress2(item.address2);
    setcountry(item.country);
    setZip(item.zip);
    setProvince(item.province);
    setCity(item.city);
    setActiveAddressId(item.id);
    setVisibleAddress(true);
  };

  const handleSubmit = isUpdate => {
    // console.log(isUpdate);

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

    if (phone === '') {
      showMessage({
        message: "Phone can't be blank",
        type: 'danger',
      });
      return;
    }

    if (address1 === '') {
      showMessage({
        message: "Address can't be blank",
        type: 'danger',
      });
      return;
    }

    if (province === '') {
      showMessage({
        message: "Province can't be blank",
        type: 'danger',
      });
      return;
    }

    if (city === '') {
      showMessage({
        message: "City can't be blank",
        type: 'danger',
      });
      return;
    }

    const variables = {
      customerAccessToken: auth.accessToken,
      address: {
        firstName,
        lastName,
        phone,
        address1,
        address2,
        country,
        province,
        zip,
        city,
      },
    };

    if (!isUpdate) handleCreateAddress(createCustomerAddress, variables, resetState, refetch, setVisible);
    else {
      variables.addressId = activeAddressId;
      // console.log(variables);
      handleCreateAddress(updateCustomerAddress, variables, resetState, refetch, setVisibleAddress);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: Color.light, flex: 1}}>
      <StatusBar animated={true} backgroundColor={Color.light} barStyle={'dark-content'} showHideTransition={'fade'} />

      <View style={{paddingHorizontal: Window.fixPadding * 2}}>
        <AppBar theme="dark" header="solid" />
      </View>

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

      <View
        style={{
          paddingHorizontal: Window.fixPadding * 2,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Font.Automove_Personal,
            color: Color.primary,
          }}>
          Address Listing
        </Text>
        <TouchableOpacity onPress={() => setEditIcon(!editIcon)} style={{width: 50, alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Font.Gilroy_SemiBold,
              color: Color.tertiary,
            }}>
            {editIcon ? 'Done' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20}}>
        {!loading &&
          data &&
          data.customer.addresses.edges.map((item, i) => (
            <DeliverTo
              item={item.node}
              key={i}
              radioState={radioCheck}
              setRadioState={setRadioCheck}
              navigation={navigation}
              editIcon={editIcon}
              showModal={showModal}
              defaultAddressId={data.customer.defaultAddress.id}
            />
          ))}
      </ScrollView>

      <View style={[styles.BottomButtonContainer, {paddingHorizontal: Window.fixPadding * 2}]}>
        <Button
          text="Add New Address"
          theme="tertiary"
          onPressFunc={() => {
            resetState();
            setVisible();
          }}
        />
      </View>

      <BottomPopupHOC
        title="Update Address"
        visible={visibleAddress}
        setVisible={setVisibleAddress}
        PopupBody={
          <AddressForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            phone={phone}
            setPhone={setPhone}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            province={province}
            setProvince={setProvince}
            country={country}
            setcountry={setcountry}
            zip={zip}
            setZip={setZip}
            city={city}
            setCity={setCity}
            handleSubmit={handleSubmit}
            isUpdate={1}
            loading={updateAddressLoading}
          />
        }
      />

      <BottomPopupHOC
        title="Add Address"
        visible={visible}
        setVisible={setVisible}
        PopupBody={
          <AddressForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            phone={phone}
            setPhone={setPhone}
            address1={address1}
            setAddress1={setAddress1}
            province={province}
            setProvince={setProvince}
            country={country}
            setcountry={setcountry}
            zip={zip}
            setZip={setZip}
            city={city}
            setCity={setCity}
            handleSubmit={handleSubmit}
            loading={createAddressLoading}
          />
        }
      />
    </SafeAreaView>
  );
};

export default AddressListing;

const styles = StyleSheet.create({
  Heading: {
    fontSize: 18,
    color: Color.tertiary,
    fontFamily: Font.Gilroy_Bold,
    lineHeight: 21.6,
  },
  TextStyle: {
    lineHeight: 19.6,
    fontSize: 14,
    color: Color.secondary,
    fontFamily: Font.Gilroy_Medium,
  },
  BottomButtonContainer: {
    width: '100%',
    paddingVertical: 20,
    alignSelf: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
});

const AddressForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  address1,
  setAddress1,
  address2,
  setAddress2,
  province,
  setProvince,
  country,
  setcountry,
  zip,
  setZip,
  city,
  setCity,
  phone,
  setPhone,
  handleSubmit,
  isUpdate = 0,
  loading,
}) => {
  return (
    <View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{width: '48%'}}>
          <TextField2 label="First Name" onChanged={setFirstName} customStyle={{marginBottom: Window.fixPadding * 1.5}} value={firstName} />
        </View>
        <View style={{width: '48%'}}>
          <TextField2 label="Last Name" onChanged={setLastName} customStyle={{marginBottom: Window.fixPadding * 1.5}} value={lastName} />
        </View>
      </View>

      <TextField2 label="Phone" onChanged={setPhone} customStyle={{marginBottom: Window.fixPadding * 1.5}} value={phone} />

      <TextField2 label="Address1" onChanged={setAddress1} customStyle={{marginBottom: Window.fixPadding * 1.5}} value={address1} />

      <TextField2 label="Address2" onChanged={setAddress2} customStyle={{marginBottom: Window.fixPadding * 1.5}} value={address2} />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{width: '48%'}}>
          <TextField2 label="country" onChanged={setcountry} customStyle={{marginBottom: Window.fixPadding * 1.5}} value={country} />
        </View>

        <View style={{width: '48%'}}>
          <TextField2 label="Zip" onChanged={setZip} customStyle={{marginBottom: Window.fixPadding * 1.5}} value={zip} />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{width: '48%'}}>
          <TextField2 label="Province" onChanged={setProvince} customStyle={{marginBottom: Window.fixPadding * 1.5}} value={province} />
        </View>
        <View style={{width: '48%'}}>
          <TextField2 label="City" onChanged={setCity} customStyle={{marginBottom: Window.fixPadding * 1.5}} value={city} />
        </View>
      </View>
      <View style={{paddingTop: 10}}>
        <Button
          text={!isUpdate ? 'Add Address' : 'Update Address'}
          isIcon={false}
          theme="tertiary"
          loading={loading}
          onPressFunc={() => handleSubmit(isUpdate)}
        />
      </View>
    </View>
  );
};
