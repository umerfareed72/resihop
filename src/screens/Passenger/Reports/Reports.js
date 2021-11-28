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
import ReportsEarning from './ReportsEarning';
import ReportsSpending from './ReportsSpending';

const Reports = ({navigation}) => {
  const [date, setDate] = useState();
  const [selected, setSelected] = useState(1);
  return (
    <>
      <CustomHeader navigation={navigation} title="Reports" backButton={true} />
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
          <View style={styles.containerOne}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                onPress={() => setSelected(1)}
                style={styles.leftTabStyle}>
                <Text
                  style={[
                    styles.leftTabText,
                    {color: selected === 1 ? colors.blue : colors.light_black},
                  ]}>
                  Earnings
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelected(2)}
                style={styles.rightTabStyle}>
                <Text
                  style={[
                    styles.rightTabText,
                    {color: selected === 2 ? colors.blue : colors.light_black},
                  ]}>
                  Spending
                </Text>
              </TouchableOpacity>
            </View>
            {selected === 2 ? <ReportsSpending /> : <ReportsEarning />}
          </View>
        </View>
      </SafeAreaView>
    </>
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
    flex: 0.8,
    // backgroundColor: 'orange',
  },
  containerTwo: {
    flex: 0.2,
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

export default Reports;
