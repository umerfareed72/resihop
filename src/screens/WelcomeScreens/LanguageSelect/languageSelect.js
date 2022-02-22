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

function languageSelect(props) {
  const dispatch = useDispatch(null);
  const [language, setLanguage] = useState('');

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
