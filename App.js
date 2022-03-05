import React, {useEffect, useState} from 'react';

import {LogBox, View} from 'react-native';
import MainStackNavigator from './src/navigations/MainStackNavigator';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {StripeProvider} from '@stripe/stripe-react-native';
import {APIKEY, options, publishableKey} from './src/utilities';
import RNCallKeep from 'react-native-callkeep';
import {LinkHelper} from './src/utilities/helpers/LinkHelper';
import {Linking} from 'react-native';
import Geocoder from 'react-native-geocoding';

const App = props => {
  LogBox.ignoreAllLogs(true);
  const onAnswerCallAction = async data => {
    let {callUUID} = data;
    RNCallKeep.rejectCall(callUUID);
  };

  const onEndCallAction = data => {
    let {callUUID} = data;
    RNCallKeep.endCall(callUUID);
  };

  //Agora Call Listners

  // Event Listener Callbacks

  const didReceiveStartCallAction = data => {
    let {handle, callUUID, name} = data;
    // Get this event after the system decides you can start a call
    // You can now start a call from within your app
  };

  useEffect(() => {
    Geocoder.init(APIKEY); // use a valid API key

    RNCallKeep.setup(options).then(accepted => {});
    RNCallKeep.setAvailable(true);
    RNCallKeep.addEventListener(
      'didReceiveStartCallAction',
      didReceiveStartCallAction,
    );

    RNCallKeep.addEventListener('answerCall', onAnswerCallAction);
    RNCallKeep.addEventListener('endCall', onEndCallAction);
    return () => {
      RNCallKeep.removeEventListener('answerCall', onAnswerCallAction);
      RNCallKeep.removeEventListener(
        'didReceiveStartCallAction',
        didReceiveStartCallAction,
      );
      RNCallKeep.removeEventListener('endCall', onEndCallAction);
    };
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
