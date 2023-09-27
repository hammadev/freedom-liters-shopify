import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import Appbar from '../../../components/AppBar';
import { Color, Font, GlobalStyle, Window } from '../../../globalStyle/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../../core/Icon';
import {
  MessagesrSvg,
  NotificationSvg,
  ParcelSvg,
} from '../../../assets/svgs/OrderSvgs';
import { useEffect } from 'react';

const Tabs = ({ item, activeTabs, setActiveTabs }) => {
  return (
    <TouchableOpacity
      onPress={() => setActiveTabs(item.id)}
      style={{
        borderRadius: activeTabs === item.id ? 16 : 0,
        width: Window.width / 2.5,
        marginHorizontal: 0,
        height: 114,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: activeTabs === item.id ? Color.tertiary : Color.light,
      }}>
      <View style={{ alignItems: 'center' }}>
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
            width: 56,
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            backgroundColor: activeTabs === item.id ? '#FAF7F1' : '#FAF7F1',
          }}>
          {item.icon}
        </View>
        <Text
          style={{
            marginTop: 10,
            fontSize: 13,
            fontFamily: Font.Gilroy_SemiBold,
            color: activeTabs === item.id ? Color.white : Color.primary,
          }}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const OrdersDetails = ({ item }) => {
  return (
    <View
      style={{
        flex: 1,
        marginBottom: 32,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{ flex: 5, flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            shadowColor: 'rgba(0,0,0,0.3)',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 22,
            borderRadius: 16,
            backgroundColor: '#FAF7F1',
            width: 64,
            height: 64,
          }}>
          <Image
            source={require('../../../assets/images/products/poloShirt.png')}
          />
        </View>
        <View style={{ paddingLeft: 16 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Font.Gilroy_SemiBold,
              color: Color.primary,
            }}>
            {item.text}
          </Text>
          <Text
            style={{
              marginTop: 6,
              fontSize: 13,
              fontFamily: Font.Gilroy_Regular,
              color: Color.secondary,
              opacity: 0.6,
            }}>
            status :
            <Text
              style={{
                marginTop: 6,
                fontSize: 15,
                fontFamily: Font.Gilroy_SemiBold,
                color: Color.tertiary,
              }}>
              {' '}
              {item.productName}
            </Text>
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: Font.Gilroy_SemiBold,
            color: '#363B44',
          }}>
          7:12 PM
        </Text>
        <Text
          style={{
            fontSize: 11,
            fontFamily: Font.Gilroy_Medium,
            color: '#656872',
            opacity: 0.6,
            marginTop: 6,
          }}>
          Yesterday
        </Text>
      </View>
    </View>
  );
};
const Notifications = ({ item }) => {
  return (
    <View
      style={{
        flex: 1,
        marginBottom: 32,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{ flex: 5, flexDirection: 'row', alignItems: 'center' }}>
        <Image source={item.img} />
        <View style={{ paddingLeft: 16 }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: Font.Gilroy_SemiBold,
              color: Color.secondary,
              opacity: 0.6,
            }}>
            {item.text}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: Font.Gilroy_SemiBold,
              color: Color.secondary,
              opacity: 0.6,
            }}>
            {item.productName}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 15,
          fontFamily: Font.Gilroy_Medium,
          color: 'rgba(8, 14, 30, 0.6)',
        }}>
        7:12 PM
      </Text>
    </View>
  );
};

const Orders = ({ item, navigation }) => {
  const [activeTabs, setActiveTabs] = useState(1);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: Color.light,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <Appbar
          center={
            <Text style={{ ...GlobalStyle.heading, fontSize: 22 }}>Messages</Text>
          }
          right={<Text>dfsd</Text>}
        />
      </View>
      <ScrollView
        style={{ backgroundColor: Color.light }}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ paddingHorizontal: 0, alignItems: 'center' }}>
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            style={{ marginTop: 18 }}
            data={TabsData}
            renderItem={({ item }) => (
              <Tabs
                item={item}
                setActiveTabs={setActiveTabs}
                activeTabs={activeTabs}
              />
            )}
            // numColumns={3}
            horizontal={true}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
          />
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 48 }}>
          <Text
            style={{
              fontSize: 15,
              paddingBottom: 32,
              fontFamily: Font.Gilroy_SemiBold,
              color: Color.primary,
            }}>
            New
          </Text>
          {activeTabs === 1
            ? OrdersData.map((item, index) => (
              <OrdersDetails item={item} key={index} />
            ))
            : NotificationsData.map((item, index) => (
              <Notifications item={item} key={index} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Orders;
const TabsData = [
  {
    icon: <ParcelSvg />,
    name: 'Orders',
    id: 1,
  },
  {
    icon: <NotificationSvg />,
    name: 'Notifications',
    id: 2,
  },
];

const OrdersData = [
  {
    img: require('../../../assets/images/products/shoes.png'),
    text: '50% OFF in ultraboost All',
    productName: 'Terrain LTD Shoes',
  },
  {
    img: require('../../../assets/images/products/shoes.png'),
    text: '50% OFF in ultraboost All',
    productName: 'Terrain LTD Shoes',
  },
];
const NotificationsData = [
  {
    img: require('../../../assets/images/products/shoes.png'),
    text: '50% OFF in ultraboost All',
    productName: 'Terrain LTD Shoes',
  },
  {
    img: require('../../../assets/images/products/shoes.png'),
    text: '50% OFF in ultraboost All',
    productName: 'Terrain LTD Shoes',
  },
];
