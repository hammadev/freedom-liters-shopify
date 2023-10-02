import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Color, Font, Window } from '../../../globalStyle/Theme';
import { EditSvg } from '../../../assets/svgs/CheckoutSvg';
import AddAddress from './AddAddress';

const AddressListing = () => {
  return (
    <View
          style={{
            backgroundColor: Color.white,
            padding: 15,
            marginTop: Window.fixPadding,
            borderRadius: 16,
            shadowColor: 'rgba(0,0,0,0.1)',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4.84,
            elevation: 22,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{}}>Shipping To :</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddAddress')}>
              <EditSvg />
            </TouchableOpacity>
          </View>
          {address.shipping.address_1 ? (
            <View style={{marginTop: Window.fixPadding}}>
              <Text
                style={{
                  fontSize: 11,
                  color: 'rgba(8, 14, 30, 0.6)',
                  fontFamily: Font.Gilroy_Medium,
                  lineHeight: 16,
                }}>
                Name :
                
              </Text>

              <Text
                style={{
                  fontSize: 11,
                  color: 'rgba(8, 14, 30, 0.6)',
                  fontFamily: Font.Gilroy_Medium,
                  lineHeight: 16,
                }}>
                Phone Number : 
              </Text>

              <Text
                style={{
                  fontSize: 11,
                  color: 'rgba(8, 14, 30, 0.6)',
                  fontFamily: Font.Gilroy_Medium,
                  lineHeight: 16,
                }}>
                Address :{' '}
                
              </Text>
            </View>
          ) : (
            <Text
              style={{
                ...GlobalStyle.textStlye,
                color: 'red',
                fontSize: 12,
                marginTop: Window.fixPadding,
              }}>
              * Edit shipping address before proceeding to checkout
            </Text>
          )}
        </View> 
  )
}

export default AddressListing;

const styles = StyleSheet.create({})