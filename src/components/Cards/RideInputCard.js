import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {family, HP, size, colors} from '../../utilities';

export const RideInputCard = ({onPressStart, onPressDes, p1, p2}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPressStart}
        style={[styles.starttxtBtn, {marginBottom: 20}]}>
        <Text style={styles.starttxt}>{p1}</Text>
        <View style={styles.startDot} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressDes} style={styles.starttxtBtn}>
        <Text style={styles.starttxt}>{p2}</Text>
        <View style={styles.destSquare} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  starttxtBtn: {
    height: 44,
    width: 291,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    borderRadius: 10,
    paddingLeft: 45,
    color: colors.inputTxtGray,
    justifyContent: 'center',
  },
  starttxt: {
    fontFamily: family.product_sans_regular,
    fontSize: size.normal,
    color: colors.inputTxtGray,
  },
  startDot: {
    height: 16,
    width: 16,
    borderRadius: 16 / 2,
    backgroundColor: colors.green,
    position: 'absolute',
    top: 14,
    left: 15,
  },
  destSquare: {
    height: 16,
    width: 16,
    backgroundColor: colors.blue,
    position: 'absolute',
    top: 14,
    left: 15,
    borderRadius: 4,
  },
});
