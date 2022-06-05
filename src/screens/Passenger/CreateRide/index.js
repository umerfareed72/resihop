import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {
  colors,
  appIcons,
  appImages,
  dateConvertor,
  recurringDateConvertor,
  returnDateConvertor,
  returnRecurringDateConvertor,
} from '../../../utilities';
import {useNavigation} from '@react-navigation/core';
import ToggleSwitch from 'toggle-switch-react-native';
import FavouriteLocations from '../../FavouriteLocations';
import {
  CustomHeader,
  Loader,
  CalendarSheet,
  ReturnCalendarSheet,
  ChooseRide,
  AppButton,
  LocationInput,
  DateTimePickerCard,
  ReturnLocationInput,
  ReturnDateTimerPicker,
} from '../../../components';
import I18n from '../../../utilities/translations';
import {useSelector, useDispatch} from 'react-redux';
import {
  setAvailableSeats,
  setOrigin,
  setMapDestination,
  CreateRideRequest,
  setDateTimeStamp,
  setTime,
  SetDriversResponse,
  setReturnFirstTime,
  setMapSegment,
  setReturnOrigin,
  setReturnMapDestination,
  setRecurringDates,
  setReturnRecurringDates,
  setReturnDateTimeStamp,
} from '../../../redux/actions/map.actions';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './styles';
const index = () => {
  let navigation = useNavigation();
  const favourteLocationRef = useRef(null);
  const calendarSheetRef = useRef(null);
  const returnCalendarSheetRef = useRef(null);
  let dispatch = useDispatch();

  const origin = useSelector(state => state.map.origin);
  const destinationMap = useSelector(state => state.map.destination);
  const {
    availableSeats,
    dateTimeStamp,
    returnDateTimeStamp,
    time,
    returnOrigin,
    recurring_dates,
    return_recurring_dates,
    settings,
  } = useSelector(state => state.map);

  const returnTime = useSelector(state => state.map);
  const returnDestinationMap = useSelector(
    state => state.map.returnDestination,
  );
  const [favPress, setFavPress] = useState('');
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [screen, setScreen] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [normalTime, setNormalTime] = useState(new Date());
  const [normalFirstReturnTime, setNormalFirstReturnTime] = useState('');
  const [firstReturnTimePicker, setFirstReturnTimePicker] = useState(false);

  useEffect(() => {
    // dispatch(setTime(moment().format('HH:mm')));
    return () => {
      dispatch(setAvailableSeats(null));
      dispatch(setOrigin(null));
      dispatch(setMapDestination(null));
      dispatch(setDateTimeStamp(null));
      dispatch(setTime(null));
      dispatch(SetDriversResponse(null));
      dispatch(setReturnOrigin(null));
      dispatch(setReturnMapDestination(null));
      dispatch(setReturnFirstTime(null));
      dispatch(setRecurringDates([]));
      dispatch(setReturnRecurringDates([]));
      dispatch(setReturnDateTimeStamp(null));
    };
  }, []);

  const showTimePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setNormalTime(moment(date).format());
    dispatch(setTime(moment(date).format('HH:mm')));
    setNormalFirstReturnTime(moment(date).format());
    dispatch(setReturnFirstTime(date));

    hideTimePicker();
  };

  const showFirstReturnTimePicker = () => {
    setFirstReturnTimePicker(true);
  };

  const hideFirstReturnTimePicker = () => {
    setFirstReturnTimePicker(false);
  };

  const handleConfirmFirstReturnTime = date => {
    setNormalFirstReturnTime(moment(date).format());
    dispatch(setReturnFirstTime(date));
    hideFirstReturnTimePicker();
  };

  const handleCreateRide = () => {
    let stamp = dateConvertor(dateTimeStamp, time);
    let recurring_stamp = recurringDateConvertor(recurring_dates, time);
    const body = {
      startLocation: [origin.location.lat, origin.location.lng],
      destinationLocation: [
        destinationMap.location.lat,
        destinationMap.location.lng,
      ],
      date: screen ? recurring_stamp : stamp,
      requiredSeats: availableSeats,
      startDes: origin.description,
      destDes: destinationMap.description,
    };
    if (screen && recurring_stamp == '') {
      Alert.alert('Error', 'Please select dates');
    } else {
      dispatch(
        CreateRideRequest(body, setIsLoading, toggleEnabled, response => {
          if (response.error) {
            Alert.alert(
              'Error',
              response?.message || response?.message[0]?.messages[0]?.message,
            );
          } else {
            navigation.navigate('StartMatching', {
              modalName: 'startMatching',
              dateTimeStamp: stamp,
            });
            dispatch(setRecurringDates([]));
            dispatch(setReturnRecurringDates([]));
          }
        }),
      );
    }
  };

  const handleCreateReturnRide = () => {
    const {returnFirstTime} = returnTime;
    let stamp = returnDateConvertor(returnDateTimeStamp, returnFirstTime);
    let return_recurring_stamp = returnRecurringDateConvertor(
      return_recurring_dates,
      returnFirstTime,
    );
    const body = {
      startLocation: [returnOrigin.location.lat, returnOrigin.location.lng],
      destinationLocation: [
        returnDestinationMap.location.lat,
        returnDestinationMap.location.lng,
      ],
      date: screen ? return_recurring_stamp : stamp,
      requiredSeats: availableSeats,
      startDes: returnOrigin.description,
      destDes: returnDestinationMap.description,
    };
    if (screen && return_recurring_stamp == '') {
      Alert.alert('Error', 'Please select return dates');
    } else {
      dispatch(
        CreateRideRequest(body, setIsLoading, null, response => {
          // console.log('Return Create Ride', response);
        }),
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={I18n.t('create_ride')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ChooseRide
          onPressS={() => {
            setScreen(false);
            dispatch(setRecurringDates([]));
            dispatch(setReturnRecurringDates([]));
          }}
          onPressR={() => {
            setScreen(true);
          }}
          screen={screen}
          title1={I18n.t('single_trip')}
          title2={I18n.t('recurring_ride')}
        />

        <LocationInput
          onPressStart={() =>
            navigation.navigate('StartLocation', {
              modalName: 'startLocation',
            })
          }
          titleStart={
            origin !== null ? origin.description : I18n.t('start_location')
          }
          onPressDes={() =>
            navigation.navigate('StartLocation', {
              modalName: 'destination',
              recurring: screen,
            })
          }
          titleDes={
            destinationMap !== null
              ? destinationMap.description
              : I18n.t('destination')
          }
          onPressFavStart={() => {
            setFavPress('startLocation');
            favourteLocationRef.current.open();
          }}
          onPressFavDes={() => {
            setFavPress('destination');
            favourteLocationRef.current.open();
          }}
          onFavPress={() => {
            favourteLocationRef.current.open();
          }}
          favPress={favPress}
        />

        <Text style={styles.bookSeatsTxt}>{I18n.t('book_seat')}</Text>
        <View style={styles.seatsWrapper}>
          {seats.map(seat => (
            <TouchableOpacity
              key={seat}
              onPress={() => dispatch(setAvailableSeats(seat))}>
              <Image
                source={
                  seat <= availableSeats
                    ? appImages.seatGreen
                    : appImages.seatBlue
                }
                resizeMode="contain"
                style={styles.seat}
              />
            </TouchableOpacity>
          ))}
          <View
            style={{
              backgroundColor: colors.green,
              padding: 10,
              borderRadius: 20,
            }}>
            <Text style={{color: colors.white}}>
              {!availableSeats ? 0 : availableSeats}
            </Text>
          </View>
        </View>

        <DateTimePickerCard
          datetitle={!screen ? I18n.t('select_date') : I18n.t('select_dates')}
          timeTitle={I18n.t('need_to_arrive')}
          onPressDate={() => calendarSheetRef.current.open()}
          dateText={
            dateTimeStamp !== null
              ? moment(dateTimeStamp).format('DD MMM')
              : !screen
              ? moment(new Date()).format('DD MMM')
              : 'XX:XX'
          }
          onPressTime={() => showTimePicker()}
          timeText={time ? time : moment(new Date()).format('HH:mm')}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          is24Hour={true}
          locale="en_GB"
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
          date={new Date(normalTime)}
        />

        <View style={styles.returnTripWrapper}>
          <Text style={styles.returnTxt}>{I18n.t('return_trip')}</Text>
          <ToggleSwitch
            isOn={toggleEnabled}
            onColor={colors.green}
            offColor={colors.btnGray}
            size="small"
            onToggle={isOn => setToggleEnabled(isOn)}
          />
        </View>
        <CalendarSheet
          recurring={screen}
          ride={{
            next: recurring_dates?.map(item => {
              return {date: item};
            }),
          }}
          date={dateTimeStamp || new Date()}
          calendarSheetRef={calendarSheetRef}
        />
        {toggleEnabled ? (
          <>
            <ReturnLocationInput
              onPressStart={() => {
                dispatch(setMapSegment('returnTrip'));
                navigation.navigate('StartLocation', {
                  modalName: 'returnTrip',
                });
              }}
              titleStart={
                returnOrigin
                  ? returnOrigin.description
                  : I18n.t('start_location')
              }
              onPressDes={() => {
                dispatch(setMapSegment('returnTrip'));
                navigation.navigate('StartLocation', {
                  modalName: 'returnTrip',
                  recurring: screen,
                });
              }}
              titleDes={
                returnDestinationMap
                  ? returnDestinationMap.description
                  : I18n.t('destination')
              }
              onFavPress={() => {
                favourteLocationRef.current.open();
              }}
              onPressFavStart={() => {
                setFavPress('returnstartLocation');
                favourteLocationRef.current.open();
              }}
              onPressFavDes={() => {
                setFavPress('returndestination');
                favourteLocationRef.current.open();
              }}
              favPress={favPress}
            />
            <ReturnDateTimerPicker
              timeTitle={I18n.t('departure_time')}
              timeDesc={I18n.t('departure_time_desc')}
              onPressDate={() => returnCalendarSheetRef.current.open()}
              onPressStartTime={() => showFirstReturnTimePicker()}
              startTime={
                normalFirstReturnTime
                  ? moment(normalFirstReturnTime).format('HH:mm')
                  : moment(new Date()).format('HH:mm')
              }
              endTime={
                returnTime?.returnSecondTime !=
                moment(new Date()).format('HH:mm')
                  ? returnTime?.returnSecondTime
                  : moment(new Date())
                      .add(returnTime?.settings?.returnRange, 'minutes')
                      .format('HH:mm')
              }
              dateText={
                returnDateTimeStamp !== null
                  ? moment(returnDateTimeStamp).format('DD MMM')
                  : moment(returnDateTimeStamp).format('DD MMM') !=
                    'Invalid date'
                  ? moment(returnDateTimeStamp).format('DD MMM')
                  : !screen
                  ? moment(new Date()).format('DD MMM')
                  : 'XX:XX'
              }
            />
            <DateTimePickerModal
              isVisible={firstReturnTimePicker}
              date={
                normalFirstReturnTime
                  ? new Date(normalFirstReturnTime)
                  : new Date()
              }
              mode="time"
              is24Hour={true}
              locale="en_GB"
              onConfirm={handleConfirmFirstReturnTime}
              onCancel={hideFirstReturnTimePicker}
            />
            <ReturnCalendarSheet
              recurring={screen}
              mindate={dateTimeStamp || new Date()}
              ride={{
                next: return_recurring_dates?.map(item => {
                  return {date: item};
                }),
              }}
              date={returnDateTimeStamp || dateTimeStamp || new Date()}
              calendarSheetRef={returnCalendarSheetRef}
            />
          </>
        ) : null}
        <FavouriteLocations
          favourteLocationRef={favourteLocationRef}
          favPress={favPress}
          setFavPress={setFavPress}
        />
        {isLoading ? <Loader /> : null}
      </ScrollView>
      <KeyboardAvoidingView
        //keyboardVerticalOffset={15}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <AppButton
          title={I18n.t('next')}
          bgColor={handleColor(origin, destinationMap, availableSeats)}
          disabled={handleDisable(origin, destinationMap, availableSeats)}
          onPress={() => {
            handleCreateRide();
            if (toggleEnabled) {
              handleCreateReturnRide();
            }
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const handleDisable = (origin, destinationMap, availableSeats) => {
  if (!origin || !availableSeats || !destinationMap) {
    return true;
  }
  return false;
};

const handleColor = (origin, destinationMap, availableSeats) => {
  if (!origin || !availableSeats || !destinationMap) {
    return colors.btnGray;
  }
  return colors.green;
};

export default index;
