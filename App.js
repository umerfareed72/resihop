import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import MainStackNavigator from './src/navigations/MainStackNavigator';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider>
      <View style={{flex: 1}}>
        <MainStackNavigator />
      </View>
    </NativeBaseProvider>
  );
};

export default App;
