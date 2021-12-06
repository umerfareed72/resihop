import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors} from '../utilities';
import {fonts} from '../theme';
import I18n from '../utilities/translations';

const ReturnBookSheet = ({returnBookSheetRef, onPressReturn, onPressSkip}) => {
  let navigation = useNavigation();

  return (
    <RBSheet
      ref={returnBookSheetRef}
      height={278}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(16,16,16,0.5)',
        },
        container: {
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
        },
      }}>
      <Text style={styles.question}>{I18n.t('want_return_trip')}</Text>
      <TouchableOpacity
        onPress={onPressReturn}
        style={[
          styles.btnContainer,
          {backgroundColor: colors.green, marginBottom: 19},
        ]}>
        <Text style={styles.btnTxt}>{I18n.t('ok')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnContainer} onPress={onPressSkip}>
        <Text style={styles.btnTxt}>{I18n.t('skip')}</Text>
      </TouchableOpacity>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  question: {
    fontSize: 18,
    lineHeight: 29,
    color: colors.txtBlack,
    textAlign: 'center',
    marginTop: 29,
    marginBottom: 59,
    fontFamily: fonts.regular,
  },
  btnContainer: {
    height: 56,
    width: '80%',
    backgroundColor: colors.txtBlack,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    alignSelf: 'center',
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
    fontFamily: fonts.regular,
  },
});

export default ReturnBookSheet;
