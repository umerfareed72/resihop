import React, {useState} from 'react';
import {Linking} from 'react-native';
import {Text, View, StyleSheet, Image} from 'react-native';
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
import Auth0 from 'react-native-auth0';
import axios from 'axios';

function languageSelect(props) {
  const dispatch = useDispatch(null);
  const [language, setLanguage] = useState('');
  const openBankId = () => {
    // props.navigation.navigate('WalkThrough');
    // /Anaxg0bS2P/k3Y1Bd7646+IOLJfen8zlA5Prf5cRW8=
    axios
      .get('https://resi-hop.criipto.id/.well-known/openid-configuration')
      .then(res => {
        // Linking.openURL(
        //   'https://app.bankid.com/?autostarttoken=a4904c4c-3bb4-4e3f-8ac3-0e950e529e5f&redirect=https%3a%2f%2fdemo.bankid.com%2fnyademobanken%2fCavaClientRedirRecei ver.aspx%3forderRef%3dbedea56d-7b46-47b1-890b- f787c650bc93%26returnUrl%3d.%2fCavaClientAuth.aspx%26Environment%3dKundtest&redirect=https://resi-hop.onelogin.com/access/idp.',
        // );
        axios
          .get(
            'https://resi-hop.criipto.id/dXJuOmdybjphdXRobjpzZTpiYW5raWQ=/oauth2/authorize?response_type=id_token&client_id=urn:my:application:identifier:7149&acr_values=urn:grn:authn:se:bankid&redirect_uri=https://resi-hop.onelogin.com/access/idp.&scope=openid&state=etats',
          )
          .then(res => {
            var parseString = require('react-native-xml2js').parseString;
            console.log(res.data);
          });
      });
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
