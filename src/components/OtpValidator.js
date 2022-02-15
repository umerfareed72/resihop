import React, {useState, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
import {Button, Divider, Icon, Input, Text} from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';
import {theme} from '../theme';
import CountDownTimer from 'react-native-countdown-timer-hooks';
import I18n from '../utilities/translations';

const OtpValidator = ({
  phoneNumber,
  chnagePhone,
  onCountrySelect,
  onSendCodePress,
  defaultCountryCode = 'PK',
  otpCodeArea,
  setOtpCodeArea,
  enteredCode,
  phoneError,
  onEndEditing,
  onSubmitCode,
}) => {
  const [countDown, setCountDown] = useState(60);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [otpArea, setOtpArea] = useState(false);
  const refTimer = useRef();
  const numRef = useRef();

  // const onSelect = country => {
  //   setCountry(country);
  //   numRef.current.focus();
  // };

  const [timerEnd, setTimerEnd] = useState(false);
  const timerCallbackFunc = timerFlag => {
    // Setting timer flag to finished
    setTimerEnd(timerFlag);
    setOtpArea(!otpArea);
  };

  // const onSendCodePress = () => {
  //   Keyboard.dismiss();
  //   if (phoneNum === '') {
  //     ToastAndroid.show(I18n.t('please_enter_phone_msg'), ToastAndroid.LONG);
  //     return;
  //   }
  //   setOtpArea(true);
  //   const phone = `+${country ? country.callingCode : '47'}${phoneNum}`;
  //   reactotron.log(phone);
  //   reactotron.log(phoneNum);
  //   // if (!isSignUp) {

  //   // } else {
  //   //   // goToHome();
  //   // }
  // };

  return (
    <View style={styles.viewCon}>
      <View style={styles.inputCon}>
        <TouchableOpacity
          style={styles.pickerCon}
          onPress={() => {
            setCountryModalOpen(true);
          }}>
          <CountryPicker
            countryCode={defaultCountryCode}
            withCallingCode
            withEmoji
            modalProps={{
              visible: countryModalOpen,
            }}
            withCallingCodeButton
            withFlagButton={false}
            onSelect={onCountrySelect}
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
          style={{width: '50%', padding: 5, color: 'black'}}
          ref={numRef}
          onChangeText={chnagePhone}
          value={phoneNumber}
          maxLength={14}
        />
        <Button
          title={timerEnd ? 'Resend Code' : 'Send Code'}
          onPress={onSendCodePress}
          disabled={otpCodeArea}
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
      <View style={styles.phoneErrorContainer} />
      {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

      {otpCodeArea && (
        <View style={styles.otpCon}>
          <Text style={[theme.Text.h2Bold]}>{I18n.t('verify_code')}</Text>
          <Input
            onChangeText={enteredCode}
            keyboardAppearance="light"
            placeholder={'OTP'}
            maxLength={6}
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            returnKeyType="next"
            onEndEditing={onEndEditing}
            onSubmitEditing={onSubmitCode}
          />

          <Text style={[theme.Text.h4Normal, {textAlign: 'center'}]}>
            {I18n.t('verify_your_code')}
          </Text>
          <View>
            <CountDownTimer
              ref={refTimer}
              timestamp={countDown}
              timerCallback={timerFlag => {
                setTimerEnd(timerFlag);
                setOtpCodeArea(false);
              }}
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
  phoneErrorContainer: {
    width: '100%',
    height: 1,
    borderColor: '#80808090',
    borderWidth: 0.5,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    margin: 3,
  },
});
