import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {app_logo} from '../../assets';
import {
  appImages,
  colors,
  LocalNotification,
  Notification_Listner,
  registerAppWithFCM,
  requestPermission,
} from '../../utilities';
import I18n from '../../utilities/translations';
import MyStatusBar from '../../components/Header/statusBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

function splash(props) {
  //Rdux States
  const dispatch = useDispatch();
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
    Notification_Listner(dispatch, props);
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
    setTimeout(() => {
      // if (login?.userdata !== null) {
      //   navigation.replace('App', {screen: 'Cart'});
      // } else {
      //   navigation.replace('Auth');
      //   // navigation.replace('App', {screen: 'Cart'});
      // }
      props.navigation.replace('PassengerDashboard');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <Image source={appImages.app_logo} resizeMode={'contain'} />
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
