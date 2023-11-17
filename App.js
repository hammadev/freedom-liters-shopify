import React from 'react';
import {Text, View} from 'react-native';
import {Font} from './src/globalStyle/Theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {PaperProvider} from 'react-native-paper';
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
            <FlashMessage
              position="top"
              statusBarHeight={getStatusBarHeight}
              floating
              textStyle={{fontFamily: Font.Urbanist_Regular}}
              style={{marginTop: 10}}
            />
            <PaperProvider>
              <StripeProvider
                publishableKey={'pk_test_xEVXxVXXe7ywigzB1O8SadA0'}
                // merchantIdentifier="merchant.identifier" // required for Apple Pay
                // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
              >
                <RootStack />
              </StripeProvider>
            </PaperProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ApolloProvider>
    </Provider>
  );
};
export default App;
