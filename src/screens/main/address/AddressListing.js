import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, StyleSheet, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Font, Color} from '../../../globalStyle/Theme';
import {useBackButton} from '../../../hooks';
import Button from '../../../components/Button';
import BottomPopupHOC from '../../../components/BottomPopupHOC';
import TextField2 from '../../../components/TextFeild2';
import {
  CUSTOMER_ADDRESS_CREATE,
  CUSTOMER_ADDRESS_UPDATE,
  CUSTOMER_DEFAULT_ADDRESS_UPDATE,
} from '../../../graphql/mutations/Auth';
import {useMutation, useQuery} from '@apollo/client';
import {
  FETCH_CUSTOMER_ADDRESS,
  FETCH_CUSTOMER_INFO,
} from '../../../graphql/queries/Customer';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {handleCreateAddress} from '../../../apis/profile';
import {NoAddressSvg} from '../../../assets/svgs/AddressSvg';
import Header from '../../../components/Header';
import {COLORS, CONTAINER_PADDING, FONTS, WIDTH} from '../../../constants';
import AddressList from '../../../components/AddressList';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';

const AddressListing = ({navigation}) => {
  const {auth, address} = useSelector(state => ({...state}));

  const [radioCheck, setRadioCheck] = useState('');
  const [editIcon, setEditIcon] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleAddress, setVisibleAddress] = useState(false);

  // address form states
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [country, setcountry] = useState('');
  const [zip, setZip] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [activeAddressId, setActiveAddressId] = useState(null);
  const dispatch = useDispatch();

  const [
    createCustomerAddress,
    {
      loading: createAddressLoading,
      error: createAddressError,
      data: createAddressData,
    },
  ] = useMutation(CUSTOMER_ADDRESS_CREATE);

  const [customerDefaultAddressUpdate] = useMutation(
    CUSTOMER_DEFAULT_ADDRESS_UPDATE,
  );

  const [
    updateCustomerAddress,
    {
      loading: updateAddressLoading,
      error: updateAddressError,
      data: updateAddressData,
    },
  ] = useMutation(CUSTOMER_ADDRESS_UPDATE);

  const {loading, data, refetch} = useQuery(FETCH_CUSTOMER_ADDRESS, {
    variables: {
      customerAccessToken: auth.accessToken,
    },
  });

  const {
    loading: infoLoading,
    error: infoError,
    data: infoData,
  } = useQuery(FETCH_CUSTOMER_INFO, {
    variables: {
      customerAccessToken: auth.accessToken,
    },
  });

  useEffect(() => {
    if (infoData && infoData.customer) {
      setFirstName(infoData.customer.firstName);
      setLastName(infoData.customer.lastName);
      setPhone(infoData.customer.phone);
    }
  }, [infoData]);

  useEffect(() => {
    {
      data &&
        data.customer.defaultAddress &&
        setRadioCheck(data.customer.defaultAddress.id);
    }
  }, [data]);

  const resetState = () => {
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

    if (!isUpdate)
      handleCreateAddress(
        createCustomerAddress,
        variables,
        resetState,
        refetch,
        setVisible,
        isUpdate,
        dispatch,
      );
    else {
      variables.address = activeAddressId;
      handleCreateAddress(
        updateCustomerAddress,
        variables,
        resetState,
        refetch,
        setVisibleAddress,
        isUpdate,
      );
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={COLORS.white}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      />
      <Header
        label={'Address'}
        edit={
          data && data.customer !== null
            ? data.customer.defaultAddress !== null
              ? true
              : false
            : false
        }
        editOnpress={() => setEditIcon(!editIcon)}
      />
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20}}>
        {!loading &&
          data.customer !== null &&
          data.customer.defaultAddress !== null &&
          data.customer.addresses.edges.map((item, i) => (
            <AddressList
              key={i}
              item={item.node}
              radioCheck={radioCheck}
              setRadioState={setRadioCheck}
              editIcon={editIcon}
              showModal={showModal}
              auth={auth}
              customerDefaultAddressUpdate={customerDefaultAddressUpdate}
            />
          ))}

        {(data && data.customer === null) ||
          (data && data.customer.defaultAddress === null && (
            <View style={styles.noAddressContainer}>
              <NoAddressSvg />
              <Text style={styles.text}>You have no address yet</Text>
              <Text style={styles.subTitle}>
                Please add an address for shipping and billing
              </Text>
            </View>
          ))}
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <Button
          text="Add New Address"
          type="primary"
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
        color={COLORS.primary}
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
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  noAddressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    shadowColor: Platform.OS === 'ios' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5.84,
    elevation: 12,
    paddingHorizontal: CONTAINER_PADDING,
  },
  text: {
    color: COLORS.tertiary,
    fontSize: 18,
    lineHeight: 20,
    fontFamily: FONTS.heading,
    textAlign: 'center',
    marginVertical: 15,
    width: WIDTH / 1.35,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    textAlign: 'center',
    width: WIDTH / 1.25,
    color: COLORS.secondary,
  },

  ////////////////
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
      <View style={styles.row}>
        <View style={{width: '48%'}}>
          <TextField2
            type="secondary"
            label="First Name"
            onChanged={setFirstName}
            value={firstName}
            disabled
          />
        </View>
        <View style={{width: '48%'}}>
          <TextField2
            type="secondary"
            label="Last Name"
            onChanged={setLastName}
            value={lastName}
            disabled
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={{width: '100%'}}>
          <TextField2
            type="secondary"
            label="Phone"
            onChanged={setPhone}
            value={phone}
            disabled
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={{width: '100%'}}>
          <TextField2
            type="secondary"
            label="Address 1"
            onChanged={setAddress1}
            value={address1}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{width: '100%'}}>
          <TextField2
            type="secondary"
            label="Address2"
            onChanged={setAddress2}
            value={address2}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{width: '48%'}}>
          <TextField2
            type="secondary"
            label="Country"
            onChanged={setcountry}
            value={country}
          />
        </View>

        <View style={{width: '48%'}}>
          <TextField2
            type="secondary"
            label="Zip"
            onChanged={setZip}
            value={zip}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={{width: '48%'}}>
          <TextField2
            type="secondary"
            label="Province"
            onChanged={setProvince}
            value={province}
          />
        </View>
        <View style={{width: '48%'}}>
          <TextField2
            type="secondary"
            label="City"
            onChanged={setCity}
            value={city}
          />
        </View>
      </View>
      <View style={{marginTop: 25}}>
        <Button
          text={!isUpdate ? 'Add Address' : 'Update Address'}
          type="primary"
          loading={loading}
          onPressFunc={() => handleSubmit(isUpdate)}
        />
      </View>
    </View>
  );
};
