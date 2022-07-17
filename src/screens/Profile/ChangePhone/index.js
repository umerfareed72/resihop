import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import _ from 'lodash/string';
import {theme} from '../../../theme';
import {
  CustomHeader,
  NetInfoModal,
  Loader,
  OtpValidator,
  Container,
} from '../../../components';
import I18n from '../../../utilities/translations';
import {useDispatch, useSelector} from 'react-redux';
import {checkConnected} from '../../../utilities';
import {get} from '../../../services';
import {Keyboard} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {updateInfo} from '../../../redux/actions/auth.action';

function signIn(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [country, setCountry] = useState();
  const [confirm, setConfirm] = useState(null);
  const [phoneError, setPhoneError] = useState('');
  const [countryCode, setCountryCode] = useState('47');
  const [cca2, setcca2] = useState('NO');
  const [otpInput, setOtpInput] = useState(false);
  const [isOnline, setisOnline] = useState(false);
  const Userdata = useSelector(state => state.auth);
  const dispatch = useDispatch(null);

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

  const signInWithPhoneNumber = () => {
    // setIsLoading(true);
    signIn();
  };
  async function signIn() {
    const isConnected = await checkConnected();
    if (isConnected) {
      setIsLoading(true);
      try {
        const mobilePhone = `%2b${countryCode ? countryCode : '47'}${phoneNum}`;

        const getUser = await get(`users?mobile=${mobilePhone}`);
        if (getUser?.data?.length === 0) {
          const phone = `+${countryCode ? countryCode : '47'}${phoneNum}`;
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
            'User alredy exist with this phone number',
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
          console.log('Registered User Id:', res?.user?.uid);
          setOtpInput(false);
          setPhoneNum('');
          ChangePhoneNumber();
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
  const ChangePhoneNumber = () => {
    setIsLoading(true);
    let phone;
    setIsLoading(true);
    phone = `+${countryCode ? countryCode : '47'}${phoneNum}`;

    const requestBody = {
      username: phone,
      mobile: phone,
      country: {
        phone: phoneNum,
        cca2: cca2,
        code: countryCode,
      },
    };
    dispatch(
      updateInfo(
        Userdata?.userdata?.user?.id,
        requestBody,
        () => {
          setIsLoading(false);
          Alert.alert(
            'Success',
            'Phone number changed successfully!',
            [
              {
                text: 'OK',
                onPress: () => {
                  console.log('Updated');
                },
              },
            ],
            {cancelable: false},
          );
        },
        error => {
          console.log('Failed to update data', error);
          setIsLoading(false);
        },
      ),
    );
  };

  useEffect(() => {
    setPhoneNum(Userdata?.profile_info?.country?.phone);
    setCountryCode(Userdata?.profile_info?.country?.code);
    setcca2(Userdata?.profile_info?.country?.cca2);
  }, []);
  return (
    <>
      <CustomHeader
        title={I18n.t('change_phone')}
        navigation={props?.navigation}
        backButton={true}
      />
      <Container padding={0}>
        <View style={styles.viewCon}>
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
