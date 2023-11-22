import React from 'react';
import {StatusBar, Text, View} from 'react-native';
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
import StatusAppBar from './src/components/StatusAppBar';
import {Color, Font} from './src/globalStyle/Theme';

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
              titleStyle={{fontSize: 14, fontFamily: Font.Gilroy_Medium}}
            />
            <RootStack />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ApolloProvider>
    </Provider>
  );
};
export default App;
