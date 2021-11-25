import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import {Button, Divider, Icon, Input, Text} from 'react-native-elements';
import CountryPicker, {Country} from 'react-native-country-picker-modal';
import {theme} from '../theme';
import {
  please_enter_phone_msg,
  send_code,
  verify_code,
  verify_your_code,
} from '../theme/strings';
import reactotron from 'reactotron-react-native';
import CountDownTimer from 'react-native-countdown-timer-hooks';
import {useNavigation} from '@react-navigation/native';

const OtpValidator = ({isSignUp}) => {
  const navigation = useNavigation();
  const [country, setCountry] = useState();
  const [phoneNum, setPhoneNum] = useState('');
  const [countDown, setCountDown] = useState(30);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [otpArea, setOtpArea] = useState(false);
  const refTimer = useRef();
  const numRef = useRef();
  const onSelect = country => {
    setCountry(country);
    numRef.current.focus();
  };
  const [timerEnd, setTimerEnd] = useState(false);
  const timerCallbackFunc = timerFlag => {
    // Setting timer flag to finished
    setTimerEnd(timerFlag);
    setOtpArea(!otpArea);
  };

  const onSendCodePress = () => {
    Keyboard.dismiss();
    if (phoneNum === '') {
      ToastAndroid.show(please_enter_phone_msg, ToastAndroid.LONG);
      return;
    }
    setOtpArea(true);
    const phone = `+${country ? country.callingCode : '47'}${phoneNum}`;
    reactotron.log(phone);
    reactotron.log(phoneNum);
    // if (!isSignUp) {

    // } else {
    //   // goToHome();
    // }
  };

  return (
    <View style={styles.viewCon}>
      <View style={styles.inputCon}>
        <TouchableOpacity
          style={styles.pickerCon}
          onPress={() => {
            setCountryModalOpen(true);
          }}>
          <CountryPicker
            countryCode={country ? country.cca2 : 'NO'} // number to open on norway only at start
            withCallingCode
            withEmoji
            modalProps={{
              visible: countryModalOpen,
            }}
            withCallingCodeButton
            withFlagButton={false}
            onSelect={onSelect}
            onClose={() => {
              setCountryModalOpen(false);
            }}
            withAlphaFilter
            withFilter
          />
          <Icon name={'chevron-down'} type={'ionicon'} />
        </TouchableOpacity>
        <View
          style={{
            width: 2,
            backgroundColor: theme.colors.lightGray,
            height: '50%',
            alignSelf: 'center',
          }}
        />
        <TextInput
          keyboardType={'phone-pad'}
          style={{width: '50%', padding: 5}}
          ref={numRef}
          onChangeText={text => {
            setPhoneNum(text);
          }}
          value={phoneNum}
        />
        <Button
          title={send_code}
          onPress={() => onSendCodePress()}
          disabled={otpArea}
          buttonStyle={[theme.Button.buttonStyle]}
          titleStyle={[theme.Button.titleStyle, {fontSize: 13}]}
          disabledTitleStyle={theme.Button.disabledTitleStyle}
          containerStyle={{
            width: '30%',
            alignSelf: 'center',
          }}
        />
      </View>
      <Divider width={1} color={theme.colors.black} />

      {otpArea && (
        <View style={styles.otpCon}>
          <Text style={[theme.Text.h2Bold]}>{verify_code}</Text>
          <Input
            onChangeText={text => {
              if (text.length === 6) {
                // navigation.navigate('PersonalDetails');
                navigation.navigate('Pledge');
              }
            }}
            keyboardAppearance="light"
            placeholder={'OTP'}
            maxLength={6}
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            returnKeyType="next"
          />

          <Text style={[theme.Text.h4Normal, {textAlign: 'center'}]}>
            {verify_your_code}
          </Text>
          <View style={{display: timerEnd ? 'none' : 'flex'}}>
            <CountDownTimer
              ref={refTimer}
              timestamp={countDown}
              timerCallback={timerCallbackFunc}
              containerStyle={{
                height: 56,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              textStyle={[theme.Text.h4Normal, {textAlign: 'center'}]}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default OtpValidator;

const styles = StyleSheet.create({
  viewCon: {
    padding: 10,
  },

  inputCon: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  otpCon: {
    marginTop: 50,
  },
});
