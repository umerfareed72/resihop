/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import RNCallKeep from 'react-native-callkeep';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  RNCallKeep.displayIncomingCall(
    '3044228401',
    '03044228402',
    (localizedCallerName = 'Umer'),
    (handleType = 'number'),
    (hasVideo = false),
  );
});

AppRegistry.registerComponent(appName, () => App);
