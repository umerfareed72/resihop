import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';

export const Constants = {
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
};

export let authHeader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
export let header = async () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmRhNWE3OGIyZDVkNDVjNDc5NWEwNCIsImlhdCI6MTYzOTMzMzc1MSwiZXhwIjoxNjQxOTI1NzUxfQ.3t0ZKd2y1UvTA9KvMdrdPhdiJEoYocOZalA114Fqdk4`,
  //  ${await GetToken()},
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
