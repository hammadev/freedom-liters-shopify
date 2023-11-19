import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ChevronSvg} from '../assets/svgs/AuthSvg';
import {useColorScheme} from 'react-native';

export const BackIcon = ({theme}) => {
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
      <ChevronSvg color={theme == 'dark' ? '#fff' : '#000'} />
    </TouchableOpacity>
  );
};
const AppBar = props => {
  let navigation = useNavigation();
  const scheme = useColorScheme();
  return (
    <View style={{...Style.topMainIcon}}>
      {props.left ? props.left : <BackIcon theme={props.theme == 'dark' ? 'dark' : '#000'} />}
      {props.center}
      <Text
        onPress={props.onPressFunc ? props.onPressFunc : () => navigation.navigate(props.navLink)}
        style={{color: scheme == 'dark' ? '#fff' : '#fff', fontSize: 15}}>
        {props.right}
      </Text>
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
    marginTop: 15,
    paddingHorizontal: 10,
  },
});

export default AppBar;
