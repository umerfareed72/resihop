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
import _ from 'lodash/string';
import {theme} from '../../theme';
import OtpValidator from '../../components/OtpValidator';
import I18n from '../../utilities/translations';
import auth from '@react-native-firebase/auth';
import Loader from '../../components/Loader/Loader';
import {useDispatch} from 'react-redux';
import {userEmailSignup} from '../../redux/actions/auth.action';
import {checkConnected} from '../../utilities';
import {get} from '../../services';

function SignUp(props) {
  const dispatch = useDispatch(null);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [country, setCountry] = useState();
  const [phoneError, setPhoneError] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [countryCode, setCountryCode] = useState('47');
  const [cca2, setcca2] = useState('NO');
  const [otpInput, setOtpInput] = useState(false);

  const onSelect = country => {
    setCountry(country);
    setcca2(country?.cca2);
    setCountryCode(country?.callingCode[0]);
  };

  function validate() {
    setPhoneError('');
    if (phoneNum.length == 0) {
      return setPhoneError('Please Enter Valid Phone Number');
    }
    if (isNaN(phoneNum)) {
      return setPhoneError('Your Phone Number is not valid');
    }
    return true;
  }

  const signInWithPhoneNumber = async () => {
    const isConnected = await checkConnected();
    if (isConnected) {
      setIsLoading(true);
      signIn();
    } else {
      alert('Check your internet connection');
    }
  };

  async function signIn() {
    try {
      const mobilePhone = `%2b${
        country ? country.callingCode : '47'
      }${phoneNum}`;
      const getUser = await get(`users?mobile=${mobilePhone}`);
      if (getUser?.data?.length == 0) {
        const phone = `+${country ? country.callingCode : '47'}${phoneNum}`;
        const confirmation = await auth().signInWithPhoneNumber(phone);
        if (confirmation) {
          setIsLoading(false);
          setConfirm(confirmation);
          setOtpInput(true);
        }
      } else {
        setIsLoading(false);

        Alert.alert(
          'Failed',
          'User Alredy Registered',
          [
            {
              text: 'ok',
              onPress: () => console.log('OK'),
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  }

  async function confirmCode(code) {
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
    Keyboard.dismiss();
    if (validate()) {
      signInWithPhoneNumber();
    }
  };

  const userRegistrationApi = async () => {
    setIsLoading(true);
    const phone = `+${country ? country.callingCode : '47'}${phoneNum}`;
    const requestBody = {
      username: phone,
      email: `${phone}@resihop.com`,
      password: '123456',
      mobile: phone,
    };
    const CountryData = {
      phone: phoneNum,
      cca2: cca2,
      code: countryCode,
    };

    dispatch(
      userEmailSignup(requestBody, CountryData, setIsLoading, res => {
        if (res) {
          setIsLoading(false);
          Alert.alert(
            'Success',
            'User Registered Successfully',
            [
              {
                text: 'ok',
                onPress: () => props.navigation.navigate('UserDetailStack'),
              },
            ],
            {cancelable: false},
          );
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
          chnagePhone={val => {
            let s = val.replace(/^0+/, '');
            setPhoneNum(s);
          }}
          selectedCountry={country}
          onCountrySelect={onSelect}
          onSendCodePress={onSendCode}
          defaultCountryCode={cca2}
          otpCodeArea={otpInput}
          setOtpCodeArea={setOtpInput}
          enteredCode={code => {
            if (code.length === 6) {
              confirmCode(code);
            }
          }}
          phoneError={phoneError}
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
