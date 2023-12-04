import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RadioButton} from 'react-native-paper';
import {COLORS, FONTS} from '../constants';

const FilterPopupSortOption = ({checked, setChecked}) => {
  return (
    <View>
      {optionsdata.map((x, i) => (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setChecked(x.value)}
          style={styles.row}
          key={i}>
          <Text style={styles.text}>{x.title}</Text>
          <RadioButton.Android
            value={x.value}
            status={checked === x.value ? 'checked' : 'unchecked'}
            onPress={() => setChecked(x.value)}
            color={COLORS.primary}
            uncheckedColor={COLORS.primary}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FilterPopupSortOption;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: COLORS.tertiary,
    fontFamily: FONTS.regular,
  },
});

const optionsdata = [
  {
    id: 1,
    title: 'Newest',
    value: 'newest',
  },
  {
    id: 2,
    title: 'Price: High To Low',
    value: 'hightolow',
  },
  {
    id: 3,
    title: 'Price: Low To High',
    value: 'lowtohigh',
  },
];
