import {StyleSheet, Text, View, TouchableWithoutFeedback, Modal} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../globalStyle/Theme';
import {ScrollView} from 'react-native';

const BottomPopupHOC = ({PopupBody, title, visible, setVisible, color}) => {
  const onTouchOutside = () => {
    setVisible(false);
  };

  const renderOutsideTouchable = onTouch => {
    const view = <View style={{flex: 1, width: '100%'}} />;
    if (!onTouch) {
      return view;
    }
    return (
      <TouchableWithoutFeedback onPress={onTouch} style={{flex: 1, width: '100%'}}>
        {view}
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onTouchOutside}>
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
              paddingHorizontal: 25,
              paddingVertical: 35,
            }}>
              <ScrollView>
            <Text
              style={{
                ...GlobalStyle.heading,
                color: color ? color : '#F75555',
                fontSize: 20,
                textAlign: 'center',
              }}>
              {title}
            </Text>

            <View
              style={{
                marginVertical: 24,
                height: 1,
                width: '100%',
                backgroundColor: '#EEEEEE',
              }}
            />

            {/* Render the PopupBody component */}

            {PopupBody}

              </ScrollView>

          </View>
      </View>
    </Modal>
  );
};

export default BottomPopupHOC;

const styles = StyleSheet.create({});
