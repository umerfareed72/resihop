import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {fonts} from '../../../theme';
import {appImages, colors} from '../../../utilities';
import I18n from '../../../utilities/translations';
export const ReturnDateTimerPicker = ({
  timeTitle,
  timeDesc,
  onPressStartTime,
  startTime,
  endTime,
  onPressDate,
  dateText,
}) => {
  return (
    <>
      <View style={{marginLeft: 26}}>
        <Text style={styles.returntimeTxt}>{timeTitle}</Text>
        <Text style={styles.timeBracketTxt}>{timeDesc}</Text>
      </View>
      <View style={[styles.selectionInputWrapper, {marginBottom: 20}]}>
        <TouchableOpacity
          onPress={onPressStartTime}
          style={[styles.noLater, {justifyContent: 'center'}]}>
          <Text style={styles.dateTxt}>{startTime}</Text>
        </TouchableOpacity>
        <Text> {I18n.t('to')}</Text>
        <TouchableOpacity style={[styles.noLater, {justifyContent: 'center'}]}>
          <Text style={styles.dateTxt}>{endTime}</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginBottom: 20}}>
        <TouchableOpacity
          onPress={onPressDate}
          style={[
            styles.noLater,
            {justifyContent: 'center', width: '90%', alignSelf: 'center'},
          ]}>
          <Text style={styles.dateTxt}>{dateText}</Text>
        </TouchableOpacity>
        <Image
          source={appImages.calendar}
          resizeMode="contain"
          style={[styles.calendarIcon, {right: 30}]}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  returntimeTxt: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.txtBlack,
    marginTop: 20,
    fontFamily: fonts.regular,
  },
  timeBracketTxt: {
    fontSize: 12,
    lineHeight: 24,
    color: colors.btnGray,
    fontFamily: fonts.regular,
  },
  locationTxt: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.g4,
  },
  to: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 24,
    color: colors.txtBlack,
  },
  returnTxt: {
    fontSize: 16,
    lineHeight: 29,
    color: colors.txtBlack,
    fontFamily: fonts.regular,
  },
  returnTripWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 31,
    width: '87%',
    alignSelf: 'center',
  },
  selectionInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
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
