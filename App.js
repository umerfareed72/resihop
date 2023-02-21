import React, {useEffect} from 'react';

import {StripeProvider} from '@stripe/stripe-react-native';
import {NativeBaseProvider} from 'native-base';
import {LogBox, View} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MainStackNavigator from './src/navigations/MainStackNavigator';
import {persistor, store} from './src/redux/store/store';
import {APIKEY, prod_published_key, publishableKey} from './src/utilities';

const App = props => {
  LogBox.ignoreAllLogs(true);

  useEffect(() => {
    Geocoder.init(APIKEY); // use a valid API key
  }, []);

  return (
    <NativeBaseProvider>
      <StripeProvider
        publishableKey={prod_published_key}
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
