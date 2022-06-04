import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {fonts} from '../../../theme';
import {appImages, colors} from '../../../utilities';

export const DateTimePickerCard = ({
  datetitle,
  dateText,
  onPressDate,
  onPressTime,
  timeText,
  timeTitle,
}) => {
  return (
    <>
      <View style={styles.selectWrapper}>
        <Text style={styles.selectTxt}>{datetitle}</Text>
        <Text style={[styles.selectTxt]}>{timeTitle}</Text>
      </View>
      <View style={styles.selectionInputWrapper}>
        <TouchableOpacity
          onPress={onPressDate}
          style={[styles.noLater, {justifyContent: 'center', marginRight: 11}]}>
          <Text style={styles.dateTxt}>{dateText}</Text>
          <Image
            source={appImages.calendar}
            resizeMode="contain"
            style={styles.calendarIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPressTime}
          style={[styles.noLater, {justifyContent: 'center'}]}>
          <Text style={styles.dateTxt}>{timeText}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  selectWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '78%',
    marginTop: 26,
    marginLeft: 20,
  },
  selectTxt: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.txtBlack,
    fontFamily: fonts.regular,
  },
  selectionInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  noLater: {
    height: 44,
    width: 140,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    borderRadius: 10,
    paddingLeft: 16,
    fontSize: 16,
    lineHeight: 24,
    color: colors.inputTxtGray,
    fontFamily: fonts.regular,
  },
  dateTxt: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.g1,
    fontFamily: fonts.regular,
  },
  calendarIcon: {
    height: 18,
    width: 18,
    position: 'absolute',
    right: 22,
    top: 13,
  },
});
