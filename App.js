import React, {useEffect, useState} from 'react';
import {LogBox, Text, View} from 'react-native';
import MainStackNavigator from './src/navigations/MainStackNavigator';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <NativeBaseProvider>
      <View style={{flex: 1}}>
        <MainStackNavigator />
      </View>
    </NativeBaseProvider>
  );
};

export default App;
