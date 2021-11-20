import React, {useState, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Button, Divider, Icon, Input, Text} from 'react-native-elements';
import CountryPicker, {Country} from 'react-native-country-picker-modal';
import {theme} from '../theme';

function OtpValidator() {
  const [country, setCountry] = useState();
  const [phoneNum, setPhoneNum] = useState('');
  const [countDown, setCountDown] = useState(30);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [otpArea, setOtpArea] = useState(false);

  const numRef = useRef();
  const onSelect = country => {
    setCountry(country);
    numRef.current.focus();
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
      </View>
    </View>
  );
}

export default OtpValidator;

const styles = StyleSheet.create({
  viewCon: {
    padding: 10,
  },

  inputCon: {
    marginTop: 20,
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
