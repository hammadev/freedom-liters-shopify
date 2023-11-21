import {Text, View} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../globalStyle/Theme';
import Button from './Button';
import {useNavigation} from '@react-navigation/native';
import {Applogout, logout} from '../apis/auth';
import {DELETE_ACCESS_TOKEN} from '../graphql/mutations/Auth';
import {useMutation} from '@apollo/client';
import {useDispatch} from 'react-redux';

const Logout = ({auth, setVisible}) => {
  const [deleteAccessToken, {loading, error, data}] = useMutation(DELETE_ACCESS_TOKEN);

  const variables = {
    customerAccessToken: auth.accessToken,
  };

  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View>
      <Text
        style={{
          ...GlobalStyle.textStlye,
          color: '#424242',
          fontSize: 20,
          textAlign: 'center',
          marginBottom: 20,
        }}>
        Are you sure you want to logout?
      </Text>

      <Button
        text="Yes, logout!"
        isIcon={false}
        theme="tertiary"
        loading={loading}
        onPressFunc={() => Applogout(deleteAccessToken, variables, navigation, setVisible, dispatch)}
      />
    </View>
  );
};

export default Logout;
