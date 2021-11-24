import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {CustomHeader} from '../../../components';

import ChooseLanguage from '../../../components/ChooseLanguage';
import {Container} from '../../../components/Container';
import {theme} from '../../../theme/theme';

import I18n from '../../../utilities/translations';

function MultiLanguage(props) {
  const [language, setLanguage] = useState('');

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
              setLanguage(lang);
            }}
          />

          <Button
            title={I18n.t('change_language')}
            buttonStyle={theme.Button.buttonStyle}
            titleStyle={theme.Button.titleStyle}
            onPress={() => {
              props.navigation.navigate('Settings');
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
