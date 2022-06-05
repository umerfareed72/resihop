import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {fonts} from '../../../theme';
import {colors} from '../../../utilities';
export const ChooseRide = ({screen, onPressS, onPressR, title1, title2}) => {
  return (
    <View style={styles.tripBtnWrapper}>
      <TouchableOpacity
        onPress={onPressS}
        style={[
          styles.tripBtnContainer,
          {backgroundColor: screen ? colors.btnGray : colors.green},
        ]}>
        <Text style={styles.btnTxt}>{title1}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressR}
        style={[
          styles.tripBtnContainer,
          {backgroundColor: screen ? colors.green : colors.btnGray},
        ]}>
        <Text style={styles.btnTxt}>{title2}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tripBtnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '85%',
    alignSelf: 'center',
  },
  btnTxt: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.white,
    fontFamily: fonts.regular,
  },
  tripBtnContainer: {
    height: 39,
    width: 145,
    backgroundColor: colors.btnGray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
