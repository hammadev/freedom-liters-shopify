import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import { Color, Font, GlobalStyle, Window } from '../../../globalStyle/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '../../../components/TextFeild';
import ToggleSwitch from 'toggle-switch-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { updateAddressReq } from '../../../apis/profile';
import DropDown from "react-native-paper-dropdown";
import TextField2 from '../../../components/TextFeild2';

const BillingAddress = ({ state }) => {
    const {
        shippingAddress1,
        setShippingAddress1,
        shippingAddress2,
        setShippingAddress2,
        shippingFirstName,
        setShippingFirstName,
        shippingLastName,
        setShippingLastName,
        shippingPhone,
        setShippingPhone,
        shippingCity,
        setShippingCity,
        shippingState,
        setShippingState,
        shippingPostCode,
        setShippingPostCode,
        shippingCountry,
        setShippingCountry,
        states
    } = state;

    const [showDropDown, setShowDropDown] = useState(false);
    return (
        <>
            <Text style={{ ...GlobalStyle.heading, marginTop: Window.fixPadding, marginBottom: Window.fixPadding * 1.5 }}>Update Billing Address</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '48%' }}>
                    <TextField2
                        label="First Name"
                        onChanged={setShippingFirstName}
                        customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                        value={shippingFirstName}
                    />

                </View>
                <View style={{ width: '48%' }}>
                    <TextField2
                        label="Last Name"
                        onChanged={setShippingLastName}
                        customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                        value={shippingLastName}
                    />

                </View>
            </View>
            <TextField2
                label="Phone"
                onChanged={setShippingPhone}
                customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                value={shippingPhone}
            />
            <TextField2
                label="Address Line 1"
                onChanged={setShippingAddress1}
                customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                value={shippingAddress1}
            />
            <TextField2
                label="Address Line 2 (optional)"
                onChanged={setShippingAddress2}
                customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                value={shippingAddress2}
            />


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '48%' }}>
                    <TextField2
                        label="country"
                        onChanged={setShippingCountry}
                        customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                        value={shippingCountry}
                    />
                </View>
                <View style={{ width: '48%' }}>
                    {
                        states &&
                        <DropDown
                            label={"State"}
                            mode={"outlined"}
                            visible={showDropDown}
                            showDropDown={() => setShowDropDown(true)}
                            onDismiss={() => setShowDropDown(false)}
                            value={setShippingState}
                            setValue={shippingState}
                            list={states}
                        />
                    }
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '48%' }}>
                    <TextField2
                        label="city"
                        onChanged={setShippingCity}
                        customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                        value={shippingCity}
                    />

                </View>
                <View style={{ width: '48%' }}>
                    <TextField2
                        label="postcode"
                        onChanged={setShippingPostCode}
                        customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                        value={shippingPostCode}
                    />

                </View>

            </View>

        </>
    );
}

const AddAddress = ({ navigation }) => {
    const { auth, address, generalSettings } = useSelector(state => ({ ...state }));
    // console.log('generalSettings', generalSettings.states);

    // helper state
    const [switchActive, setSwitchActive] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);

    const dispatch = useDispatch();

    //billing address state
    const [firstName, setFirstName] = useState(address.billing.address_1 ? address.billing.first_name : auth.meta.first_name);
    const [lastName, setLastName] = useState(address.billing.address_1 ? address.billing.last_name : auth.meta.last_name);
    const [email, setEmail] = useState(address.billing.address_1 ? address.billing.email : auth.user.data.user_email);
    const [phone, setPhone] = useState(address.billing.address_1 ? address.billing.phone : auth.user.data.user_phone);
    const [address1, setAddress1] = useState(address.billing.address_1 ? address.billing.address_1 : '');
    const [address2, setAddress2] = useState(address.billing.address_1 ? address.billing.address_2 : '');
    const [city, setCity] = useState(address.billing.address_1 ? address.billing.city : '');
    const [state, setState] = useState(address.billing.address_1 ? address.billing.state : '');
    const [postCode, setPostCode] = useState(address.billing.address_1 ? address.billing.postcode : '');
    const [country, setCountry] = useState(address.billing.address_1 ? address.billing.country : generalSettings.country.name);

    //shipping address state
    const [shippingFirstName, setShippingFirstName] = useState(address.shipping.address_1 ? address.shipping.first_name : auth.meta.first_name);
    const [shippingLastName, setShippingLastName] = useState(address.shipping.address_1 ? address.shipping.last_name : auth.meta.last_name);
    const [shippingPhone, setShippingPhone] = useState(address.shipping.address_1 ? address.shipping.phone : auth.user.data.user_phone);
    const [shippingAddress1, setShippingAddress1] = useState(address.shipping.address_1 ? address.shipping.address_1 : '');
    const [shippingAddress2, setShippingAddress2] = useState(address.shipping.address_1 ? address.shipping.address_2 : '');
    const [shippingCity, setShippingCity] = useState(address.shipping.address_1 ? address.shipping.city : '');
    const [shippingState, setShippingState] = useState(address.shipping.address_1 ? address.shipping.state : '');
    const [shippingPostCode, setShippingPostCode] = useState(address.shipping.address_1 ? address.shipping.postcode : '');
    const [shippingCountry, setShippingCountry] = useState(address.shipping.address_1 ? address.shipping.country : generalSettings.country.name);

    const handleSubmit = () => {

        if (firstName === '') {
            showMessage({
                message: 'Please enter first name',
                type: 'danger',
            });
            return;
        }
        if (lastName === '') {
            showMessage({
                message: 'Please enter last name',
                type: 'danger',
            });
            return;
        }
        if (email === '') {
            showMessage({
                message: 'Please enter email',
                type: 'danger',
            });
            return;
        }
        if (phone === '') {
            showMessage({
                message: 'Please enter phone number',
                type: 'danger',
            });
            return;
        }
        if (address1 === '') {
            showMessage({
                message: 'Please enter address',
                type: 'danger',
            });
            return;
        }
        if (city === '') {
            showMessage({
                message: 'Please enter city',
                type: 'danger',
            });
            return;
        }
        if (state === '') {
            showMessage({
                message: 'Please enter state',
                type: 'danger',
            });
            return;
        }
        if (postCode === '') {
            showMessage({
                message: 'Please enter post code',
                type: 'danger',
            });
            return;
        }
        if (country === '') {
            showMessage({
                message: 'Please enter country',
                type: 'danger',
            });
            return;
        }
        const formData = {
            first_name: firstName,
            last_name: lastName,
            billing: {
                email: email,
                phone: phone,
                first_name: firstName,
                last_name: lastName,
                address_1: address1,
                address_2: address2,
                city: city,
                state: state,
                postcode: postCode,
                country: country,
            },
            shipping: {
                phone: phone,
                first_name: firstName,
                last_name: lastName,
                address_1: address1,
                address_2: address2,
                city: city,
                state: state,
                postcode: postCode,
                country: country,
            }
        }
        let updatedUser = { ...auth };
        updatedUser.meta.first_name = firstName;
        updatedUser.meta.last_name = lastName;
        // console.log('updatedUser', updatedUser);
        updateAddressReq(
            auth.user.data.ID,
            formData,
            navigation,
            setLoading,
            dispatch,
            'BottomTabScreen',
            updatedUser
        );

    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ ...GlobalStyle.Container }}>
                <AppBar
                    theme='dark'
                    title='Update Shipping Address'
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: Window.fixPadding }}>
                    <View style={{ width: '48%' }}>
                        <TextField2
                            label="First Name"
                            onChanged={setFirstName}
                            customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                            value={firstName}
                        />

                    </View>
                    <View style={{ width: '48%' }}>
                        <TextField2
                            label="Last Name"
                            onChanged={setLastName}
                            customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                            value={lastName}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '48%' }}>
                        <TextField2
                            label="Email"
                            onChanged={setEmail}
                            customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                            value={email}
                        />

                    </View>
                    <View style={{ width: '48%' }}>
                        <TextField2
                            label="Phone"
                            onChanged={setPhone}
                            customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                            value={phone}
                        />

                    </View>
                </View>
                <TextField2
                    label="Address Line 1"
                    onChanged={setAddress1}
                    customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                    value={address1}
                />
                <TextField2
                    label="Address Line 2 (optional)"
                    onChanged={setAddress2}
                    customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                    value={address2}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '48%' }}>
                        <TextField2
                            label="Country"
                            onChanged={setCountry}
                            customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                            value={country}
                            disabled={true}
                        />

                    </View>

                    <View style={{ width: '48%' }}>
                        {
                            generalSettings.states &&
                            <DropDown
                                label={"State"}
                                mode={"outlined"}
                                visible={showDropDown}
                                showDropDown={() => setShowDropDown(true)}
                                onDismiss={() => setShowDropDown(false)}
                                value={state}
                                setValue={setState}
                                list={generalSettings.states}
                                dropDownStyle={{ borderRaduis: 16 }}
                            />
                        }
                        {/* <TextField
                            placeholder={'state'}
                            placeholderTextColor={'rgba(8, 14, 30, 0.4)'}
                            onChanged={setState}
                            value={state}
                        /> */}
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '48%' }}>
                        <TextField2
                            label="city"
                            onChanged={setCity}
                            customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                            value={city}
                        />
                    </View>
                    <View style={{ width: '48%' }}>
                        <TextField2
                            label="postcode"
                            onChanged={setPostCode}
                            customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
                            value={postCode}
                        />

                    </View>

                </View>

                <View
                    style={{
                        // marginVertical: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Text
                        style={{
                            fontSize: 13,
                            fontFamily: Font.Gilroy_Bold,
                            color: Color.primary,
                        }}>
                        Default Billing Address
                    </Text>
                    <ToggleSwitch
                        isOn={switchActive}
                        onColor={Color.tertiary}
                        offColor="#E5E5E5"
                        thumbOnStyle={{ backgroundColor: '#fff' }}
                        thumbOffStyle={{ backgroundColor: '#fff' }}
                        size="medium"
                        onToggle={() => setSwitchActive(!switchActive)}
                    />
                </View>

                {
                    !switchActive &&
                    <BillingAddress state={{
                        shippingAddress1,
                        setShippingAddress1,
                        shippingAddress2,
                        setShippingAddress2,
                        shippingFirstName,
                        setShippingFirstName,
                        shippingLastName,
                        setShippingLastName,
                        shippingPhone,
                        setShippingPhone,
                        shippingCity,
                        setShippingCity,
                        shippingState,
                        setShippingState,
                        shippingPostCode,
                        setShippingPostCode,
                        shippingCountry,
                        setShippingCountry,
                        states: generalSettings.states
                    }}
                    />
                }
                <View style={{ marginVertical: 30 }}>
                    <Button
                        text="Update"
                        isIcon={false}
                        theme="tertiary"
                        loading={loading}
                        onPressFunc={handleSubmit}
                    />
                </View>

            </ScrollView>
        </SafeAreaView >
    );
};
export default AddAddress;
