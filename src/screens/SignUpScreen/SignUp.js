import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {CustomHeader, Header} from '../../components';
import {Container} from '../../components/Container';
import _ from 'lodash/string';
import {mobile_number, sign_up} from '../../theme/strings';
import {theme} from '../../theme';
import OtpValidator from '../../components/OtpValidator';

function SignUp(props) {
  return (
    <>
      <CustomHeader navigation={props?.navigation} backButton={true} />

      <Container padding={0}>
        <View style={styles.viewCon}>
          <Text style={[theme.Text.h1Bold, styles.heading]}>
            {_.startCase(sign_up)}
          </Text>
          <Text style={[theme.Text.h2Bold]}>{_.startCase(mobile_number)}</Text>
          <OtpValidator />
        </View>
      </Container>
    </>
  );
}

export default SignUp;

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
