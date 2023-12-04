import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, CONTAINER_PADDING, FONTS, RADIUS} from '../constants';
import BackButton from './BackButton';
import {Searchbar, TouchableRipple} from 'react-native-paper';
import {SearchFilterSvg} from '../assets/svgs/SearchSvg';

const Header = ({
  label,
  hideBackButton,
  search,
  searchFilterFunction,
  searchValue,
  filterFunc,
  searchPlaceholder,
}) => {
  return (
    <View style={styles.container}>
      {hideBackButton ? (
        <View style={{height: 35, width: 35}} />
      ) : (
        <BackButton />
      )}
      {label && <Text style={styles.label}>{label}</Text>}
      {search && (
        <Searchbar
          placeholder={
            searchPlaceholder ? `Search ${searchPlaceholder}` : 'Search'
          }
          onChangeText={text => {
            searchFilterFunction(text);
          }}
          value={searchValue}
          style={[
            {
              flex: 1,
              // marginTop: 5,
              backgroundColor: 'transparent',
              borderWidth: 0.25,
              borderRadius: 100,
              borderColor: 'black',
              height: 42.5,
              marginHorizontal: 15,
            },
          ]}
          mode="view"
          rippleColor={COLORS.primary}
          showDivider={false}
          inputStyle={{minHeight: 42.5}}
        />
      )}
      {search ? (
        <View style={styles.filterBtn}>
          <TouchableRipple
            style={styles.ripple}
            rippleColor={'rgba(255,255,255,0.2)'}
            onPress={filterFunc}>
            <SearchFilterSvg />
          </TouchableRipple>
        </View>
      ) : (
        <View style={{height: 35, width: 35}} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    paddingHorizontal: CONTAINER_PADDING,
    backgroundColor: COLORS.white,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5.84,
    elevation: 12,
  },
  label: {
    fontSize: 22,
    fontFamily: FONTS.heading,
    color: COLORS.tertiary,
  },
  filterBtn: {
    backgroundColor: COLORS.primary,
    height: 35,
    width: 35,
    borderRadius: 10,
    overflow: 'hidden',
  },
  ripple: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
