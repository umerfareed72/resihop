import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';
import {landing_user_img} from '../assets';
import {Header} from '../components';
import {Container} from '../components/Container';
import {theme} from '../theme';
import {
  dummy_ipsum_msg,
  login,
  sign_up,
  welcome_to_resihop_msg,
} from '../theme/strings';

function landingUser() {
  return (
    <Container paddingBottom={200} padding={0}>
      <Header showLeft={false} />
        <View style={{width: '100%', height: '100%'}}>
          <ImageBackground
            source={landing_user_img}
            style={styles.imgCon}
            imageStyle={{height: '100%'}}
            resizeMode={'cover'}>
            <TouchableOpacity
              onPress={() => {
                //   goToRootStack();
              }}
              style={styles.backIcon}>
              <Icon name={'arrowleft'} type={'antdesign'} />
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
                //   Navigation.push(AUTH_NAV_ID, SignInScreen);
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
                //   Navigation.push(AUTH_NAV_ID, SignUpScreen);
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
    </Container>
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
});
