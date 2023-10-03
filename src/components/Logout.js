import { Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import { Font, GlobalStyle, Window } from '../globalStyle/Theme';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../apis/auth';
import { DELETE_ACCESS_TOKEN } from '../graphql/mutations/Auth';
import { useMutation } from '@apollo/client';

const Logout = ({
  onTouchOutside,
  openPopup,
  auth,
}) => {

  const [deleteAccessToken, { loading, error, data }] = useMutation(
    DELETE_ACCESS_TOKEN
  );

  const variables = {
    customerAccessToken: auth.accessToken,
  }

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
        }}>
        {renderOutsideTouchable(onTouchOutside)}

        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            borderTopRightRadius: 44,
            borderTopLeftRadius: 44,
            paddingHorizontal: 25,
            paddingVertical: 35
          }}>

          <Text
            style={{
              ...GlobalStyle.heading,
              color: '#F75555',
              fontSize: 20,
              textAlign: 'center',
            }}>
            Alert
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
            style={{
              ...GlobalStyle.textStlye,
              color: '#424242',
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 20
            }}>
            Are you sure you want to logout?
          </Text>

          <Button
            text="Yes, logout!"
            isIcon={false}
            theme="tertiary"
            loading={loading}
            onPressFunc={() => logout(deleteAccessToken, variables, navigation, onTouchOutside)}
          />

        </View>

      </View>
    </Modal>
  );
};

export default Logout;
