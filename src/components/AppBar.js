import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Color, GlobalStyle, Window} from '../globalStyle/Theme';
import {ChevronSvg} from '../assets/svgs/AuthSvg';

const BackIcon = ({theme}) => {
  let navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => navigation.goBack()}>
      <ChevronSvg color={theme == 'dark' ? '#000' : '#ffff'} />
    </TouchableOpacity>
  );
};
const AppBar = props => {
  return (
    <View style={{...props.customStyle, ...Style.topMainIcon}}>
      {props.left ? props.left : <BackIcon theme={props.theme == 'dark' ? 'light' : 'dark'} />}
      {props.center}
      {props.right}
    </View>
  );
};

const Style = StyleSheet.create({
  topMainIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    color: 'black',
  },
});

export default AppBar;
