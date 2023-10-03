// back handler hook
import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';

export const useBackButton = (navigation, handler) => {
  useEffect(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', handler);
    });
    navigation.addListener('blur', () => {
      BackHandler.removeEventListener('hardwareBackPress', handler);
    });
  }, [handler]);
};
