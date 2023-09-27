import { Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import { Font, GlobalStyle, Window } from '../globalStyle/Theme';
import Button from './Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const BottomPopupRemoveFromCart = ({
  onTouchOutside,
  openPopup,
  removeItemFromCart,
}) => {
  const navigation = useNavigation();

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
          width: '100%',
        }}>
        {renderOutsideTouchable(onTouchOutside)}
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            borderTopRightRadius: 44,
            borderTopLeftRadius: 44,
            paddingHorizontal: 25,
            height: Window.height * 0.33,
          }}>
          <Text
            style={{ ...GlobalStyle.heading, color: '#F75555', alignSelf: 'center', marginTop: 20 }}>
            Remove
          </Text>
          <View
            style={{
              marginVertical: 24,
              height: 1,
              width: '100%',
              backgroundColor: '#EEEEEE',
            }}
          />
          <Text
            style={{ ...GlobalStyle.textStlye, fontSize: 20, textAlign: 'center' }}>
            Are you sure you want to remove this product?
          </Text>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              width: '100%',
              marginTop: 24,
            }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Button
                text="Cancel"
                isIcon={false}
                theme="alternate"
                onPressFunc={() => onTouchOutside()}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Button
                text="Yes, Remove"
                isIcon={false}
                theme="tertiary"
                onPressFunc={removeItemFromCart}
              />
            </View>
            {/* </View> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomPopupRemoveFromCart;
