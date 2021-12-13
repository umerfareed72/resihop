import {Alert} from 'react-native';

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
