import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import {Dimensions} from 'react-native';
import I18n from '../translations';
export const Constants = {
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
};
export const publishableKey =
  'pk_test_51HHZGDJdTAy1qfYOFzlK3i3oPJDG3d4D1LgXHDsivAXq9hr3CCK20CP4pLUMymj8KiKsQezvdWp6reLvCkYm3hVt007hOHMr1A';
export const appId = 'd7b355e2e491452a9a984bec7b87b43f';

export let authHeader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
export let header = async () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${await GetToken()}`,
});
export let GetToken = async () => {
  const token = await AsyncStorage.getItem('usertoken');
  return token;
};
export let image_options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export const APIKEY = 'AIzaSyBq3-UEY9QO9X45s8w54-mrwjBQekzDlsA';
export const mode = 'driving';

export const options = {
  ios: {
    appName: 'com.resihop',
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'ok',
    imageName: 'phone_account_icon',
    additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CONTACTS],

    // Required to get audio in background when using Android 11
    foregroundService: {
      channelId: 'com.reactnative.resihop',
      channelName: 'Foreground service for my app',
      notificationTitle: 'My app is running on background',
      notificationIcon: 'Path to the resource icon of the notification',
    },
  },
};
export const total_seats = [
  {
    id: 1,
    book_seat: false,
  },
  {
    id: 2,
    book_seat: false,
  },
  {
    id: 3,
    book_seat: false,
  },
  {
    id: 4,
    book_seat: false,
  },
  {
    id: 5,
    book_seat: false,
  },
  {
    id: 6,
    book_seat: false,
  },
  {
    id: 7,
    book_seat: false,
  },
];
export const profileIcon =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4CRKPij6o2waFROp-89BCE8lEf96jLsndRQ&usqp=CAU';
export var RideStatusList = {
  id: 1,
  title: I18n.t('ride_status'),
  items: [
    {id: 1, text: I18n.t('confirmed'), status: false, value: 'CONFIRMED'},
    {
      id: 2,
      text: I18n.t('waiting_for_match'),
      status: false,
      value: 'WAITING_FOR_MATCH',
    },
    {
      id: 3,
      text: I18n.t('matching_done'),
      status: false,
      value: 'MATCHING_DONE',
    },
  ],
};

export const rideTypeList = {
  id: 4,
  title: I18n.t('ride_type'),
  items: [
    {id: 1, text: I18n.t('all_rides'), value: null},
    {id: 2, text: I18n.t('destination_rides'), value: 'destination'},
    {id: 3, text: I18n.t('return_rides'), value: 'return'},
  ],
};
