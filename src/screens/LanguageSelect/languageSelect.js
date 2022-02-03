import React, {useEffect, useRef, useState} from 'react';
import {Linking} from 'react-native';
import {Text, View, StyleSheet, Image, NativeModules} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {useDispatch} from 'react-redux';
import ChooseLanguage from '../../components/ChooseLanguage';
import {Container} from '../../components/Container';
import MyStatusBar from '../../components/Header/statusBar';
import {LanguageInfo} from '../../redux/actions/auth.action';
import {theme} from '../../theme/theme';
import {colors} from '../../utilities';
import {appIcons, drawerIcons} from '../../utilities/images';
import I18n from '../../utilities/translations';
import axios from 'axios';
import useAppState from '../../hooks/useAppState';
function languageSelect(props) {
  const dispatch = useDispatch(null);
  const [language, setLanguage] = useState('');
  const bank_url = useRef();

  const acr = 'urn:grn:authn:se:bankid:same-device';
  const appState = useAppState(async () => {
    if (acr === 'urn:grn:authn:se:bankid:same-device') {
      const result = await fetch(bank_url?.current).then(response => {
        return response;
      });
      const token = result?.url.split('id_token=');
      if (token[1]) {
        console.log(token[1]);
      }
    }
  });
  const openBankId = async () => {
    // props.navigation.navigate('WalkThrough');
    const result = await axios.get(
      'https://res-ihop-test.criipto.id/dXJuOmdybjphdXRobjpzZTpiYW5raWQ6c2FtZS1kZXZpY2U=/oauth2/authorize?response_type=id_token&client_id=urn:my:application:identifier:5088&redirect_uri=https://dev-49tni-0p.us.auth0.com/login/callback&acr_values=urn:grn:authn:se:bankid:same-device&scope=openid&state=etats&login_hint=appswitch:android',
    );
    if (result?.data) {
      bank_url.current = result?.data?.completeUrl;
      Linking.openURL(result?.data?.launchLinks?.customFileHandlerUrl);
    }
  };
  return (
    <>
      <MyStatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <Container>
        <View>
          <View style={styles.imgCon}>
            <Image source={appIcons.landing_img} style={styles.img} />
          </View>
          <Text style={[theme.Text.h1Bold, styles.heading]}>
            {I18n.t('select_language_title')}
          </Text>
          <View>
            <ChooseLanguage
              onSelected={lang => {
                setLanguage(lang);
              }}
            />
            <Button
              title={I18n.t('next')}
              buttonStyle={theme.Button.buttonStyle}
              titleStyle={theme.Button.titleStyle}
              onPress={() => {
                dispatch(
                  LanguageInfo(language, () => {
                    openBankId();
                  }),
                );
              }}
              disabled={language === ''}
              disabledStyle={theme.Button.disabledStyle}
              disabledTitleStyle={theme.Button.disabledTitleStyle}
              containerStyle={{
                width: '90%',
                alignSelf: 'center',
                marginTop: 30,
              }}
            />
          </View>
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  imgCon: {
    width: '100%',
    height: '42%',
    justifyContent: 'flex-end',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heading: {
    textAlign: 'center',
    padding: 10,
    marginBottom: 10,
  },
});

export default languageSelect;
