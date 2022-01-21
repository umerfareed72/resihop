import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';

import {fonts, theme} from '../theme';
import {Icon, Text} from 'react-native-elements';
import {appIcons} from '../utilities';
import I18n from '../utilities/translations';

function SigninViaBankID({onBankIdPress, disabled = true, onPressTerms}) {
  return (
    <View style={styles.bankIDCon}>
      <Text style={theme.Text.h4Normal}>
        {I18n.t('by_clicking_bank_id_text')}
      </Text>
      <View style={styles.textCon}>
        <Text style={[theme.Text.h4Normal, {paddingHorizontal: 2}]}>
          {I18n.t('i_agree_to_res_ihop')}
        </Text>
        <TouchableOpacity onPress={onPressTerms}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: fonts.bold,
              textDecorationLine: 'underline',
              color: theme.colors.black,
            }}>
            {I18n.t('terms_and_condition_text')}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.2}
        onPress={onBankIdPress}
        disabled={disabled}
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
            {I18n.t('sign_in_with_bank_id')}
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
    marginVertical: 5,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SigninViaBankID;
