import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {colors} from '../utilities';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CalendarSheet = ({calendarSheetRef, setDate}) => {
  const [markedDate, setMarkedDate] = useState();

  LocaleConfig.locales['en'] = {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesdy',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  };
  LocaleConfig.defaultLocale = 'en';

  const handleDayPress = date => {
    let markedObj = {};
    const selectedDate = moment(date.dateString).format('YYYY-MM-DD');
    markedObj[selectedDate] = {
      selected: true,
      selectedColor: colors.green,
    };
    setMarkedDate(markedObj);

    setDate(moment(date.dateString).format('DD MMM'));
  };

  return (
    <RBSheet
      ref={calendarSheetRef}
      height={611}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(16,16,16,0.5)',
        },
        container: {
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
        },
      }}>
      <Text style={styles.slectDateTxt}>Select Date</Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDate}
        hideExtraDays={true}
        enableSwipeMonths={true}
        theme={{
          textSectionTitleColor: colors.black,
          dayTextColor: colors.black,
          //textDisabledColor: colors.red,
          arrowColor: colors.black,
          monthTextColor: colors.black,
          textDayFontWeight: '400',
          textMonthFontWeight: '700',
          textDayHeaderFontWeight: '400',
          todayTextColor: colors.black,
          textDayFontSize: 16,
          textMonthFontSize: 24,
          textDayHeaderFontSize: 18,
          selectedDayTextColor: colors.white,
          selectedDayBackgroundColor: colors.green,
          //   todayBackgroundColor: colors.green,
        }}
      />
      <TouchableOpacity
        style={styles.okBtn}
        onPress={() => calendarSheetRef.current.close()}>
        <Text style={styles.okTxt}>OK</Text>
      </TouchableOpacity>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  slectDateTxt: {
    fontSize: 24,
    lineHeight: 24,
    color: colors.txtBlack,
    textAlign: 'center',
    marginTop: 27,
    marginBottom: 30,
  },
  okBtn: {
    height: 56,
    width: '80%',
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 36,
  },
  okTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
  },
});

export default CalendarSheet;
