import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {landing_img} from '../../assets';
import {Header} from '../../components';
import ChooseLanguage from '../../components/ChooseLanguage';
import {Container} from '../../components/Container';
import {theme} from '../../theme/theme';

function languageSelect() {
  let navigation = useNavigation();

  return (
    <>
      <Header showLeft={false} />
      <Container>
        <View>
          <View style={styles.imgCon}>
            <Image source={landing_img} style={styles.img} />
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
              // title={forUpdate ? 'Update Language' : next}
              buttonStyle={theme.Button.buttonStyle}
              titleStyle={theme.Button.titleStyle}
              onPress={() => {
                navigation?.navigate('Payment');
                // if (forUpdate) {
                //   showToast('Language Got Updated');
                //   Navigation.pop(HOME_NAV_ID);
                // } else {
                //   isFirstTime
                //     ? Navigation.push(INTRO_NAV_ID, WalkThroughScreen)
                //     : goToLandingUser();
                // }
                navigation.navigate('PassengerHome');
              }}
              // disabled={language === undefined}
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
