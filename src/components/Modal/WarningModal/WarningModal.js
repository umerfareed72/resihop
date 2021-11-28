import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ToggleSwitch from 'toggle-switch-react-native';
import {size, color, WP, colors, family} from '../../../utilities';
import {PaymentButtons} from '../../Buttons/Payment/PaymentButtons';
import CheckBox from '@react-native-community/checkbox';

export const WarningModal = ({
  h1,
  show,
  onToggle,
  toggleEnabled,
  onToggle1,
  toggleEnabled1,
  h2,
  onPress,
  matter,
}) => {
  return (
    <RBSheet
      ref={show}
      height={282}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(16,16,16,0.5)',
        },
        container: {
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
        },
      }}>
      <View style={styles.container}>
        <View style={styles.returnTripWrapper}>
          <Text style={styles.returntTxt}>{h1}</Text>
          <ToggleSwitch
            isOn={toggleEnabled}
            onColor={colors.green}
            offColor={colors.btnGray}
            size="small"
            onToggle={onToggle}
          />
        </View>
        {matter ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              boxType={'square'}
              disabled={false}
              // value={value}
              onFillColor={colors.green}
              onCheckColor={colors.white}
              // onValueChange={onPress}
              tintColors={{true: '#47B000', false: 'gray'}}
              onTintColor={colors.white}
              style={styles.checkBoxLeftStyle}
            />
            <Text style={styles.textBox}>Does not matter</Text>
          </View>
        ) : (
          false
        )}

        <View style={styles.returnTripWrapper}>
          <Text style={styles.returntTxt}>{h2}</Text>
          <ToggleSwitch
            isOn={toggleEnabled1}
            onColor={colors.green}
            offColor={colors.btnGray}
            size="small"
            onToggle={onToggle1}
          />
        </View>
        {matter ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              boxType={'square'}
              disabled={false}
              // value={value}
              onFillColor={colors.green}
              onCheckColor={colors.white}
              // onValueChange={onPress}
              tintColors={{true: '#47B000', false: 'gray'}}
              onTintColor={colors.white}
              style={styles.checkBoxLeftStyle}
            />
            <Text style={styles.textBox}>Does not matter</Text>
          </View>
        ) : (
          false
        )}
        <View style={{padding: 20}}>
          <PaymentButtons
            onPress={onPress}
            title={'Ok'}
            bgColor={colors.green}
            txtColor={colors.white}
          />
        </View>
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: WP('8'),
  },

  returnTripWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  returntTxt: {
    fontSize: size.large,
    lineHeight: 24,
    color: colors.txtBlack,
  },
  checkBoxLeftStyle: {
    width: 20,
    height: 20,
  },
  textBox: {
    marginLeft: 20,
    fontSize: size.xsmall,
    color: colors.light_black,
    fontFamily: family.product_sans_regular,
  },
});
