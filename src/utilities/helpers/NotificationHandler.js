import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-tiny-toast';
import RNCallKeep from 'react-native-callkeep';
import {options} from '../constants';
import {Alert} from 'react-native';
import appTypes from '../../redux/types/app.types';

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

// Currently iOS only

export const Notification_Listner = (dispatch, props) => {
  messaging().onNotificationOpenedApp(async remoteMessage => {});
  messaging().onMessage(async remoteMessage => {
    console.log('remote Meessage', remoteMessage?.data?.data);
    const notificationObj = JSON.parse(remoteMessage?.data?.data);
    const responseData = {
      agora_token: notificationObj?.rtctoken,
      agora_data: notificationObj,
    };
    console.log('response obj', responseData);
    Alert.alert(
      remoteMessage?.notification?.title,
      remoteMessage?.notification?.body,
      [
        {
          text: 'Ok',
          onPress: () => {
            dispatch({
              type: appTypes.Create_Agora_Channel_Success,
              payload: responseData,
            });
            props?.navigation?.navigate('CallNow');
          },
        },
      ],
      {cancelable: false},
    );
  });
  messaging().getInitialNotification(async remoteMessage => {
    if (remoteMessage) {
      console.log('Initial Notification', remoteMessage);
    }
  });
};

export const LocalNotification = () => {
  PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: notification => {
      console.log(notification?.notification);
      // Toast.show(notification?.data?.body, {
      //   position: Toast.position.TOP,
      // });
      // alert(notification?.notification?.body);
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};
