import {View, Text} from 'react-native';
import React from 'react';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

const ActivityLoader = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator animating={true} size={'small'} color={MD2Colors.blue600} />
    </View>
  );
};

export default ActivityLoader;
