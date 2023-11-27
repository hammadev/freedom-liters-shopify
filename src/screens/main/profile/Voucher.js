import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppBar from '../../../components/AppBar'
import { Window,GlobalStyle } from '../../../globalStyle/Theme'
import { VoucherSvg } from '../../../assets/svgs/ProfileSvgs'

const Voucher = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppBar
                theme="light"
                center={<Text style={{ ...GlobalStyle.heading, fontSize: 22, color: 'black' }}> Voucher</Text>}
                customStyle={{ paddingHorizontal: Window.fixPadding * 2 }}
            />
            <FlatList
        contentContainerStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: Window.fixPadding * 2,
          paddingVertical: Window.fixPadding,
          flexDirection: 'row',
        }}
        style={{flex: 1}}
        data={[]}
        renderItem={({item}) => <Text></Text>}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{width: 15}} />}
        ListEmptyComponent={() => (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '20%'}}>
            <VoucherSvg/>
            <View>
              <Text style={{...GlobalStyle.heading, textAlign: 'center', marginTop: Window.fixPadding * 2}}>Empty</Text>
              <Text style={{...GlobalStyle.textStlye, textAlign: 'center', marginVertical: Window.fixPadding}}>
                No vouchers found
              </Text>
              {/* <Button text="Explore products" isIcon={false} theme="tertiary" navLink="ProductListing" /> */}
            </View>
          </View>
        )}
      />
            
        </SafeAreaView>
    )
}

export default Voucher

const styles = StyleSheet.create({})