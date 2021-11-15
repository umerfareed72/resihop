import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {family, size} from '../../../utilities';

export const PaymentButtons = ({onPress, title, bgColor, txtColor}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btnContainer, {backgroundColor: bgColor}]}>
        <Text style={[styles.btnText, {color: txtColor}]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 16,
  },
  btnText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_bold,
  },
});
