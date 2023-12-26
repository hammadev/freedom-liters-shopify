import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, RADIUS} from '../constants';
import Icon from '../core/Icon';
import {RadioButton} from 'react-native-paper';
import {handleDefultAddress} from '../apis/auth';

const AddressList = ({
  item,
  setRadioState,
  radioCheck,
  editIcon,
  showModal,
  auth,
  customerDefaultAddressUpdate,
  isCartPage = false,
  hideRadio = false,
  setSelectedAddress,
}) => {
  const RadioClick = async itemID => {
    handleDefultAddress(customerDefaultAddressUpdate, auth, itemID);
    setRadioState(itemID);
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
          <>
            {!hideRadio && (
              <RadioButton
                value="first"
                uncheckedColor={COLORS.primary}
                color={COLORS.primary}
                status={radioCheck == item.id ? 'checked' : 'unchecked'}
                onPress={() =>
                  !isCartPage ? RadioClick(item.id) : setSelectedAddress(item)
                }
              />
            )}
          </>
        )}
      </View>
      {radioCheck === item.id && !isCartPage && (
        <Text style={styles.defaultText}>Default</Text>
      )}

      <Text style={styles.text} numberOfLines={2}>
        Address : {item.address1 + ', ' + item.address2 + ', '}
        {item.zip +
          ', ' +
          item.city +
          ', ' +
          item.province +
          ', ' +
          item.country}
      </Text>

      <Text style={styles.text}>Phone : {item.phone ? item.phone : 'NA'}</Text>
    </View>
  );
};

export default AddressList;

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 7,
    borderRadius: RADIUS,
    backgroundColor: '#FAF7F1',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 16,
  },
  heading: {
    fontSize: 16,
    color: COLORS.tertiary,
    fontFamily: FONTS.semiBold,
    paddingVertical: 7,
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
    width: 75,
    marginBottom: 10,
    paddingVertical: 7,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
