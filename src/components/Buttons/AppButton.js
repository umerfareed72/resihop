import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {fonts} from '../../theme';
import {colors} from '../../utilities';

export const AppButton = ({bgColor, onPress, disabled, title}) => {
  return (
    <TouchableOpacity
      style={[styles.nextBtnContainer, {backgroundColor: bgColor}]}
      disabled={disabled}
      onPress={onPress}>
      <Text style={styles.nextTxt}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nextBtnContainer: {
    height: 56,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 15,
    marginBottom: 20,
    alignSelf: 'center',
  },
  nextTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
    fontFamily: fonts.bold,
  },
});
