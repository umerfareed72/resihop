import React from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {CustomHeader} from '../components';
import {Container} from '../components/Container';
import {theme} from '../theme';

import {appIcons, colors} from '../utilities';
import I18n from '../utilities/translations';

function landingUser({navigation}) {
  return (
    <>
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <CustomHeader navigation={navigation} backButton={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container padding={0}>
            <Image
              source={appIcons.landing_user_img}
              style={styles.imgCon}
            />
            <Text style={[theme.Text.h1Bold, styles.heading]}>
              {I18n.t('welcome_to_resihop_msg')}
            </Text>
            <View>
              <Text style={[theme.Text.h4Normal, styles.sayingText]}>
                {I18n.t('dummy_ipsum_msg')}
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
                  marginTop: 30,
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
                  marginTop: 20,
                }}
              />
            </View>
          </Container>
        </ScrollView>
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
    height: 300,
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
