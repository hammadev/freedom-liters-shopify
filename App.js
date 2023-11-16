import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStack from './src/navigation/RootStack';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {rootReducer} from './src/redux';
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
