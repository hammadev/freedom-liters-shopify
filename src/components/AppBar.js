import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import { Color, GlobalStyle, Window } from '../globalStyle/Theme';
import { ChevronSvg } from '../assets/svgs/AuthSvg';

const BackIcon = ({ theme }) => {
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
      {/* <Octicons style={{ color: Color.primary, fontSize: 25 }} name="arrow-left" /> */}
    </TouchableOpacity>
  )
}
const AppBar = props => {


  if (props.header == 'solid') {
    return (
      <View style={{ ...props.customStyle, ...Style.topMainIcon }}>
        {props.left ? (
          props.left
        ) : (
          <BackIcon theme={props.theme == 'dark' ? 'dark' : ''} />
        )}

        {props.center}
        {props.right}
      </View>
    );
  }

  return (
    <View style={{ ...props.customStyle, paddingTop: Window.fixPadding }}>
      <BackIcon theme={props?.theme == 'dark' ? 'dark' : ''} />
      <Text style={{ ...GlobalStyle.heading, marginTop: Window.fixPadding, marginBottom: Window.fixPadding / 2, }}>{props?.title}</Text>
    </View>

  )
};

const Style = StyleSheet.create({
  topMainIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
});

export default AppBar;
