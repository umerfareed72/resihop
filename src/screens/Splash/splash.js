import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {app_logo} from '../../assets';
import {colors} from '../../utilities';
import I18n from '../../utilities/translations';
import MyStatusBar from '../../components/Header/statusBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

function splash(props) {
  useEffect(() => {
    handleNavigation();
  }, []);
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
      props.navigation.replace('LanguageSelect');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <Image source={app_logo} resizeMode={'contain'} />
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
