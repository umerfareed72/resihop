import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {set_event_request} from '../../redux/actions';
import {getUserInfo} from '../../redux/actions/auth.action';

export const registerAppWithFCM = async () => {
  await messaging().registerDeviceForRemoteMessages();
};
export async function requestPermission() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus == messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus == messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      let token = await getFcmToken();
      return token;
    }
  } catch (error) {
    // User has rejected permissions
    console.log('token permission rejected');
  }
}
const getFcmToken = async () => {
  let oldToken = await AsyncStorage.getItem('fcmToken');
  if (oldToken == null) {
    try {
      messaging()
        .hasPermission()
        .then(async enabled => {
          if (enabled) {
            let token = await messaging().getToken();
            console.log('Token', token);
            AsyncStorage.setItem('fcmToken', token);
          } else {
            messaging()
              .requestPermission()
              .then(() => {
                console.log('+++ PERMISSION REQUESTED +++++');
              })
              .catch(error => {
                console.log(' +++++ ERROR RP ++++ ' + error);
              });
          }
        })
        .catch(error => {
          console.log(' +++++ ERROR +++++ ' + error);
        });
    } catch (err) {
      console.log(err);
    }
  } else {
    return oldToken;
  }
};

export const Notification_Listner = (dispatch, navigation) => {
  messaging().onNotificationOpenedApp(async remoteMessage => {
    let notificationObj = remoteMessage.data.data;
    if (notificationObj) {
      notificationObj = JSON.parse(notificationObj);
      if (notificationObj?.type == 'agora') {
        dispatch(
          getUserInfo(notificationObj, res => {
            navigation?.navigate('IncomingCall');
          }),
        );
      }
    }
  });
  messaging().onMessage(async remoteMessage => {
    let notificationObj = remoteMessage.data.data;
    if (notificationObj) {
      notificationObj = JSON.parse(notificationObj);
      LocalNotification(remoteMessage, notificationObj, dispatch, navigation);
    }
  });
  messaging().getInitialNotification(async remoteMessage => {
    if (remoteMessage) {
      console.log('Initial Notification', remoteMessage.notification);
    }
  });
};

export const LocalNotification = (
  notify,
  notificationObj,
  dispatch,
  navigation,
) => {
  PushNotification.localNotification({
    channelId: 'fcm_fallback_notification_channel',
    title: notify?.notification?.title,
    smallIcon: 'ic_notification',
    largeIcon: 'ic_launcher',
    message: notify?.notification?.body,
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
  });
  let type = notificationObj?.type;

  if (type === 'agora') {
    dispatch(
      getUserInfo(notificationObj, res => {
        navigation?.navigate('IncomingCall');
      }),
    );
  }

  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {},
    onNotification: function (notification) {
      // navigation?.navigate('NotificationList');
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios' ? true : false,
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  });
};
