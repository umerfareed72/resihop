import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {colors} from '../utilities';
import moment from 'moment';
import {fonts} from '../theme/theme';
import I18n from '../utilities/translations';
import {setDateTimeStamp} from '../redux/actions/map.actions';
import {useDispatch} from 'react-redux';

const CalendarSheet = ({calendarSheetRef, setDate}) => {
  let dispatch = useDispatch();

  const [markedDate, setMarkedDate] = useState();

  useEffect(() => {
    let markedObj = {};
    const selectedDate = moment(new Date().toDateString()).format('YYYY-MM-DD');
    markedObj[selectedDate] = {
      selected: true,
      selectedColor: colors.green,
    };
    setMarkedDate(markedObj);
  }, []);

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
    dispatch(setDateTimeStamp(moment(date.dateString).format('YYYY-MM-DD')));
    let markedObj = {};
    const selectedDate = moment(date.dateString).format('YYYY-MM-DD');
    markedObj[selectedDate] = {
      selected: true,
      selectedColor: colors.green,
    };
    setMarkedDate(markedObj);
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
      <Text style={styles.slectDateTxt}>{I18n.t('select_date')}</Text>
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
          textMonthFontFamily: fonts.regular,
          textDayFontFamily: fonts.regular,
          textDayHeaderFontFamily: fonts.bold,
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
        <Text style={styles.okTxt}>{I18n.t('ok')}</Text>
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
    fontFamily: fonts.bold,
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
    fontFamily: fonts.bold,
  },
});

export default CalendarSheet;
