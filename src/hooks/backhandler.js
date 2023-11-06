import {useEffect} from 'react';
import {BackHandler} from 'react-native';

const useBackHandler = onBackAction => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (onBackAction) {
          if (typeof onBackAction === 'function') {
            onBackAction();
          } else {
            console.warn('onBackAction should be a function.');
          }
        }
        return true; // Return true to prevent the default back button behavior
      },
    );

    return () => {
      backHandler.remove();
    };
  }, [onBackAction]);
};

export default useBackHandler;
