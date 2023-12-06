import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, RADIUS} from '../constants';
import Icon from '../core/Icon';
import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddressList = ({
  item,
  setRadioState,
  radioState,
  editIcon,
  showModal,
}) => {
  const RadioClick = async itemID => {
    setRadioState(itemID);
    await AsyncStorage.setItem('address', itemID);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.row}>
        <Text style={styles.heading}>
          Deliver To : {item.firstName + ' ' + item.lastName}
        </Text>

        {editIcon ? (
          <TouchableOpacity onPress={() => showModal(item)}>
            <Icon
              iconFamily={'MaterialCommunityIcons'}
              name="pencil-minus"
              size={20}
              color={COLORS.tertiary}
            />
          </TouchableOpacity>
        ) : (
          <RadioButton
            value="first"
            uncheckedColor={COLORS.primary}
            color={COLORS.primary}
            status={radioState == item.id ? 'checked' : 'unchecked'}
            onPress={() => RadioClick(item.id)}
          />
        )}
      </View>
      {radioState == item.id && <Text style={styles.defaultText}>Default</Text>}

      <Text style={styles.text} numberOfLines={2}>
        Address : {item.address1 + ', ' + item.address2 + ', '}
        {item.zip +
          ', ' +
          item.city +
          ', ' +
          item.province +
          ', ' +
          item.country}
        asdasdsads
      </Text>

      <Text style={styles.text}>Phone : {item.phone} 00000</Text>
    </View>
  );
};

export default AddressList;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 25,
    borderRadius: RADIUS,
    backgroundColor: '#FAF7F1',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  heading: {
    fontSize: 16,
    color: COLORS.tertiary,
    fontFamily: FONTS.semiBold,
  },

  text: {
    fontSize: 12,
    color: COLORS.secondary,
    fontFamily: FONTS.medium,
  },

  defaultText: {
    color: COLORS.primary,
    fontSize: 12,
    borderRadius: RADIUS,
    borderWidth: 0.25,
    fontFamily: FONTS.semiBold,
    width: 70,
    marginVertical: 10,
    padding: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
