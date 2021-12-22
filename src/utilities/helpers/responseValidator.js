import {Alert} from 'react-native';

export const responseValidator = (response, msg) => {
  let errorCode = response.substring(32, 36);
  if (errorCode == 401) {
    Alert.alert(
      'Error',
      msg,
      [{text: 'Ok', onPress: () => console.log('Cancelled')}],
      {cancelable: false},
    );
  } else if (errorCode == 400) {
    Alert.alert(
      'Error',
      msg,
      [{text: 'Ok', onPress: () => console.log('Cancelled')}],
      {cancelable: false},
    );
  } else if (errorCode == 404) {
    Alert.alert(
      'Network Error',
      msg,
      [{text: 'Ok', onPress: () => console.log('Cancelled')}],
      {cancelable: false},
    );
  } else if (errorCode == 500) {
    Alert.alert(
      'Error',
      msg,
      [{text: 'Ok', onPress: () => console.log('Cancelled')}],
      {cancelable: false},
    );
  } else {
  }
};
