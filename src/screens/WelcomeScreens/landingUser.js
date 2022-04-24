import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {theme} from '../../theme';

import {appIcons, colors} from '../../utilities';
import I18n from '../../utilities/translations';

function landingUser({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={appIcons.landing_user_img} style={styles.imgCon} />
        <Text style={[theme.Text.h1Bold, styles.heading]}>
          {I18n.t('welcome_to_resihop_msg')}
        </Text>
        <View>
          <Text style={[theme.Text.h4Normal, styles.sayingText]}>
            {I18n.t('lorem_epsom1')}
          </Text>
          <Button
            title={I18n.t('login')}
            buttonStyle={theme.Button.buttonStyle}
            titleStyle={theme.Button.titleStyle}
            onPress={() => {
              navigation.navigate('SignInScreen');
            }}
            disabledStyle={theme.Button.disabledStyle}
            disabledTitleStyle={theme.Button.disabledTitleStyle}
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginVertical: 10,
            }}
          />

          <Button
            title={I18n.t('sign_up')}
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}
            buttonStyle={[theme.Button.buttonStyle, styles.signUpButton]}
            titleStyle={[theme.Button.titleStyle, styles.signUpBtnText]}
            disabledTitleStyle={theme.Button.disabledTitleStyle}
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginVertical: 10,
            }}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={appIcons.backArrow} style={styles.imageStyle} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default landingUser;

const styles = StyleSheet.create({
  backIcon: {
    width: '10%',
  },
  imgCon: {
    width: '100%',
    height: 340,
  },
  heading: {
    textAlign: 'center',
    marginTop: 20,
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
  headerContainer: {
    paddingRight: 20,
    position: 'absolute',
    top: 50,
    left: 20,
  },
});
