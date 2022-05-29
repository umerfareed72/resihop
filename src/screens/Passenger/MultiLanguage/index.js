import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {CustomHeader, Loader} from '../../../components';
import ChooseLanguage from '../../../components/ChooseLanguage';
import {Container} from '../../../components/Container';
import {theme} from '../../../theme/theme';
import I18n from '../../../utilities/translations';
import {StackActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {LanguageInfo} from '../../../redux/actions/auth.action';

function MultiLanguage(props) {
  const [language, setLanguage] = useState('');
  const [loading, setloading] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('lang').then(res => {
      setLanguage(res);
    });
  }, []);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch(null);
  const handleLanguage = async lang => {
    setLanguage(lang);
    I18n.locale = lang;
  };
  const submitLang = async () => {
    setloading(true);
    AsyncStorage.setItem('lang', language);
    dispatch(
      LanguageInfo(language, auth?.profile_info?._id, () => {
        AsyncStorage.setItem('lang', language);
        props.navigation.dispatch(StackActions.popToTop());
        setloading(false);
      }),
    );
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
      {loading && <Loader />}
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
