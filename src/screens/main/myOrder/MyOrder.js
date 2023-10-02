import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList
} from 'react-native';
import { Color, Font, Window, GlobalStyle } from '../../../globalStyle/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../../../components/AppBar';
import { OrderListing } from '../../../apis/order';
import { useDispatch, useSelector } from 'react-redux';
import OrderSummary from '../../../components/OrderSummary';
import { CartEmptyIcon, CouponIcon } from '../../../assets/svgs/NotificationSvg';
import { SkypeIndicator } from 'react-native-indicators';
import Icon from '../../../core/Icon';
import NotLogin from '../../../components/NotLogin';
const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
  const day = dateTime.getDate().toString().padStart(2, '0');
  let hours = dateTime.getHours();
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds = dateTime.getSeconds().toString().padStart(2, '0');
  let meridiem = 'AM';

  if (hours > 12) {
    hours -= 12;
    meridiem = 'PM';
  } else if (hours === 12) {
    meridiem = 'PM';
  } else if (hours === 0) {
    hours = 12;
  }

  return `${day}-${month}-${year} ${hours}:${minutes} ${meridiem}`;
};

const PopularProducts = ({
  item,
  navigation,
  setVisible,
  showModal,
  setActiveData,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setActiveData(item), showModal(true);
      }}
      style={{
        // paddingHorizontal: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Window.fixPadding * 1.5,
        flex: 1,
        backgroundColor: Color.white,
        padding: Window.fixPadding * 2,
        borderRadius: Window.fixPadding
      }}>

      <View style={{ width: 64, height: 64, borderRadius: 16, position: 'relative', backgroundColor: Color.tertiary, justifyContent: 'center', alignItems: 'center' }}>
        <Icon name={'box-open'} iconFamily={'FontAwesome5'} size={30} color={Color.white} />
        {/* <Image
          style={{ width: 64, height: 64, borderRadius: 16 }}
          source={{ uri: item.line_items[0]?.image.src }}
        />
        <Image
          style={{ width: 64, height: 64, borderRadius: 16, position: 'absolute', left: 10 }}
          source={{ uri: item.line_items[0]?.image.src }}
        /> */}

      </View>

      <View style={{ paddingLeft: 10.55, flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 6,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                color: '#080E1E',
                fontFamily: Font.Gilroy_Regular,
                fontSize: 13,
              }}>
              Order Id:
            </Text>
            <Text
              style={{
                color: '#1B2336',
                fontFamily: Font.Gilroy_SemiBold,
                fontSize: 15,
              }}>
              {' #' + item.order_key.replace('wc_order_', '')}
            </Text>
          </View>

        </View>

        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 6 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: '#080E1E',
                fontFamily: Font.Gilroy_Regular,
                fontSize: 13,
              }}>
              Status:
            </Text>
            <Text
              style={{
                color: Color.tertiary,
                fontFamily: Font.Gilroy_SemiBold,
                fontSize: 15,
                paddingLeft: 5,
              }}>
              {item.status}
            </Text>

          </View>
          <Text
            style={{
              color: Color.secondary,
              fontFamily: Font.Gilroy_SemiBold,
              fontSize: 15,
              paddingLeft: 10,
            }}>
            $ {item.total}
          </Text>
        </View>
        <Text
          style={{
            color: 'rgba(8, 14, 30, 0.6)',
            fontFamily: Font.Gilroy_Medium,
            fontSize: 13,
            // alignSelf: 'flex-end'
          }}>
          {formatDateTime(item.date_created_gmt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const MyOrder = ({ item }) => {
  const { auth } = useSelector(state => ({ ...state }));

  if (!auth) {
    return (
      <NotLogin />
    );
  }

  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState('any');
  const [activeBg, setActiveBg] = useState(0);
  const [activeData, setActiveData] = useState(null);
  const [visible, setVisible] = useState(false);


  const MenuItem = ({ item, setActive }) => (
    <TouchableOpacity
      onPress={() => {
        setActive(item.name), setActiveBg(item.id);
      }}
      style={{
        ...styles.menuButton,
        backgroundColor: activeBg === item.id ? Color.tertiary : Color.white,
        marginBotton: 0,
      }}
    // onPress={() => setCategory(item.id)}
    >
      <Text
        style={{
          ...styles.menuText,
          color: activeBg === item.id ? 'white' : Color.secondary,
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const hideModal = () => {
    setVisible(false);
  };
  const showModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    // console.log(auth.user.data.ID)
    OrderListing(setLoading, setOrderList, auth.user.data.ID);
    return () => OrderListing;
  }, []);

  return (
    <SafeAreaView style={{ ...GlobalStyle.Container, paddingHorizontal: 0 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <AppBar
          theme='dark'
          title='My Orders'
        />
      </View>

      <View
        style={{
          marginTop: 10,
        }}>
        <FlatList
          style={{
            marginTop: 0,
          }}
          contentContainerStyle={{
            justifyContent: 'center',
            paddingHorizontal: 20,
            // flex: 1,
          }}
          data={[
            // {id: 0, name: 'any'},
            { id: 0, name: 'any' },
            { id: 1, name: 'processing' },
            { id: 2, name: 'cancelled' },
            { id: 3, name: 'completed' },
            { id: 4, name: 'on-hold' },
          ]}
          horizontal={true}
          renderItem={({ item }) => (
            <MenuItem item={item} setActive={setActive} />
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        // ItemSeparatorComponent={() => <View style={{width: 15}} />}
        />
        {
          loading ?
            <SkypeIndicator />
            :
            <FlatList
              style={{ marginTop: 0, paddingHorizontal: 20 }}
              contentContainerStyle={{ paddingBottom: Window.fixPadding * 14 }}
              data={
                active == 'any' ? orderList : orderList.filter(x => x.status === active)
              }
              renderItem={({ item }) => (
                <PopularProducts
                  visible={visible}
                  setVisible={setVisible}
                  setActiveData={setActiveData}
                  showModal={showModal}
                  setActive={setActive}
                  item={item}
                />
              )}
              ListEmptyComponent={() =>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '20%' }}>
                  <CartEmptyIcon />
                  <View>
                    <Text style={{ ...GlobalStyle.heading, textAlign: 'center', marginTop: Window.fixPadding * 2 }}>Empty</Text>
                    <Text style={{ ...GlobalStyle.textStlye, textAlign: 'center' }}>You do not have an active order at this time</Text>
                  </View>
                </View>
              }
              // numColumns={2}
              // horizontal={false}
              showsVerticalScrollIndicator={false}
            // ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
            />
        }
      </View>
      {activeData && (
        <OrderSummary
          ref={target => (popupRef = target)}
          onTouchOutside={hideModal}
          visible={visible}
          summaryData={activeData}
          showModal={showModal}
        />
      )}
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
    backgroundColor: Color.white
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
