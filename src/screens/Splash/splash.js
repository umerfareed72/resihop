import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MyStatusBar from '../../components/Header/statusBar';
import {isVehcile} from '../../redux/actions/auth.action';
import {
  appImages,
  colors,
  LocalNotification,
  Notification_Listner,
  registerAppWithFCM,
  requestPermission,
} from '../../utilities';
import I18n from '../../utilities/translations';

function splash(props) {
  //Rdux States
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  //Component Did Mount
  useEffect(() => {
    handleNavigation();
    handlerNotifications();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  const handlerNotifications = () => {
    //Register App with FCM
    registerAppWithFCM();
    //Request Permissions and get Token
    requestPermission();
    //Notification Listner
    Notification_Listner(dispatch, props?.navigation);
    //On  local Notification
    LocalNotification();
  };
  const handleNavigation = async () => {
    const lang = await AsyncStorage.getItem('lang');
    if (lang === null || lang === undefined) {
      I18n.locale = 'en';
    } else {
      I18n.locale = lang;
    }
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('usertoken');
      if (token != null) {
        if (auth?.userInfo?.details || auth?.userdata?.user?.details) {
          if (
            auth?.userInfo?.type === 'PASSENGER' ||
            auth?.userdata?.user?.type === 'PASSENGER'
          ) {
            props?.navigation.replace('PassengerDashboard');
          } else {
            if (auth?.profile_info?.vehicle) {
              props?.navigation.replace('DriverDashboard');
            } else {
              dispatch(
                isVehcile(true, () => {
                  props?.navigation.replace('VehicleStack');
                }),
              );
            }
          }
        } else {
          props?.navigation.replace('UserDetailStack');
        }
      } else {
        props?.navigation.replace('AuthStack');
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={appImages.app_logo}
          style={{width: 160, height: 160}}
          resizeMode={'contain'}
        />
        <Text style={{color: 'green', fontSize: 25, marginTop: '-4%'}}>
          RES IHOP
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

export default splash;
