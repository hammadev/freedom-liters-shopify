import React from 'react';
import {Platform, StatusBar, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStack from './src/navigation/RootStack';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {rootReducer} from './src/redux';
import {ApolloProvider} from '@apollo/client';
import client from './src/graphql/ApolloClient';
import {Color, Font} from './src/globalStyle/Theme';
import {COLORS, FONTS} from './src/constants';

const App = () => {
  const store = createStore(rootReducer, composeWithDevTools);
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <FlashMessage
              position="top"
              hideStatusBar={false}
              statusBarHeight={StatusBar.currentHeight}
              onHide={() => {
                StatusBar.setBackgroundColor(COLORS.white);
              }}
              titleStyle={{
                fontSize: 14,
                fontFamily: FONTS.regular,
                color: COLORS.white,
              }}
            />
            <RootStack />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ApolloProvider>
    </Provider>
  );
};
export default App;
