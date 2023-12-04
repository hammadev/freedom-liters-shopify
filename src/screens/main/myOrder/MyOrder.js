import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {Color, Window, GlobalStyle} from '../../../globalStyle/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../../components/AppBar';
import {useSelector} from 'react-redux';
import NotLogin from '../../../components/NotLogin';
import {CartEmptyIcon} from '../../../assets/svgs/NotificationSvg';
import Header from '../../../components/Header';
import {COLORS} from '../../../constants';

const MyOrder = () => {
  const {auth} = useSelector(state => ({...state}));
  if (!auth) {
    return <NotLogin />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header label="My Order" hideBackButton />

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
  container: {flex: 1, backgroundColor: COLORS.white},
});
