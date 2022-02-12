import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';

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
