import {
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {Font, Window, Color, GlobalStyle} from '../globalStyle/Theme';
import {useNavigation} from '@react-navigation/native';
import Icon from '../core/Icon';
import TextField2 from './TextFeild2';
import Button from './Button';

const EditAddress = ({onTouchOutside, visibeleAddress}) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address1, setAddress1] = useState();
  const [province, setProvince] = useState();
  const [country, setCountry] = useState();
  const [zip, setZip] = useState();
  const [city, setCity] = useState();
  const [loading, setLoading] = useState();

  const renderOutsideTouchable = onTouch => {
    const view = <View style={{flex: 1, width: '100%'}} />;
    if (!onTouch) {
      return view;
    }
    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{flex: 1, width: '100%'}}>
        {view}
      </TouchableWithoutFeedback>
    );
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibeleAddress}
      onRequestClose={onTouchOutside}
      style={{}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000AA',
          justifyContent: 'flex-end',
        }}>
        {renderOutsideTouchable(onTouchOutside)}
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            borderTopRightRadius: 36,
            borderTopLeftRadius: 36,
            paddingVertical: Window.fixPadding * 2.5,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: Window.fixPadding,
              paddingBottom: Window.fixPadding,

            }}>
            <Text style={GlobalStyle.heading}>Update Address</Text>
            <TouchableOpacity
              onPress={() => onTouchOutside()}
              style={{
                borderRadius: 7,
                borderColor: Color.secondary,
                borderWidth: 1,
              }}>
              <Icon
                iconFamily={'Entypo'}
                name="cross"
                size={25}
                color={Color.secondary}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: '48%'}}>
              <TextField2
                label="firstName"
                onChanged={setFirstName}
                customStyle={{marginBottom: Window.fixPadding * 1.5}}
                value={firstName}
              />
            </View>
            <View style={{width: '48%'}}>
              <TextField2
                label="lastName"
                onChanged={setLastName}
                customStyle={{marginBottom: Window.fixPadding * 1.5}}
                value={lastName}
              />
            </View>
          </View>

          <TextField2
            label="address1"
            onChanged={setAddress1}
            customStyle={{marginBottom: Window.fixPadding * 1.5}}
            value={address1}
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: '48%'}}>
              <TextField2
                label="province"
                onChanged={setProvince}
                customStyle={{marginBottom: Window.fixPadding * 1.5}}
                value={province}
              />
            </View>

            <View style={{width: '48%'}}>
              <TextField2
                label="country"
                onChanged={setCountry}
                customStyle={{marginBottom: Window.fixPadding * 1.5}}
                value={country}
              />
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
              <TextField2
                label="zip"
                onChanged={setZip}
                customStyle={{marginBottom: Window.fixPadding * 1.5}}
                value={zip}
              />
            </View>
            <View style={{width: '48%'}}>
              <TextField2
                label="city"
                onChanged={setCity}
                customStyle={{marginBottom: Window.fixPadding * 1.5}}
                value={city}
              />
            </View>
          </View>
        <View style={{ paddingTop: 10  }}>
        <Button
          text="Update Address"
          isIcon={false}
          theme="tertiary"
          navLink='Profile'
          loading={loading}
          // onPressFunc={handleSubmit}
        />
      </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditAddress;

const styles = StyleSheet.create({
  textStlye: {
    fontSize: 13,
    fontFamily: Font.Gilroy_SemiBold,
    color: Color.secondary,
    paddingVertical: 5,
  },
  textStlyeTwo: {
    fontSize: 15,
    fontFamily: Font.Gilroy_Medium,
    color: Color.secondary,
    paddingVertical: 3,
  },
});
