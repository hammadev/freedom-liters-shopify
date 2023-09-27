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
import { RadioButton } from 'react-native-paper';


const SortDetails = ({ item, radioState, setActive, active, setRadioState }) => {
  // const RadioClick = () => {
  //   setRadioState();
  // };
  return (
    <>
      <TouchableOpacity
        onPress={() => setActive(item.id)}
        style={{
          justifyContent: 'space-between', backgroundColor: active === item.id ? '#FAF7F1' : Color.white,
          paddingHorizontal: 20, paddingVertical: 10,
          alignItems: 'center', flexDirection: 'row'
        }}
      >
        <Text style={{
          color: Color.primary,
          fontFamily: Font.Gilroy_Medium,
          fontSize: 15,
        }}>{item.name}
        </Text>
        <RadioButton
          uncheckedColor={Color.primary}
          color={Color.tertiary}
          value="first"
          status={radioState ? 'checked' : 'unchecked'}
        // onPress={() => RadioClick(item.id)}
        />
      </TouchableOpacity>
      <View style={{ ...GlobalStyle.borderStyle, marginBottom: 10, marginTop: 10, marginHorizontal: 0 }}></View>
    </>
  )

}
const SortPopup = ({ onTouchOutside, openPopup }) => {
  const navigation = useNavigation();
  const [active, setActive] = useState(1);
  const [radioState, setRadioState] = useState(1)


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
      visible={openPopup}
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
            // paddingHorizontal: 25,
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
              Sort By
            </Text>
            <View style={{ ...GlobalStyle.borderStyle, marginHorizontal: 20 }}></View>

            <FlatList
              style={{}}
              contentContainerStyle={{ paddingHorizontal: 20, }}
              data={SortData}
              renderItem={({ item }) => (
                <SortDetails item={item} active={active} setActive={setActive} radioState={radioState} setRadioState={setRadioState} />
              )}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
            />
            <View style={{ marginTop: 0, paddingHorizontal: 20 }}>
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
export default SortPopup;

const SortData = [
  {
    name: 'Popular',
    id: 1,
  },
  {
    name: 'Newest',
    id: 2,
  },
  {
    name: 'Customer Review',
    id: 3,
  },
  {
    name: 'Price : lowest to high',
    id: 4,
  },
  {
    name: 'Price : highest to low',
    id: 5,
  },
]