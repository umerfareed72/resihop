import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {landing_img} from '../../assets';
import {Header} from '../../components';
import ChooseLanguage from '../../components/ChooseLanguage';
import {Container} from '../../components/Container';
import {next} from '../../theme/strings';
import {theme} from '../../theme/theme';
import {appIcons, drawerIcons} from '../../utilities/images';

function languageSelect(props) {
  const [language, setLanguage] = useState('');

  return (
    <Container>
      <View>
        <View style={styles.imgCon}>
          <Image source={appIcons.landing_img} style={styles.img} />
        </View>

        <Text style={[theme.Text.h1Bold, styles.heading]}>
          Select Your Language
        </Text>
        <View>
          <ChooseLanguage
            onSelected={lang => {
              setLanguage(lang);
            }}
          />

          <Button
            title={next}
            buttonStyle={theme.Button.buttonStyle}
            titleStyle={theme.Button.titleStyle}
            onPress={() => {
              props.navigation.navigate('WalkThrough');
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
