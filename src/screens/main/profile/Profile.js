import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import {
  AddressSvg,
  ChevronSvg,
  GiftSvg,
  LogoutSvg,
  ProfileSvg,
} from '../../../assets/svgs/ProfileSvgs';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Logout from '../../../components/Logout';
import NotLogin from '../../../components/NotLogin';
import BottomPopupHOC from '../../../components/BottomPopupHOC';
import {COLORS} from '../../../constants';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';

const ProfilePages = ({item, popupState}) => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          item.navlink == 'logoutFunc'
            ? popupState(true)
            : item.navlink
            ? navigation.navigate(item.navlink)
            : console.log('no link')
        }
        style={{
          justifyContent: 'space-between',
          marginBottom: 20,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 22,
              backgroundColor: '#FAF7F1',
              width: 40,
              height: 40,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {item.icon}
          </View>
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 15,
              fontFamily: Font.Gilroy_SemiBold,
              color: Color.primary,
            }}>
            {item.name}
          </Text>
        </View>
        {item.name == 'Log Out' ? null : <ChevronSvg />}
      </TouchableOpacity>
    </>
  );
};

const Profile = ({navigation}) => {
  const [logoutAlertPopup, setLogoutAlertPopup] = useState(false);
  const {auth} = useSelector(state => ({...state}));
  if (!auth) {
    return <NotLogin />;
  }

  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={'light-content'}
        showHideTransition={'fade'}
        translucent
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          resizeMode="cover"
          imageStyle={{
            borderBottomRightRadius: 16,
            borderBottomLeftRadius: 16,
            width: '100%',
            height: '100%',
          }}
          style={{
            height: Window.height / 3.5,
            backgroundColor: Color.tertiary,
            borderBottomRightRadius: 16,
            borderBottomLeftRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{width: 94, height: 94}}
              source={require('../../../assets/images/pics/profile.png')}
            />
            <Text
              style={{
                ...GlobalStyle.heading,
                textAlign: 'center',
                marginTop: 10,
                color: Color.white,
              }}>
              Profile
            </Text>
          </View>
        </ImageBackground>

        <FlatList
          style={{paddingTop: 20}}
          contentContainerStyle={{paddingHorizontal: 20}}
          data={ProfileData}
          renderItem={({item}) => (
            <ProfilePages
              popupState={item.navlink == 'logoutFunc' && setLogoutAlertPopup}
              item={item}
            />
          )}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: 15}} />}
        />
      </ScrollView>

      <BottomPopupHOC
        title="Logout"
        color={COLORS.primary}
        PopupBody={<Logout auth={auth} setVisible={setLogoutAlertPopup} />}
        visible={logoutAlertPopup}
        setVisible={setLogoutAlertPopup}
      />
    </View>
  );
};

export default Profile;

const ProfileData = [
  {
    icon: <ProfileSvg />,
    name: 'Personal Info',
    chevron: <ChevronSvg />,
    navlink: 'PersonalInfo',
  },
  {
    icon: <AddressSvg />,
    name: 'Address',
    chevron: <ChevronSvg />,
    navlink: 'AddressListing',
  },
  {
    icon: <AddressSvg />,
    name: 'Wishlist',
    chevron: <ChevronSvg />,
    navlink: 'WishList',
  },
  {
    icon: <GiftSvg />,
    name: 'Vouchers',
    chevron: <ChevronSvg />,
    navlink: 'Voucher',
  },
  {
    icon: <LogoutSvg />,
    name: 'Log Out',
    navlink: 'logoutFunc',
  },
];
