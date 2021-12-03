import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {CustomHeader, Header} from '../../components';
import {Container} from '../../components/Container';
import _ from 'lodash/string';
import {theme} from '../../theme';
import OtpValidator from '../../components/OtpValidator';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import I18n from '../../utilities/translations';
function signIn(props) {
  return (
    <>
      <CustomHeader navigation={props?.navigation} backButton={true} />
      <Container padding={0}>
        <View style={styles.viewCon}>
          <Text style={[theme.Text.h1Bold, styles.heading]}>
            {_.startCase(I18n.t('sign_in'))}
          </Text>
          <Text style={[theme.Text.h2Bold]}>
            {_.startCase(I18n.t('mobile_number'))}
          </Text>
          <OtpValidator />
        </View>
      </Container>
    </>
  );
}

export default signIn;

const styles = StyleSheet.create({
  iconLeft: {
    width: '12%',
    marginTop: 20,
  },
  viewCon: {
    padding: 20,
  },
  heading: {
    marginBottom: 20,
  },
  inputCon: {
    marginTop: 30,
    marginBottom: 10,
    flexDirection: 'row',
  },
  pickerCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  otpCon: {
    marginTop: 50,
  },
});
