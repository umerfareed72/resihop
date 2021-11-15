import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import MainStackNavigator from './src/navigations/MainStackNavigator';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <MainStackNavigator />
    </View>
  );
};

export default App;
