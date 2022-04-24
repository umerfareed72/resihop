import React, {useEffect, useState} from 'react';

import {LogBox, View} from 'react-native';
import MainStackNavigator from './src/navigations/MainStackNavigator';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {StripeProvider} from '@stripe/stripe-react-native';
import {APIKEY, options, publishableKey} from './src/utilities';
import {CONSTANTS, RNCallKeep} from 'react-native-callkeep';
import Geocoder from 'react-native-geocoding';

const App = props => {
  LogBox.ignoreAllLogs(true);

  useEffect(() => {
    Geocoder.init(APIKEY); // use a valid API key
  }, []);

  return (
    <NativeBaseProvider>
      <StripeProvider
        publishableKey={publishableKey}
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
