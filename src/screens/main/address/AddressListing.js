import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../../components/AppBar';
import {GlobalStyle, Font, Window, Color} from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import {RadioButton} from 'react-native-paper';
import {SkypeIndicator} from 'react-native-indicators';
import {useRef} from 'react';
import {useBackButton} from '../../../hooks';
import EditAddress from '../../../components/EditAddress';
import AddAddress from '../../../components/AddAddress';
import Button from '../../../components/Button';

const DeliverTo = ({
  item,
  setRadioState,
  radioState,
  deleteHandler,
  navigation,
  editIcon,
  showModal,
}) => {
  const swipeRef = useRef(null);
  const RadioClick = itemID => {
    setRadioState(itemID);
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
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '65%'}}>
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
              <Icon
                iconFamily={'Ionicons'}
                name="ios-location-sharp"
                size={16}
                color={Color.light}
              />
            </View>
          </View>
          <View style={{}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{...styles.Heading}}>{item.name}</Text>

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
                  {item.default}
                </Text>
              </View>
            </View>
            <Text style={{...styles.TextStyle, marginTop: 5}} numberOfLines={2}>
              {item.address}
            </Text>
          </View>
        </View>
        {editIcon ? (
          <TouchableOpacity onPress={() => showModal()} style={{}}>
            <Icon
              iconFamily={'MaterialCommunityIcons'}
              name="pencil-minus"
              size={20}
              color={Color.tertiary}
            />
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
  const [radioCheck, setRadioCheck] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editIcon, setEditIcon] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibeleAddress, setVisibeleAddress] = useState(false);

  const onBackPress = () => {
    navigation.goBack();
    return true;
  };

  useBackButton(navigation, onBackPress);

  const hideModal = () => {
    setVisibeleAddress(false);
  };
  const showModal = () => {
    setVisibeleAddress(true);
  };

  const addressHideModal = () => {
    setVisible(false);
  };
  const addressShowModal = () => {
    setVisible(true);
  };

  return (
    
     <SafeAreaView style={{backgroundColor: Color.light, flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor={Color.light}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      />
      <View style={{paddingHorizontal: Window.fixPadding * 2}}>
        <AppBar theme="dark" header="solid" />
      </View>
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
        <TouchableOpacity
          onPress={() => setEditIcon(!editIcon)}
          style={{width: 50, alignItems: 'center'}}>
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

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20}}>
        {Data.map((item, i) => (
          <DeliverTo
            item={item}
            key={i}
            radioState={radioCheck}
            setRadioState={setRadioCheck}
            navigation={navigation}
            editIcon={editIcon}
            showModal={showModal}
          />
        ))}
      </ScrollView>

      <View
        style={[
          styles.BottomButtonContainer,
          {paddingHorizontal: Window.fixPadding * 2},
        ]}>
        <Button text="Add New Address" theme="tertiary" onPressFunc={addressShowModal} />
      </View>

      {/* {loading && (
              <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#000000AA',
              }}>
              <SkypeIndicator size={50} color={Color.grey} />
              </View>
            )} */}
      <EditAddress
        ref={target => (popupRef = target)}
        onTouchOutside={hideModal}
        visibeleAddress={visibeleAddress}
        showModal={showModal}
      />
        <AddAddress
          ref={target => (popupRef = target)}
          onTouchOutside={addressHideModal}
          visible={visible}
          addressShowModal={addressShowModal}
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

const Data = [
  {
    name: 'Home',
    address: '21833 Clyde Gallagher, PC 4662',
    default: 'default',
    id: 1,
  },
  {
    name: 'Office',
    address: '6993 Meadow Valley Terra, PC 36',
    id: 2,
  },
  {
    name: 'Collage',
    address: '21833 Clyde Gallagher, PC 4662',
    id: 3,
  },
  {
    name: 'Apartment',
    address: '6993 Meadow Valley Terra, PC 36',
    default: 'default',
    id: 4,
  },
];
