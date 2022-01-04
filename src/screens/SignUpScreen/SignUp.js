import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  ToastAndroid,
  Alert,
} from 'react-native';
import {CustomHeader} from '../../components';
import {Container} from '../../components/Container';
import _ from 'lodash/string';
import {theme} from '../../theme';
import OtpValidator from '../../components/OtpValidator';
import I18n from '../../utilities/translations';
import auth from '@react-native-firebase/auth';
import CheckConnectivity from '../../utilities/CheckInternet/CheckInternet';
import Loader from '../../components/Loader/Loader';
import {useDispatch} from 'react-redux';
import {userEmailSignup} from '../../redux/actions/auth.action';

function SignUp(props) {
  const dispatch = useDispatch(null);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [country, setCountry] = useState();

  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [countryCode, setCountryCode] = useState('47');
  const [cca2, setcca2] = useState('NO');
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
      const phone = `+${country ? country.callingCode : '47'}${phoneNum}`;
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
        userRegistrationApi();
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

  const userRegistrationApi = () => {
    setIsLoading(true);
    const phone = `+${country ? country.callingCode : '47'}${phoneNum}`;
    const requestBody = {
      username: phone,
      email: `${phone}@resihop.com`,
      password: '123456',
    };
    dispatch(
      userEmailSignup(requestBody, setIsLoading, res => {
        console.log('Registration Api Response:-', res);
        if (res) {
          setIsLoading(false);
          Alert.alert('Success', 'User sucessfully registered');
          props.navigation.navigate('PersonFalDetails');
        }
      }),
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CustomHeader navigation={props?.navigation} backButton={true} />
      <View style={styles.viewCon}>
        <Text style={[theme.Text.h1Bold, styles.heading]}>
          {_.startCase(I18n.t('sign_up'))}
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
      {isLoading ? <Loader /> : null}
    </View>
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
    bottom: 20,
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
