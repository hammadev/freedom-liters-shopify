import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import AppBar from '../../../components/AppBar';
import { Color, Font, GlobalStyle, Window } from '../../../globalStyle/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CouponsnApply } from '../../../apis/coupons';
import { useEffect } from 'react';
import { CouponIcon } from '../../../assets/svgs/NotificationSvg';
const OfferVoucher = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingBottom: 32,
        // backgroundColor: Color.white,
        padding: 10,
        borderRadius: 16,
        alignItems: 'center',
      }}>
      <Image
        style={{ width: 104, height: 92 }}
        source={require('../../../assets/images/products/cashBack.png')}
      />

      <View style={{ paddingLeft: 16, flex: 1 }}>
        <Text style={{ ...GlobalStyle.heading, fontFamily: Font.Gilroy_Bold }}>
          {item.code}
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 12,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: Font.Gilroy_SemiBold,
              color: '#597766',
            }}>
            {item.status}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: Font.Gilroy_Medium,
              color: '#080E1E',
            }}>
            {item.amount}
          </Text>
        </View>

        {/* <View
          style={{
            flexDirection: 'row',
            width: Window.width / 1.8,
            paddingTop: 12,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: Font.Gilroy_SemiBold,
              color: Color.secondary,
            }}>
            {item.code}
          </Text>
          <Text style={GlobalStyle.textStlye}>{item.discount_type}</Text>
        </View> */}
      </View>
    </View>
  );
};

const Coupons = ({ }) => {
  const [couponsData, setCouponsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    CouponsnApply(setLoading, setCouponsData);
    //   return () => couponsData;
  }, []);

  console.log('couponsData', couponsData);
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <AppBar
        theme='dark'
        title='Vouchers'
      />

      <View style={{ marginTop: 40 }}>
        {couponsData.length > 0 ? (
          couponsData.map((item, index) => (
            <OfferVoucher item={item} key={index} />
          ))
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '20%' }}>
            <CouponIcon />
            <View>
              <Text style={{ ...GlobalStyle.heading, textAlign: 'center', marginTop: Window.fixPadding * 2 }}>Empty</Text>
              <Text style={{ ...GlobalStyle.textStlye, textAlign: 'center' }}>Coupon not found</Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Coupons;
