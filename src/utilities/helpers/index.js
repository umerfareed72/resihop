import React, {createContext, useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Geocoder from 'react-native-geocoding';
import {
  setOrigin,
  setReturnMapDestination,
} from '../../redux/actions/map.actions';

export const responseValidator = (code, msg) => {
  Alert.alert(
    'Error',
    msg,
    [{text: 'ok', onPress: () => console.log('Cancelled')}],
    {cancelable: false},
  );
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

export const GeoCoderHelper = (
  latitude,
  longitude,
  dispatch,
  googleAutoComplete,
  point,
) => {
  Geocoder.from(latitude, longitude)
    .then(json => {
      var addressComponent = json.results[0]?.formatted_address;
      if (point == 'start') {
      }
      dispatch(
        setOrigin({
          location: {lat: latitude, lng: longitude},
          description: addressComponent,
        }),
      );
      dispatch(
        setReturnMapDestination({
          location: {lat: latitude, lng: longitude},
          description: addressComponent,
        }),
      );
      googleAutoComplete.current?.setAddressText(addressComponent);
    })
    .catch(error => console.warn(error));
};
