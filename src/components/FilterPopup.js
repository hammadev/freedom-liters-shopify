import {
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,

} from 'react-native';
import React, { useState } from 'react';
import { Font, Window, Color, GlobalStyle } from '../globalStyle/Theme';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import Icon from '../core/Icon';
// import Slider from 'rn-range-slider';

const Variations = ({ item, active, setActive }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        setActive(item.id)
      }
      style={{ marginHorizontal: 5, width: 49, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: active === item.id ? Color.tertiary : '#FAF7F1' }}>
      <Text style={{ fontFamily: Font.Gilroy_SemiBold, fontSize: 15, color: active === item.id ? Color.white : Color.secondary }}  >
        {item.size}
      </Text>
    </TouchableOpacity>
  )
}

const Category = ({ item, active, setActive }) => {
  return (
    <TouchableOpacity
      onPress={() => setActive(item.id)}
      style={{ marginRight: 16, marginBottom: 12, justifyContent: 'center', alignItems: "center", backgroundColor: active === item.id ? Color.tertiary : '#FAF7F1', width: Window.width / 7, height: 40, borderRadius: 100 }}
    >
      <Text style={{
        color: active === item.id ? Color.white : 'rgba(8, 14, 30, 0.4)',
        fontFamily: Font.Gilroy_Medium,
        fontSize: 13,
      }}>{item.category}</Text>
    </TouchableOpacity>
  )
}

const FilterPopup = ({ onTouchOutside, openFilterPopup }) => {
  const navigation = useNavigation();
  const [active, setActive] = useState(1);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState(1);


  activeCategory


  const renderOutsideTouchable = onTouch => {
    const view = <View style={{ flex: 1, width: '100%' }} />;
    if (!onTouch) {
      return view;
    }
    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{ flex: 1, width: '100%' }}>
        {view}
      </TouchableWithoutFeedback>
    );
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={openFilterPopup}
      onRequestClose={onTouchOutside}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000AA',
          justifyContent: 'flex-end',
        }}>
        {renderOutsideTouchable(onTouchOutside)}
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            borderTopRightRadius: 44,
            borderTopLeftRadius: 44,
            height: Window.height * 0.7,
          }}>
          <View style={{ flex: 1 }}>
            <Text style={{
              color: Color.primary,
              fontFamily: Font.Gilroy_SemiBold,
              fontSize: 17,
              paddingHorizontal: 20,
              textAlign: 'center',
              marginTop: 24
            }}>
              Filters
            </Text>
            <View style={{ ...GlobalStyle.borderStyle, marginHorizontal: 20 }}></View>


            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, }}>
              <Text style={{
                color: Color.primary,
                fontFamily: Font.Gilroy_SemiBold,
                fontSize: 15,
              }}>
                Price Range
              </Text>
            </View>

            <View style={{ ...GlobalStyle.borderStyle, marginHorizontal: 20 }}></View>


            <View style={{ marginTop: 28, paddingHorizontal: 20, }}>
              <Text style={{
                color: Color.primary,
                fontFamily: Font.Gilroy_SemiBold,
                fontSize: 15,
              }}>
                Sizes
              </Text>
            </View>
            <View>
              <FlatList
                style={{ marginTop: 20, }}
                contentContainerStyle={{ paddingHorizontal: 20, }}
                data={VariationsData}
                renderItem={({ item }) => (
                  <Variations item={item} active={active} setActive={setActive} />
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
              />
            </View>
            <View style={{ ...GlobalStyle.borderStyle, marginHorizontal: 20 }}></View>

            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
              <Text style={{
                color: Color.primary,
                fontFamily: Font.Gilroy_SemiBold,
                fontSize: 15,
              }}>
                Category
              </Text>

              <FlatList
                style={{ marginTop: 20, }}
                contentContainerStyle={{ paddingHorizontal: 0, }}
                data={CategoryData}
                renderItem={({ item }) => (
                  <Category item={item} active={activeCategory} setActive={setActiveCategory} />
                )}
                numColumns={3}
                // horizontal={false}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
              />
            </View>
            <View style={{ ...GlobalStyle.borderStyle, marginHorizontal: 20 }}></View>


            <View style={{ flex: 1, marginTop: 20, paddingHorizontal: 20 }}>
              <Button
                text="Apply"
                isIcon={false}
                theme="tertiary"
                onPressFunc={() => onTouchOutside()}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const VariationsData = [
  {
    size: '32',
    id: 1,
  },
  {
    size: '32',
    id: 2,
  },
  {
    size: '32',
    id: 3,
  },
  {
    size: '32',
    id: 4,
  },
  {
    size: '32',
    id: 5,
  },

  {
    size: '32',
    id: 6,
  },

]
const CategoryData = [
  {
    category: 'All',
    id: 1,
  },
  {
    category: 'Women',
    id: 2,
  },
  {
    category: 'Men',
    id: 3,
  },
  {
    category: 'Boys',
    id: 4,
  },
  {
    category: 'Girls',
    id: 5,
  },

]
export default FilterPopup;

