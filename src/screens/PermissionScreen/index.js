import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Text} from 'react-native-elements';
import {AgreeButton} from '../../components';
import MyStatusBar from '../../components/Header/statusBar';
import {theme} from '../../theme';
import I18n from '../../utilities/translations';
import {appIcons, colors} from '../../utilities';

const permissions = [
  {
    id: 0,
    text: 'Location (for finding available ride)',
  },
  {
    id: 1,
    text: 'Camera and media  (for upload photos)',
  },
  {
    id: 2,
    text: 'Phone (for account security verification)',
  },
  {
    id: 3,
    text: 'Message (for reading and auto-filling code)',
  },
];

function index({navigation}) {
  return (
    <>
      <View
        style={{width: '100%', height: '100%', backgroundColor: colors.white}}>
        <TouchableOpacity
          onPress={() => {
            navigation?.goBack();
          }}
          style={{paddingTop: 30, paddingHorizontal: 20, marginTop: '3%'}}>
          <Image source={appIcons.backArrow} style={styles.imageStyle} />
        </TouchableOpacity>
        <ImageBackground
          source={appIcons.permission_img}
          style={styles.imgCon}
          imageStyle={{height: '100%'}}
          resizeMode={'contain'}>
          <MyStatusBar
            backgroundColor={'transparent'}
            barStyle={'dark-content'}
          />
        </ImageBackground>
        <View style={{width: '95%', alignSelf: 'center'}}>
          <Text style={[theme.Text.h1Bold, styles.heading]}>
            {I18n.t('welcome_to_resihop_msg')}
          </Text>
          <Text style={[theme.Text.h4Normal, styles.sayingText]}>
            {I18n.t('dummy_ipsum_msg_small')}
          </Text>
        </View>
        <View style={styles.permissionContainer}>
          {permissions.map(item => {
            return (
              <View style={styles.textContainer}>
                <View style={styles.greenDot} />
                <Text
                  style={[
                    theme.Text.h4Normal,
                    {marginStart: '2%', fontSize: 15},
                  ]}>
                  {item.text}
                </Text>
              </View>
            );
          })}
        </View>
        <View
          style={{
            paddingVertical: 25,
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <AgreeButton
            width={'90%'}
            fontWeight={'bold'}
            bgColor={colors.primary}
            title={'Allow'}
            txtColor={colors.white}
            onPress={() => navigation.navigate('SignInScreen')}
          />
        </View>
      </View>
    </>
  );
}

export default index;

const styles = StyleSheet.create({
  backIcon: {
    width: '10%',
  },
  imgCon: {
    width: '95%',
    height: '40%',
    marginTop: '5%',
    alignSelf: 'center',
  },
  heading: {
    textAlign: 'center',
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
  greenDot: {
    width: 5,
    height: 5,
    borderRadius: 20,
    backgroundColor: '#47B000',
  },
  permissionContainer: {
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  textContainer: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
