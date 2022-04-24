import I18n from 'i18n-js';
import React, {useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {CustomHeader} from '../../../components/Header/CustomHeader';
import {post} from '../../../services';
import {
  checkConnected,
  colors,
  family,
  header,
  HP,
  size,
} from '../../../utilities';
import {appImages, appIcons} from '../../../utilities';
import {DRIVE_CONST} from '../../../utilities/routes';
import CalendarSheet from '../../CalendarSheet';

const ReportEarning = ({
  onPressYear,
  onPressStartDate,
  onPressEndDate,
  onPressDownload,
  onPressCurrentPeriod,
  onPressPeriodReport,
  data,
  showMessage,
  startDate,
  endDate,
  year,
}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.containerOne}>
        <LinearGradient
          colors={colors.reportCardColor}
          style={styles.reportCard}>
          <View style={styles.firstCardView}>
            <View style={{marginLeft: HP('2')}}>
              <Image source={appIcons.car_icon} />
            </View>
            <View style={styles.monthContainer}>
              <TouchableOpacity
                onPress={() => {
                  onPressCurrentPeriod('month');
                }}
                style={styles.monthView}>
                <Text style={styles.monthText}>{I18n.t('rep_month')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onPressCurrentPeriod('year');
                }}
                style={styles.monthView}>
                <Text style={styles.monthText}>{I18n.t('rep_year')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.leftRideContainer}>
              <Text style={styles.promoStyle}>
                {I18n.t('rep_total_drives')}
              </Text>
              <Text style={styles.promoText}>{data?.drives || 0}</Text>
            </View>
            <View style={styles.rightRideContainer}>
              <Text style={styles.promoStyle}>
                {I18n.t('rep_total_earning')}
              </Text>
              <Text style={styles.promoText}>
                NOK {data?.totalEarnings || 0}
              </Text>
            </View>
          </View>
        </LinearGradient>
        <Text style={styles.downloadReport}>{I18n.t('rep_download_rep')}</Text>
        <View style={styles.monthButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              onPressPeriodReport('month');
            }}
            style={styles.buttonMonthStyle}>
            <Text style={styles.buttonMonthText}>
              {I18n.t('rep_last_month')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPressPeriodReport('6month');
            }}
            style={styles.buttonMonthStyle}>
            <Text style={styles.buttonMonthText}>
              {I18n.t('rep_last_6month')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPressPeriodReport('year');
            }}
            style={styles.buttonMonthStyle}>
            <Text style={styles.buttonMonthText}>
              {I18n.t('rep_last_year')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rangeContainer}>
          <Text style={styles.downloadReport}>
            {I18n.t('rep_select_range')}
          </Text>
          <TouchableOpacity
            onPress={onPressYear}
            style={{
              backgroundColor: colors.light_black,
              borderRadius: 30,
              width: 160,
              height: 30,
              marginVertical: HP('2'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.promoStyleReplica}>
              {year || I18n.t('rep_select_calendar')}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={onPressStartDate} style={styles.noLater}>
            <Text
              style={{
                fontSize: 16,
                color: colors.inputTxtGray,
              }}>
              {startDate || 'Start Date'}
            </Text>
            <Image
              source={appImages.calendar}
              resizeMode="contain"
              style={styles.calendarIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressEndDate} style={styles.noLater}>
            <Text
              style={{
                fontSize: 16,
                color: colors.inputTxtGray,
              }}>
              {endDate || 'End Date'}
            </Text>

            <Image
              source={appImages.calendar}
              resizeMode="contain"
              style={styles.calendarIcon}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: colors.g1,
            marginVertical: HP(2),
            fontFamily: family.product_sans_regular,
            fontSize: size.xsmall,
          }}>
          {I18n.t('rep_condition')}
        </Text>
        {showMessage && (
          <View
            style={{
              marginHorizontal: HP('2'),
              marginVertical: HP('2'),
              borderRadius: 13,
              backgroundColor: '#E9FFD9',
            }}>
            <Text
              style={{
                fontSize: size.tiny,
                fontFamily: family.product_sans_regular,
                color: colors.light_black,
                textAlign: 'center',
                marginHorizontal: HP('1'),
                marginVertical: HP('2'),
              }}>
              Your Earning/Spending Report has been successfully sent to your
              registered email address.
            </Text>
          </View>
        )}
      </View>
      <View style={styles.containerTwo}>
        <TouchableOpacity
          onPress={onPressDownload}
          style={{
            borderRadius: 15,
            height: HP('7'),
            width: '100%',
            backgroundColor: colors.green,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: size.normal,
              fontFamily: family.product_sans_bold,
              color: colors.white,
            }}>
            {I18n.t('rep_download_rep')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarIcon: {
    height: 18,
    //   width: 18,
    position: 'relative',
    // right: 60,
    // top: 13,
  },
  noLater: {
    borderWidth: 1,
    borderColor: colors.greyBorder,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 8,
    width: '46%',
  },
  downloadReport: {
    marginVertical: HP('2'),
    fontSize: size.normal,
    fontFamily: family.product_sans_bold,
    color: colors.light_black,
  },
  monthButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rangeContainer: {
    flexDirection: 'row',
    marginVertical: HP('2'),
    justifyContent: 'space-between',
  },
  buttonMonthText: {
    fontSize: size.xxsmall,
    fontFamily: family.product_sans_regular,
    color: colors.green,
  },
  buttonMonthStyle: {
    borderWidth: 0.5,
    borderColor: colors.green,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 110,
    height: 30,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainView: {
    marginHorizontal: HP('2.5'),
    flex: 1,
  },
  containerOne: {
    flexGrow: 0.8,
    // backgroundColor: 'orange',
  },
  containerTwo: {
    flexGrow: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  tabContainer: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.blue_light,
  },
  leftTabStyle: {
    flex: 0.5,
    marginVertical: HP('1'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
  },
  rightTabStyle: {
    flex: 0.5,
    marginVertical: HP('1'),
    justifyContent: 'center',
    alignItems: 'center',
    // borderRightWidth: 0.5,
  },
  leftTabText: {
    fontSize: size.large,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
  rightTabText: {
    fontSize: size.large,
    fontFamily: family.product_sans_regular,
    color: colors.blue,
  },
  firstCardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: HP('2'),
  },
  secondContainer: {
    // backgroundColor: 'green',
    marginVertical: HP('2'),
    // backgroundColor: 'orange',
    flexDirection: 'row',
    flex: 1,
  },
  leftRideContainer: {
    flex: 0.5,
    // height: 150,
    // backgroundColor: 'red',
    borderRightWidth: 1,
    borderColor: colors.white,
    // borderWidth: 1,
  },
  rightRideContainer: {
    flex: 0.5,
  },
  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthView: {
    width: 90,
    height: 24,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginHorizontal: HP('1'),
  },
  monthText: {
    fontSize: size.xxsmall,
    fontFamily: family.product_sans_regular,
    color: colors.blue,
  },
  cardStyle: {
    marginHorizontal: HP('2.5'),
    marginVertical: HP('1'),
    borderRadius: 13,
  },
  cardContent: {
    marginHorizontal: HP('2'),
    // backgroundColor: 'orange',
  },
  titleText: {
    fontSize: size.xxlarge,
    fontFamily: family.product_sans_bold,
    color: colors.light_black,
    // marginVertical: HP('2'),
    marginTop: HP('2'),
  },
  desciptionText: {
    fontSize: size.xsmall,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
    marginVertical: HP('1'),
  },
  promoStyle: {
    marginLeft: HP('2'),
    fontSize: size.xsmall,
    fontFamily: family.product_sans_regular,
    color: colors.white,
  },
  promoStyleReplica: {
    // marginLeft: HP('2'),
    fontSize: size.xsmall,
    fontFamily: family.product_sans_regular,
    color: colors.white,
  },
  promoText: {
    marginLeft: HP('2'),
    marginTop: HP('1'),
    fontSize: size.h5,
    fontFamily: family.product_sans_bold,
    color: colors.white,
  },
  reportCard: {
    // marginHorizontal: HP('2'),
    height: 164,
    marginVertical: HP('2'),
    borderRadius: 15,
    // backgroundColor:colors.
  },
});

export default ReportEarning;
