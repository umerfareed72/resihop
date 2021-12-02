import React, {useEffect, useState} from 'react';
import {LogBox, Text, View} from 'react-native';
import MainStackNavigator from './src/navigations/MainStackNavigator';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{flex: 1}}>
            <MainStackNavigator />
          </View>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
