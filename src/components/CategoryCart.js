import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity, StyleSheet} from 'react-native';
import {Color, GlobalStyle, Window} from '../../src/globalStyle/Theme';

export const CatBoxCat = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={{width: '50%', marginRight: 5}}
      onPress={() => navigation.navigate('ProductListing', {handle: item.item.node.handle})}>
      <ImageBackground
        style={{height: 180, flex: 1, marginBottom: Window.fixPadding}}
        source={item.item.node.image ? {uri: item.item.node.image.url} : require('../../src/assets/images/products/review.png')}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            flex: 0.85,
            paddingBottom: 20,
            paddingLeft: 10,
            justifyContent: 'flex-end',
          }}>
          <Text style={{...GlobalStyle.heading, color: Color.white, marginLeft: 2}}>{item.item.node.title}</Text>
          <View
            style={{
              height: 3,
              width: item.item.node.title.length * 10,
              borderRadius: 10,
              marginTop: 12,
              backgroundColor: Color.white,
            }}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
