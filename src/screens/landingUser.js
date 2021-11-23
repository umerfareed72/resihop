import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {landing_user_img} from '../assets';
import {CustomHeader, Header} from '../components';
import {Container} from '../components/Container';
import MyStatusBar from '../components/Header/statusBar';
import {theme} from '../theme';
import {
  dummy_ipsum_msg,
  login,
  sign_up,
  welcome_to_resihop_msg,
} from '../theme/strings';
import {appIcons, colors} from '../utilities';
import {drawerIcons} from '../utilities/images';

function landingUser({navigation}) {
  return (
    <>
      <View
        style={{width: '100%', height: '100%', backgroundColor: colors.white}}>
        <ImageBackground
          source={appIcons.landing_user_img}
          style={styles.imgCon}
          imageStyle={{height: '100%'}}
          resizeMode={'cover'}>
          <MyStatusBar
            backgroundColor={'transparent'}
            barStyle={'dark-content'}
          />
          <TouchableOpacity
            onPress={() => {
              navigation?.goBack();
            }}
            style={{paddingTop: 30, paddingHorizontal: 20}}>
            <Image source={appIcons.backArrow} style={styles.imageStyle} />
          </TouchableOpacity>
        </ImageBackground>
        <Text style={[theme.Text.h1Bold, styles.heading]}>
          {welcome_to_resihop_msg}
        </Text>
        <View>
          <Text style={[theme.Text.h4Normal, styles.sayingText]}>
            {dummy_ipsum_msg}
          </Text>
          <Button
            title={login}
            buttonStyle={theme.Button.buttonStyle}
            titleStyle={theme.Button.titleStyle}
            onPress={() => {
              navigation.navigate('Pledge');
            }}
            disabledStyle={theme.Button.disabledStyle}
            disabledTitleStyle={theme.Button.disabledTitleStyle}
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 30,
            }}
          />

          <Button
            title={sign_up}
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}
            buttonStyle={[theme.Button.buttonStyle, styles.signUpButton]}
            titleStyle={[theme.Button.titleStyle, styles.signUpBtnText]}
            disabledTitleStyle={theme.Button.disabledTitleStyle}
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 20,
            }}
          />
        </View>
      </View>
    </>
  );
}

export default landingUser;

const styles = StyleSheet.create({
  backIcon: {
    width: '10%',
  },
  imgCon: {
    width: '100%',
    height: '50%',
  },
  heading: {
    textAlign: 'center',
    marginTop: 30,
  },
  sayingText: {
    color: theme.colors.grey,
    textAlign: 'center',
    paddingHorizontal: 12,
    lineHeight: 28,
  },
  signUpButton: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  signUpBtnText: {
    color: theme.colors.black,
  },
  imageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
