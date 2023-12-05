import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Window} from '../../../globalStyle/Theme';
import {VoucherSvg} from '../../../assets/svgs/ProfileSvgs';
import Header from '../../../components/Header';
import {COLORS, FONTS} from '../../../constants';

const Voucher = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header label={'Voucher'} />
      <View style={styles.emptyContainer}>
        <VoucherSvg />
        <View>
          <Text style={styles.text}>Empty</Text>
          <Text style={styles.subTitle}>No vouchers found</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Voucher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: FONTS.heading,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    textAlign: 'center',
  },
});
