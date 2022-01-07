import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ToastAndroid,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import {CustomHeader, Header, NetInfoModal} from '../../components';
import _ from 'lodash/string';
import {theme} from '../../theme';
import OtpValidator from '../../components/OtpValidator';
import I18n from '../../utilities/translations';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {userEmailLogin} from '../../redux/actions/auth.action';
import Loader from '../../components/Loader/Loader';
import {Login_Failure} from '../../redux/types/auth.types';
import {checkConnected, useOnlineStatus} from '../../utilities';
import {Platform} from 'react-native';

function signIn(props) {
  const dispatch = useDispatch(null);

  const [isLoading, setIsLoading] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [country, setCountry] = useState();

  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [countryCode, setCountryCode] = useState('47');
  const [cca2, setcca2] = useState('NO');
  const [otpInput, setOtpInput] = useState(false);
  const [isOnline, setisOnline] = useState(false);
  const onSelect = country => {
    setCountry(country);
    setcca2(country?.cca2);
    setCountryCode(country?.callingCode[0]);
  };

  const signInWithPhoneNumber = () => {
    setIsLoading(true);
    signIn();
  };

  async function signIn() {
    const isConnected = await checkConnected();
    if (isConnected) {
      setIsLoading(true);
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
    } else {
      setisOnline(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (code.length === 6) {
      confirmCode();
    }
  }, [code]);

  async function confirmCode() {
    const isConnected = await checkConnected();
    if (isConnected) {
      setisOnline(false);
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
    } else {
      setisOnline(true);
      setIsLoading(false);
    }
  }

  const onSendCode = () => {
    Keyboard.dismiss();
    if (phoneNum === '') {
      if (Platform.OS === 'android') {
        ToastAndroid.show(I18n.t('please_enter_phone_msg'), ToastAndroid.LONG);
      } else {
        alert(I18n.t('please_enter_phone_msg'));
      }
      return;
    } else {
      signInWithPhoneNumber();
    }
  };

  const userLgoinApi = () => {
    setIsLoading(true);
    const phone = `+${country ? country.callingCode : '47'}${phoneNum}`;
    const requestBody = {
      identifier: phone,
      password: '123456',
    };
    dispatch(
      userEmailLogin(requestBody, setIsLoading, res => {
        console.log('LOGIN API RESPONSE:', res.toString());
        if (res.toString() === 'Error: Request failed with status code 400') {
          setIsLoading(false);
          Alert.alert('Error', 'Something went wrong');
        } else {
          setIsLoading(false);
          if (res?.user?.details) {
            props.navigation.replace('PassengerDashboard');
          } else {
            props.navigation.navigate('UserDetailStack');
          }
        }
      }),
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CustomHeader navigation={props?.navigation} backButton={true} />
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
          setOtpCodeArea={setOtpInput}
          enteredCode={code => setCode(code)}
        />
      </View>
      {isLoading ? <Loader /> : null}
      <NetInfoModal
        show={isOnline}
        onRetry={async () => {
          const isConnected = await checkConnected();
          if (isConnected) {
            setisOnline(false);
          }
        }}
        isRetrying={isLoading}
      />
    </View>
  );
}

export default signIn;

const styles = StyleSheet.create({
  iconLeft: {
    width: '12%',
    marginTop: 18,
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
