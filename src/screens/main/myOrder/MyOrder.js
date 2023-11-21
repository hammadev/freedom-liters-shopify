import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Color, Window, GlobalStyle} from '../../../globalStyle/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../../components/AppBar';
import {useSelector} from 'react-redux';
import NotLogin from '../../../components/NotLogin';
import {CartEmptyIcon} from '../../../assets/svgs/NotificationSvg';

const MyOrder = () => {
  const {auth} = useSelector(state => ({...state}));
  if (!auth) {
    return <NotLogin />;
  }
  return (
    <SafeAreaView style={{...GlobalStyle.Container, paddingHorizontal: 0}}>
      <View style={{paddingHorizontal: 20}}>
        <AppBar
          theme="light"
          center={<Text style={{...GlobalStyle.heading, fontSize: 22, color: 'black'}}> Order</Text>}
          title="My Orders"
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CartEmptyIcon />
      </View>
    </SafeAreaView>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  menuButton: {
    borderRadius: Window.width * 0.05,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: Window.fixPadding / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: Color.white,
  },
  menuText: {
    ...GlobalStyle.textStlye,
    textTransform: 'capitalize',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: 200,
    height: 200,
  },
  sideView: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'column',
  },
  sideImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
