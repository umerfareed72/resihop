import React, {createContext, useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
export const responseValidator = (msg, code) => {
  console.log('Api Error:-', msg);
  if (code == 'Error') {
    Alert.alert(
      'error',
      'This Phone Number is Already Registered!',
      [{text: 'ok', onPress: () => console.log('Cancelled')}],
      {cancelable: false},
    );
  }
  // let errorCode = response.substring(32, 36);
  // if (errorCode == 401) {
  //   Alert.alert(
  //     I18n.t('error'),
  //     I18n.t('backend_error'),
  //     [{text: I18n.t('ok'), onPress: () => console.log('Cancelled')}],
  //     {cancelable: false},
  //   );
  // } else if (errorCode == 400) {
  //   Alert.alert(
  //     I18n.t('error'),
  //     I18n.t('backend_error'),
  //     [{text: I18n.t('ok'), onPress: () => console.log('Cancelled')}],
  //     {cancelable: false},
  //   );
  // } else if (errorCode == 404) {
  //   Alert.alert(
  //     I18n.t('error'),
  //     I18n.t('backend_error'),
  //     [{text: I18n.t('ok'), onPress: () => console.log('Cancelled')}],
  //     {cancelable: false},
  //   );
  // } else if (errorCode == 500) {
  //   Alert.alert(
  //     I18n.t('error'),
  //     I18n.t('backend_error'),

  //     [{text: I18n.t('ok'), onPress: () => console.log('Cancelled')}],
  //     {cancelable: false},
  //   );
  // } else {
  // }
};

export const checkConnected = () => {
  return NetInfo.fetch().then(state => {
    return state.isConnected;
  });
};
const OnlineStatusContext = createContext(true);
export const OnlineStatusProvider = ({children}) => {
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);
  return (
    <OnlineStatusContext.Provider value={isOffline}>
      {children}
    </OnlineStatusContext.Provider>
  );
};
export const useOnlineStatus = () => {
  const store = useContext(OnlineStatusContext);
  return store;
};
