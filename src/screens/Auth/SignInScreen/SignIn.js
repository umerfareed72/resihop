import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Keyboard, Alert} from 'react-native';
import {
  CustomHeader,
  NetInfoModal,
  Loader,
  OtpValidator,
} from '../../../components';
import _ from 'lodash/string';
import {theme} from '../../../theme';
import I18n from '../../../utilities/translations';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {SwitchDrive, userEmailLogin} from '../../../redux/actions/auth.action';
import {checkConnected} from '../../../utilities';
import {get} from '../../../services';

function signIn(props) {
  const dispatch = useDispatch(null);

  const [isLoading, setIsLoading] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [country, setCountry] = useState();
  const [confirm, setConfirm] = useState(null);
  const [phoneError, setPhoneError] = useState('');
  const [countryCode, setCountryCode] = useState('47');
  const [cca2, setcca2] = useState('NO');
  const [otpInput, setOtpInput] = useState(false);
  const [isOnline, setisOnline] = useState(false);
  const [otpCode, setotpCode] = useState('');
  const onSelect = country => {
    setCountry(country);
    setcca2(country?.cca2);
    setCountryCode(country?.callingCode[0]);
  };

  function validate() {
    setPhoneError('');
    if (phoneNum.length == 0) {
      return setPhoneError(I18n.t('invalid_phone_msg'));
    }
    if (isNaN(phoneNum)) {
      return setPhoneError(I18n.t('invalid_otp_msg'));
    }
    return true;
  }

  const signInWithPhoneNumber = () => {
    // setIsLoading(true);
    signIn();
  };

  async function signIn() {
    const isConnected = await checkConnected();
    if (isConnected) {
      setIsLoading(true);
      try {
        const mobilePhone = `%2b${
          country ? country.callingCode : '47'
        }${phoneNum}`;
        const getUser = await get(`users?mobile=${mobilePhone}`);
        if (getUser?.data?.length > 0) {
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
            I18n.t('user_not_exists'),
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
    } else {
      setisOnline(true);
      setIsLoading(false);
    }
  }

  async function confirmCode(code) {
    const isConnected = await checkConnected();
    if (isConnected) {
      setisOnline(false);
      setIsLoading(true);
      try {
        await confirm.confirm(code).then(res => {
          setIsLoading(false);
          console.log('Login User Id:', res?.user?.uid);
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
    if (validate()) {
      signInWithPhoneNumber();
    }
  };

  const userLgoinApi = () => {
    let phone;
    setIsLoading(true);
    phone = `+${country ? country.callingCode : '47'}${phoneNum}`;
    const requestBody = {
      identifier: phone,
      password: '123456',
    };
    const CountryData = {
      phone: phoneNum,
      cca2: cca2,
      code: countryCode,
    };
    dispatch(
      userEmailLogin(requestBody, CountryData, setIsLoading, res => {
        setIsLoading(false);
        if (res?.user?.details) {
          if (res?.user?.type == 'DRIVER') {
            if (res?.user?.vehicle) {
              props.navigation.replace('DriverDashboard');
            } else {
              const body = {
                switching: false,
              };
              dispatch(
                SwitchDrive(body, () => {
                  props.navigation.replace('VehicleStack');
                }),
              );
            }
          } else {
            props.navigation.replace('PassengerDashboard');
          }
        } else {
          props.navigation.replace('UserDetailStack');
        }
      }),
    );
    setIsLoading(false);
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
              setotpCode(code);
            }
          }}
          onSubmitCode={() => {
            confirmCode(otpCode);
          }}
          phoneError={phoneError}
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
