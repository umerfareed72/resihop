import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {CustomHeader, Header} from '../../components';
import {Container} from '../../components/Container';
import _ from 'lodash/string';
import {mobile_number, sign_in} from '../../theme/strings';
import {theme} from '../../theme';
import OtpValidator from '../../components/OtpValidator';

function signIn(props) {
  return (
    <Container padding={0}>
      <Header leftAction={() => props.navigation.goBack()} />
      <View style={styles.viewCon}>
        <Text style={[theme.Text.h1Bold, styles.heading]}>
          {_.startCase(sign_in)}
        </Text>
        <Text style={[theme.Text.h2Bold]}>{_.startCase(mobile_number)}</Text>
        <OtpValidator
          maxLengthAction={() => console.log("Fucntion Call")}
        />
      </View>
    </Container>
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
