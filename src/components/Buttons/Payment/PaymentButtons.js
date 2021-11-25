import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {family, size} from '../../../utilities';

export const PaymentButtons = ({
  onPress,
  title,
  bgColor,
  txtColor,
  width,
  borderWidth,
  fontFamily,
  fontWeight,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btnContainer,
        {backgroundColor: bgColor, width: width, borderWidth: borderWidth},
      ]}>
      <Text
        style={[
          styles.btnText,
          {color: txtColor, fontFamily: fontFamily, fontWeight: fontWeight},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 14,
  },
  btnText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_bold,
  },
});
