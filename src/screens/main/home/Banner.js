import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {CartSvg} from '../../../assets/svgs/HomePage';
import Icon from '../../../core/Icon';
import {useNavigation} from '@react-navigation/native';
import {
  COLORS,
  CONTAINER_PADDING,
  FONTS,
  HEIGHT,
  RADIUS,
} from '../../../constants';
import {TouchableRipple} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Banner = ({}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={require('../../../assets/images/products/homeBg.png')}>
      <View style={[styles.row, {marginTop: insets.top}]}>
        <View style={styles.topBtn}>
          <TouchableRipple
            style={styles.ripple}
            rippleColor={'rgba(255, 255, 255, 0.5)'}
            onPress={() => navigation.navigate('Search')}>
            <Icon
              iconFamily={'Feather'}
              size={20}
              name={'search'}
              color={COLORS.white}
            />
          </TouchableRipple>
        </View>
        <View style={[styles.topBtn, {marginLeft: 5}]}>
          <TouchableRipple
            style={styles.ripple}
            rippleColor={'rgba(255, 255, 255, 0.5)'}
            onPress={() => navigation.navigate('Cart')}>
            <CartSvg />
          </TouchableRipple>
        </View>
      </View>
      <View style={[styles.contentContainer, {paddingBottom: insets.top}]}>
        <Text style={styles.title}>Dress With Style</Text>
        <Image
          style={styles.lineImg}
          source={require('../../../assets/images/products/Vector2.png')}
        />
        <Text style={styles.subTitle}>20% Discount</Text>
        <View style={styles.btn}>
          <TouchableRipple
            style={styles.ripple}
            rippleColor={'rgba(255, 255, 255, 0.1)'}
            onPress={() =>
              navigation.navigate('ProductListing', {
                value: 1,
                title: 'Featured',
              })
            }>
            <Text style={styles.btnText}>Buy Now</Text>
          </TouchableRipple>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: COLORS.primary,
    height: HEIGHT / 3,
    paddingHorizontal: CONTAINER_PADDING,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  lineImg: {
    marginLeft: 90,
    width: 80,
    height: 10,
    marginTop: -5,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: COLORS.white,
  },
  subTitle: {
    marginVertical: 8,
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  btn: {
    backgroundColor: COLORS.primary,
    width: 85,
    height: 40,
    borderRadius: RADIUS,
    overflow: 'hidden',
  },
  btnText: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: FONTS.bold,
  },
  ripple: {
    wifth: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBtn: {
    height: 35,
    width: 35,
    overflow: 'hidden',
    borderRadius: 100,
  },
});
