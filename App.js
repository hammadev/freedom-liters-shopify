import React from 'react';
import {Text, View} from 'react-native';
import {Font} from './src/globalStyle/Theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStack from './src/navigation/RootStack';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {rootReducer} from './src/redux';
import {StripeProvider} from '@stripe/stripe-react-native';
import {ApolloProvider} from '@apollo/client';
import client from './src/graphql/ApolloClient';

const App = () => {
  const store = createStore(rootReducer, composeWithDevTools);
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <RootStack />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ApolloProvider>
    </Provider>
  );
};
export default App;
