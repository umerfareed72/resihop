import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ToastAndroid,
  Keyboard,
  Alert,
} from 'react-native';
import {CustomHeader, Header} from '../../components';
import {Container} from '../../components/Container';
import _ from 'lodash/string';
import {theme} from '../../theme';
import OtpValidator from '../../components/OtpValidator';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import I18n from '../../utilities/translations';
import {useDispatch} from 'react-redux';
import CheckConnectivity from '../../utilities/CheckInternet/CheckInternet';
import auth from '@react-native-firebase/auth';
import {userEmailLogin} from '../../redux/actions/auth.action';
import Loader from '../../components/Loader/Loader';

function signIn(props) {
  const dispatch = useDispatch(null);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [country, setCountry] = useState();

  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [countryCode, setCountryCode] = useState('92');
  const [cca2, setcca2] = useState('PK');
  const [otpInput, setOtpInput] = useState(false);

  const onSelect = country => {
    setCountry(country);
    setcca2(country?.cca2);
    setCountryCode(country?.callingCode[0]);
  };

  const signInWithPhoneNumber = () => {
    CheckConnectivity().then(connected => {
      if (connected) {
        setIsLoading(true);
        signIn();
      } else {
        alert('Check your internet connection');
      }
    });
  };

  async function signIn() {
    try {
      const phone = `+${country ? country.callingCode : '92'}${phoneNum}`;
      const confirmation = await auth().signInWithPhoneNumber(phone);
      if (confirmation) {
        setIsLoading(false);
        setConfirm(confirmation);
        setOtpInput(true);
      }
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  }

  useEffect(() => {
    if (code.length === 6) {
      confirmCode();
    }
  }, [code]);

  async function confirmCode() {
    setIsLoading(true);
    try {
      await confirm.confirm(code).then(res => {
        setIsLoading(false);
        console.log('Registered User Id:', res?.user?.uid);
        setOtpInput(false);
        setPhoneNum('');
        userLgoinApi();
      });
    } catch (error) {
      console.log('Error:-', error);
      setIsLoading(false);
      alert('Invalid code.');
    }
  }

  const onSendCode = () => {
    console.log('Send Code Button pressed');
    Keyboard.dismiss();
    if (phoneNum === '') {
      ToastAndroid.show(I18n.t('please_enter_phone_msg'), ToastAndroid.LONG);
      return;
    } else {
      signInWithPhoneNumber();
    }
  };

  const userLgoinApi = () => {
    const phone = `+${country ? country.callingCode : '92'}${phoneNum}`;
    const requestBody = {
      identifier: phone,
      password: '123456',
    };
    dispatch(
      userEmailLogin(requestBody, res => {
        console.log(res);
        if (res) {
          Alert.alert('Success', 'User sucessfully logged in', [
            {
              text: 'OK',
              onPress: () => props.navigation.navigate('PersonalDetails'),
            },
          ]);
        } else {
          Alert.alert('Error', 'This Number is not Registered');
        }
      }),
    );
  };
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
          <OtpValidator
            phoneNumber={phoneNum}
            chnagePhone={val => setPhoneNum(val)}
            selectedCountry={country}
            onCountrySelect={onSelect}
            onSendCodePress={onSendCode}
            defaultCountryCode={cca2}
            otpCodeArea={otpInput}
            enteredCode={code => setCode(code)}
          />
        </View>
      </Container>
      {isLoading ? <Loader /> : null}
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
