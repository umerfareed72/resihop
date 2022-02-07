import {Platform} from 'react-native';
import {PermissionsAndroid} from 'react-native';

export const requestCameraAndAudioPermission = async () => {
  if (Platform.OS == 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the mic');
        return true;
      } else {
        console.log('Permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  } else {
    return true;
  }
};
