import React, {useState} from 'react';
import {View, Text, ImageBackground, TouchableOpacity, Image, FlatList, ScrollView} from 'react-native';
import AppBar from '../../../components/AppBar';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AddressSvg, ChevronSvg, GiftSvg, LogoutSvg, PaymentMethodSvg, ProfileSvg} from '../../../assets/svgs/ProfileSvgs';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Logout from '../../../components/Logout';
import NotLogin from '../../../components/NotLogin';
import BottomPopupHOC from '../../../components/BottomPopupHOC';
import {StatusBar} from 'react-native';

const ProfilePages = ({item, popupState}) => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() => (item.navlink == 'logoutFunc' ? popupState(true) : navigation.navigate(item.navlink))}
        style={{
          justifyContent: 'space-between',
          paddingBottom: 20,
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
        <ChevronSvg />
      </TouchableOpacity>
    </>
  );
};

const Profile = ({navigation}) => {
  const {auth} = useSelector(state => ({...state}));

  if (!auth) {
    return <NotLogin />;
  }

  const [logoutAlertPopup, setLogoutAlertPopup] = useState(false);

  return (
    <SafeAreaView style={{backgroundColor: Color.light, flex: 1}}>
      <StatusBar barStyle={'light-content'} backgroundColor={Color.tertiary} />
      <ScrollView scrollEventThrottle={16} contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          resizeMode="cover"
          imageStyle={{
            borderBottomRightRadius: 16,
            borderBottomLeftRadius: 16,
            width: '100%',
            height: '100%',
          }}
          style={{
            height: Window.height / 3,
            backgroundColor: Color.tertiary,
            borderBottomRightRadius: 16,
            borderBottomLeftRadius: 16,
          }}>
          <AppBar customStyle={{paddingHorizontal: 20}} />
          <View style={{position: 'relative', alignSelf: 'center'}}>
            <Image style={{width: 94, height: 94}} source={require('../../../assets/images/pics/profile.png')} />
          </View>

          <Text
            style={{
              ...GlobalStyle.heading,
              textAlign: 'center',
              marginTop: 24,
              color: Color.white,
            }}></Text>
        </ImageBackground>

        <FlatList
          style={{paddingTop: 20}}
          contentContainerStyle={{paddingHorizontal: 20}}
          data={ProfileData}
          renderItem={({item}) => <ProfilePages popupState={item.navlink == 'logoutFunc' && setLogoutAlertPopup} item={item} />}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: 15}} />}
        />
      </ScrollView>

      <BottomPopupHOC
        title="Alert"
        PopupBody={<Logout auth={auth} setVisible={setLogoutAlertPopup} />}
        visible={logoutAlertPopup}
        setVisible={setLogoutAlertPopup}
      />
    </SafeAreaView>
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
    icon: <PaymentMethodSvg />,
    name: 'My Orders',
    chevron: <ChevronSvg />,
    navlink: 'MyOrder',
  },
  {
    icon: <GiftSvg />,
    name: 'Vouchers',
    chevron: <ChevronSvg />,
    navlink: 'Coupons',
  },
  {
    icon: <LogoutSvg />,
    name: 'Log Out',
    chevron: <ChevronSvg />,
    navlink: 'logoutFunc',
  },
];
