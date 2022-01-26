import React, {useEffect, useState} from 'react';
import {LogBox, View} from 'react-native';
import MainStackNavigator from './src/navigations/MainStackNavigator';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {StripeProvider} from '@stripe/stripe-react-native';

const App = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <NativeBaseProvider>
      <StripeProvider
        publishableKey={process.env.publishableKey}
        merchantIdentifier="merchant.identifier">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <View style={{flex: 1}}>
              <MainStackNavigator />
            </View>
          </PersistGate>
        </Provider>
      </StripeProvider>
    </NativeBaseProvider>
  );
};

export default App;
