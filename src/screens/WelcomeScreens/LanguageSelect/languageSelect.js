import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, NativeModules} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {useDispatch} from 'react-redux';
import ChooseLanguage from '../../../components/ChooseLanguage';
import {Container} from '../../../components/Container';
import MyStatusBar from '../../../components/Header/statusBar';
import {LanguageInfo} from '../../../redux/actions/auth.action';
import {theme} from '../../../theme/theme';
import {colors} from '../../../utilities';
import {appIcons, drawerIcons} from '../../../utilities/images';
import I18n from '../../../utilities/translations';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {Linking} from 'react-native';
import {LinkHelper} from '../../../utilities/helpers/LinkHelper';

function languageSelect(props) {
  const dispatch = useDispatch(null);
  const [language, setLanguage] = useState('');
  // async function buildLink() {
  //   const ShareableLink = await LinkHelper();
  //   Linking.openURL(ShareableLink);
  // }
  // const handleDynamicLink = link => {
  //   // Handle dynamic link inside your own application
  //   if (link.url === 'https://resihop.page.link/N8fh') {
  //     // ...navigate to your offers screen
  //   }
  // };

  // useEffect(() => {
  //   const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
  //   // When the component is unmounted, remove the listener
  //   return () => unsubscribe();
  // }, []);
  // useEffect(() => {
  //   dynamicLinks()
  //     .getInitialLink()
  //     .then(link => {
  //       if (link.url === 'https://resihop.page.link/N8fh') {
  //         // ...set initial route as offers screen
  //       }
  //     });
  // }, []);

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
                // buildLink();
                dispatch(
                  LanguageInfo(language, () => {
                    props.navigation.navigate('WalkThrough');
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
