import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';

import {fonts, theme} from '../theme';
import {Icon, Text} from 'react-native-elements';
import {
  by_clicking_bank_id_text,
  i_agree_to_res_ihop,
  sign_in_with_bank_id,
  terms_and_condition_text,
} from '../theme/strings';
import { appIcons } from '../utilities';

function SigninViaBankID({onBankIdPress, disabled = true}) {
  return (
    <View style={styles.bankIDCon}>
      <Text style={theme.Text.h4Normal}>{by_clicking_bank_id_text}</Text>
      <View style={styles.textCon}>
        <Text style={[theme.Text.h4Normal, {paddingHorizontal: 2}]}>
          {i_agree_to_res_ihop}
        </Text>
        <TouchableOpacity
          onPress={() => {
            alert('YET TO BE INTRODUCED');
          }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: fonts.bold,
              textDecorationLine: 'underline',
              color: theme.colors.black,
            }}>
            {terms_and_condition_text}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.2}
        onPress={onBankIdPress}
        style={[
          disabled ? theme.Button.disabledStyle : theme.Button.buttonStyle,
          {
            justifyContent: 'space-between',
            width: '100%',
            flexDirection: 'row',
            marginTop: 10,
          },
        ]}>
        <View style={styles.bankIDBtnCon}>
          <Text style={[theme.Button.titleStyle, {paddingLeft: 20}]}>
            {sign_in_with_bank_id}
          </Text>
          <Image
            source={appIcons.bank_id}
            style={{width: 50, height: 35, resizeMode: 'contain'}}
          />
        </View>
        <Icon
          name={'arrowright'}
          type={'antdesign'}
          style={{marginRight: 20, marginTop: 5}}
          color={theme.colors.white}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bankIDCon: {
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  imgBtn: {
    borderColor: theme.colors.grey,
    borderWidth: 1,
    borderRadius: 40,
    marginHorizontal: 10,
  },
  textCon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bankIDBtnCon: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
  },
});

export default SigninViaBankID;
