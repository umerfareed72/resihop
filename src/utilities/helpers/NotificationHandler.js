import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-tiny-toast';
// import {
//   read_Notifications,
//   save_Notification_Info,
// } from '../../Redux/actions/notification.action';

export async function registerAppWithFCM() {
  await messaging().registerDeviceForRemoteMessages();
}
export async function requestPermission() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus == messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus == messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      let token = await getFcmToken();
      console.log('TOKEN', token);
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

export const Notification_Listner = (dispatch, props) => {
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(remoteMessage.data.additional_info);
    let notificationObj = remoteMessage.data.additional_info;
    if (notificationObj) {
      notificationObj = JSON.parse(notificationObj);
      if (remoteMessage.data != null) {
        const requestBody = {
          post_id: notificationObj.id,
        };
        const read_request_body = {
          id: notificationObj.notification_id,
        };
        console.log(remoteMessage.data);
        dispatch(
          read_Notifications(read_request_body, () => {
            console.log('Notification Readed');
          }),
        );

        dispatch(
          save_Notification_Info(requestBody, () => {
            if (notificationObj.type == 'Post') {
              props?.navigation?.navigate('NotificationDetail');
            } else {
              props?.navigation?.navigate('Notification');
            }
          }),
        );
      }
    }
  });
  messaging().onMessage(async remoteMessage => {
    let notificationObj = remoteMessage.data.additional_info;
    if (notificationObj) {
      notificationObj = JSON.parse(notificationObj);
      if (remoteMessage.data != null) {
        const requestBody = {
          post_id: notificationObj.id,
          remote_Notification: true,
        };
        dispatch(
          save_Notification_Info(requestBody, () => {
            Toast.show(remoteMessage?.data?.body, {
              position: Toast.position.TOP,
            });
          }),
        );
      }
    }
  });
  messaging().getInitialNotification(async remoteMessage => {
    if (remoteMessage) {
      console.log('Initial Notification', remoteMessage.notification);
    }
  });
};

export const LocalNotification = () => {
  PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: notification => {
      Toast.show(notification?.data?.body, {
        position: Toast.position.TOP,
      });
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};
