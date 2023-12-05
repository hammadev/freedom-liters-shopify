import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {COLORS, FONTS, RADIUS, WIDTH} from '../constants';
import {TouchableRipple} from 'react-native-paper';

export const CatBoxCat = ({item, navigation, index}) => {
  const isOddIndex = index % 2 === 0; // Check if index is odd

  // // Apply custom styles based on the index
  const cardStyle = [
    {...styles.container},
    [isOddIndex ? styles.oddCard : styles.evenCard],
  ];
  return (
    <ImageBackground
      imageStyle={{width: '100%'}}
      source={
        item.node.image
          ? {uri: item.node.image.url}
          : require('../../src/assets/images/products/review.png')
      }
      style={cardStyle}>
      <TouchableRipple
        style={styles.ripple}
        onPress={() =>
          navigation.navigate('ProductListing', {
            handle: item.node.handle,
            value: 0,
            title: item.node.title,
          })
        }>
        <>
          <View style={styles.overlay}>
            <Text style={styles.title} numberOfLines={2}>
              {item.node.title}
            </Text>
            <View
              style={[
                styles.line,
                {
                  width: item.node.title.length * 10,
                },
              ]}
            />
          </View>
        </>
      </TouchableRipple>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: WIDTH / 2.48,
    width: WIDTH / 2.48,
    overflow: 'hidden',
    flex: 1,
    borderRadius: RADIUS,
  },
  oddCard: {
    marginRight: 5,
  },
  evenCard: {
    marginLeft: 5,
  },
  ripple: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    paddingBottom: 10,
    paddingLeft: 10,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 14,
    lineHeight: 15,
    fontFamily: FONTS.heading,
    color: COLORS.white,
    width: WIDTH / 2.7,
  },
  line: {
    height: 3,
    borderRadius: 10,
    marginTop: 7.5,
    backgroundColor: COLORS.white,
  },
});
