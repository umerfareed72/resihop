import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, NativeModules} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {useDispatch} from 'react-redux';
import {Container, ChooseLanguage} from '../../../components';
import MyStatusBar from '../../../components/Header/statusBar';
import {LanguageInfo} from '../../../redux/actions/auth.action';
import {theme} from '../../../theme/theme';
import {colors, languageSelector} from '../../../utilities';
import {appIcons, drawerIcons} from '../../../utilities/images';
import I18n from '../../../utilities/translations';

function languageSelect(props) {
  const dispatch = useDispatch(null);
  const [language, setLanguage] = useState('en');
  const handleLanguage = async lang => {
    setLanguage(lang);
    I18n.locale = lang;
  };
  useEffect(() => {
    AsyncStorage.getItem('lang').then(res => {
      if (res) {
        setLanguage(res);
      } else {
        setLanguage('en');
      }
    });
  }, []);
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
                handleLanguage(lang);
              }}
              english={'English'}
              norway={'Norska'}
              selectedLang={language}
            />
            <Button
              title={I18n.t('next')}
              buttonStyle={theme.Button.buttonStyle}
              titleStyle={theme.Button.titleStyle}
              onPress={() => {
                dispatch(
                  LanguageInfo(language, null, () => {
                    AsyncStorage.setItem('lang', language);
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
