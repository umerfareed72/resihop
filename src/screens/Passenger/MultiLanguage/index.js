import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {CustomHeader} from '../../../components';
import ChooseLanguage from '../../../components/ChooseLanguage';
import {Container} from '../../../components/Container';
import {theme} from '../../../theme/theme';
import I18n from '../../../utilities/translations';
import {StackActions} from '@react-navigation/native';

function MultiLanguage(props) {
  const [language, setLanguage] = useState('');
  const handleLanguage = async lang => {
    setLanguage(lang);
    I18n.locale = lang;
  };
  const submitLang = async () => {
    AsyncStorage.setItem('lang', language);
    props.navigation.dispatch(StackActions.popToTop());
  };
  return (
    <>
      <CustomHeader
        backButton={true}
        navigation={props?.navigation}
        title={I18n.t('language')}
      />
      <Container>
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
            title={I18n.t('change_language')}
            buttonStyle={theme.Button.buttonStyle}
            titleStyle={theme.Button.titleStyle}
            onPress={() => {
              submitLang();
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
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    padding: 10,
    marginBottom: 10,
  },
});

export default MultiLanguage;
