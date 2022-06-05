import React, {createContext, useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Geocoder from 'react-native-geocoding';
import {
  setOrigin,
  setReturnMapDestination,
} from '../../redux/actions/map.actions';
import moment from 'moment';

export const responseValidator = (code, msg) => {
  Alert.alert(
    'Error',
    msg || 'Something went wrong!',
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
export const capitalizeFirstLetter = string => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
};
export const GeoCoderHelper = (
  latitude,
  longitude,
  dispatch,
  googleAutoComplete,
) => {
  Geocoder.from(latitude, longitude)
    .then(json => {
      var addressComponent = json.results[0]?.formatted_address;

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

export const languageSelector = (lang, defaultLang) => {
  if (lang === 'English') {
    return 'en';
  } else {
    return 'sw';
  }
};

export const dateConvertor = (dateTimeStamp, time) => {
  let stamp = new Date().getTime();
  if (dateTimeStamp) {
    if (time) {
      return (stamp = moment(`${dateTimeStamp}T${time}`).valueOf());
    } else {
      const currentTime = moment(new Date()).format('HH:mm');
      return (stamp = moment(`${dateTimeStamp}T${currentTime}`).valueOf());
    }
  } else {
    if (time) {
      const currentDate = moment(new Date().toString()).format('YYYY-MM-DD');
      return (stamp = moment(`${currentDate}T${time}`).valueOf());
    }
  }
  return stamp;
};

export const returnDateConvertor = (returnDateTimeStamp, time) => {
  let stamp = new Date().getTime();
  if (returnDateTimeStamp) {
    if (time != 'Invalid date') {
      return (stamp = moment(`${returnDateTimeStamp}T${time}`).valueOf());
    } else {
      const currentTime = moment(new Date()).format('HH:mm');
      return (stamp = moment(
        `${returnDateTimeStamp}T${currentTime}`,
      ).valueOf());
    }
  }
  return stamp;
};

export const recurringDateConvertor = (recurring_dates, time) => {
  let recurring_stamp = [new Date().getTime()];
  if (recurring_dates) {
    if (time) {
      return (recurring_stamp = recurring_dates.map(item => {
        return moment(`${item}T${time}`).valueOf();
      }));
    } else {
      const currentTime = moment(new Date()).format('HH:mm');
      return (recurring_stamp = recurring_dates.map(item => {
        return moment(`${item}T${currentTime}`).valueOf();
      }));
    }
  }
  return recurring_stamp;
};

export const returnRecurringDateConvertor = (
  return_recurring_dates,
  returnFirstTime,
) => {
  let return_recurring_stamp = [new Date().getTime()];
  if (return_recurring_dates) {
    if (returnFirstTime != 'Invalid date') {
      return (return_recurring_stamp = return_recurring_dates.map(item => {
        return moment(`${item}T${returnFirstTime}`).valueOf();
      }));
    } else {
      const currentTime = moment(new Date()).format('HH:mm');
      return (return_recurring_stamp = return_recurring_dates.map(item => {
        return moment(`${item}T${currentTime}`).valueOf();
      }));
    }
  }
  return return_recurring_stamp;
};
