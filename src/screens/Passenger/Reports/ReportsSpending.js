import React, {useRef, useState} from 'react';
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
import {colors, family, HP, size} from '../../../utilities';
import {appImages, appIcons} from '../../../utilities';
import CalendarSheet from '../../CalendarSheet';

const ReportsSpending = () => {
  const calendarSheetRef = useRef(null);
  const [date, setDate] = useState();
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
              <TouchableOpacity style={styles.monthView}>
                <Text style={styles.monthText}>This Month</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.monthView}>
                <Text style={styles.monthText}>This Year</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.leftRideContainer}>
              <Text style={styles.promoStyle}>Total Rides</Text>
              <Text style={styles.promoText}>120</Text>
            </View>
            <View style={styles.rightRideContainer}>
              <Text style={styles.promoStyle}>Total Spending</Text>
              <Text style={styles.promoText}>SEK 2500</Text>
            </View>
          </View>
        </LinearGradient>
        <Text style={styles.downloadReport}>Download Reports</Text>
        <View style={styles.monthButtonContainer}>
          <TouchableOpacity style={styles.buttonMonthStyle}>
            <Text style={styles.buttonMonthText}>Last Month</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonMonthStyle}>
            <Text style={styles.buttonMonthText}>Last 6 Months</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonMonthStyle}>
            <Text style={styles.buttonMonthText}>Last 1 Year</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rangeContainer}>
          <Text style={styles.downloadReport}>Select Range</Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.light_black,
              borderRadius: 30,
              width: 160,
              height: 30,
              marginVertical: HP('2'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.promoStyleReplica}>Select Calendar Year</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <>
            <TextInput
              placeholder="Start Date"
              placeholderTextColor={colors.btnGray}
              value={date}
              editable={false}
              onChangeText={setDate}
              onPressOut={() => calendarSheetRef.current.open()}
              onPressIn={() => Keyboard.dismiss()}
              style={[styles.noLater, {marginRight: 11}]}
            />
            <Image
              source={appImages.calendar}
              resizeMode="contain"
              style={styles.calendarIcon}
            />
          </>
          <>
            <TextInput
              placeholder="End Date"
              placeholderTextColor={colors.btnGray}
              value={date}
              editable={false}
              onChangeText={setDate}
              onPressOut={() => calendarSheetRef.current.open()}
              onPressIn={() => Keyboard.dismiss()}
              style={[styles.noLater, {marginRight: 11}]}
            />
            <Image
              source={appImages.calendar}
              resizeMode="contain"
              style={styles.calendarIcon}
            />
          </>
        </View>
        <Text
          style={{
            color: colors.g1,
            marginVertical: HP(2),
            fontFamily: family.product_sans_regular,
            fontSize: size.xsmall,
          }}>
          Select Atleast 1 Month Time Bracket
        </Text>
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
      </View>
      <View style={styles.containerTwo}>
        <TouchableOpacity
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
            Download Report
          </Text>
        </TouchableOpacity>
      </View>
      <CalendarSheet calendarSheetRef={calendarSheetRef} setDate={setDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarIcon: {
    height: 18,
    //   width: 18,
    position: 'relative',
    right: 60,
    top: 13,
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

export default ReportsSpending;
