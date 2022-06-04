import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {colors, appIcons, appImages, mode, APIKEY} from '../../../utilities';
import {useNavigation} from '@react-navigation/core';
import HeartIcon from 'react-native-vector-icons/EvilIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import FavouriteLocations from '../../FavouriteLocations';
import {
  CustomHeader,
  CalendarSheet,
  ReturnCalendarSheet,
  Loader,
  ChooseRide,
  LocationInput,
  AppButton,
  ReturnLocationInput,
  DateTimePickerCard,
  ReturnDateTimerPicker,
} from '../../../components';
import {fonts} from '../../../theme/theme';
import I18n from '../../../utilities/translations';
import HeartFilled from 'react-native-vector-icons/Foundation';
import {useSelector, useDispatch} from 'react-redux';
import {
  setAvailableSeats,
  setOrigin,
  setMapDestination,
  setDateTimeStamp,
  setTime,
  SetRidesResponse,
  setReturnFirstTime,
  setMapSegment,
  setReturnMapDestination,
  setReturnOrigin,
  setRoutes,
  setReturnRide,
  setRecurringDates,
  setReturnRecurringDates,
} from '../../../redux/actions/map.actions';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './styles';
const CreateDrive = () => {
  let navigation = useNavigation();
  let dispatch = useDispatch();

  const favourteLocationRef = useRef(null);
  const calendarSheetRef = useRef(null);
  const returnCalendarSheetRef = useRef(null);

  const {
    origin,
    recurring_dates,
    return_recurring_dates,
    dateTimeStamp,
    availableSeats,
    time,
    returnOrigin,
    returnDateTimeStamp,
    settings,
  } = useSelector(state => state.map);
  const destinationMap = useSelector(state => state.map.destination);

  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [screen, setScreen] = useState(false);
  const [favPress, setFavPress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [normalTime, setnormalTime] = useState(new Date());
  const [normalFirstReturnTime, setNormalFirstReturnTime] = useState('');
  const [firstReturnTimePicker, setFirstReturnTimePicker] = useState(false);

  const returnTime = useSelector(state => state.map);
  const returnDestinationMap = useSelector(
    state => state.map.returnDestination,
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '10 NOK', value: 10},
    {label: '15 NOK', value: 15},
    {label: '20 NOK', value: 20},
    {label: '25 NOK', value: 25},
    {label: '30 NOK', value: 30},
    {label: '35 NOK', value: 35},
    {label: '40 NOK', value: 40},
    {label: '45 NOK', value: 45},
    {label: '50 NOK', value: 50},
    {label: '60 NOK', value: 60},
    {label: '70 NOK', value: 70},
    {label: '80 NOK', value: 80},
  ]);

  // Release Redux States
  useEffect(() => {
    setValue(items[2].value);
    return () => {
      dispatch(setAvailableSeats(0));
      dispatch(setOrigin(null));
      dispatch(setMapDestination(null));
      dispatch(setDateTimeStamp(null));
      dispatch(SetRidesResponse(null));
      dispatch(setTime(null));
      dispatch(setReturnOrigin(null));
      dispatch(setReturnMapDestination(null));
      dispatch(setReturnFirstTime(null));
      dispatch(setRecurringDates([]));
      dispatch(setReturnRecurringDates([]));
    };
  }, []);

  const handleCreateDrive = async () => {
    setIsLoading(true);
    if (origin && destinationMap != null) {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?alternatives=true&origin=${origin?.description}&destination=${destinationMap?.description}&key=${APIKEY}&mode=${mode}`,
      );
      let respJson = await resp.json();
      if (respJson) {
        let stamp = new Date().getTime();
        let recurring_stamp = [new Date().getTime()];
        if (dateTimeStamp) {
          if (time) {
            stamp = moment(`${dateTimeStamp}T${time}`).valueOf();
          } else {
            const currentTime = moment(new Date()).format('HH:mm');
            stamp = moment(`${dateTimeStamp}T${currentTime}`).valueOf();
          }
        } else {
          if (time) {
            const currentDate = moment(new Date().toString()).format(
              'YYYY-MM-DD',
            );
            stamp = moment(`${currentDate}T${time}`).valueOf();
          }
        }
        if (recurring_dates != '' && time) {
          recurring_stamp = recurring_dates.map(item => {
            return moment(`${item}T${time}`).valueOf();
          });
        }
        const body = {
          startLocation: [origin?.location.lat, origin?.location?.lng],
          destinationLocation: [
            destinationMap.location.lat,
            destinationMap.location.lng,
          ],
          date: screen ? recurring_stamp : stamp,
          availableSeats: availableSeats,
          path: 0,
          costPerSeat: value + availableSeats * settings?.adminCommission,
          interCity: false,
          startDes: origin?.description,
          destDes: destinationMap?.description,
          selectedRoutes: respJson?.routes,
        };
        dispatch(setRoutes(body));
        setIsLoading(false);
        if (toggleEnabled) {
          handleReturnCreateDrive();
        } else {
          navigation?.navigate('SelectRoute');
        }
      }
    }
  };

  const showTimePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setnormalTime(moment(date).format());
    dispatch(setTime(moment(date).format('HH:mm')));
    hideTimePicker();
  };

  //Return Trip
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
  //Hanlde Return Drive
  const handleReturnCreateDrive = () => {
    let stamp = new Date().getTime();
    let return_recurring_stamp = [new Date().getTime()];
    const {returnFirstTime} = returnTime;
    if (returnDateTimeStamp) {
      if (returnFirstTime) {
        stamp = moment(`${returnDateTimeStamp}T${returnFirstTime}`).valueOf();
      } else {
        const currentTime = moment(new Date()).format('HH:mm');
        stamp = moment(`${returnDateTimeStamp}T${currentTime}`).valueOf();
      }
    } else {
      if (returnFirstTime) {
        const currentDate = moment(new Date().toString()).format('YYYY-MM-DD');
        stamp = moment(`${currentDate}T${returnFirstTime}`).valueOf();
      }
    }
    if (return_recurring_dates != '' && returnFirstTime) {
      recurring_stamp = return_recurring_dates.map(item => {
        return moment(`${item}T${returnFirstTime}`).valueOf();
      });
    }

    const body = {
      startLocation: [returnOrigin?.location.lat, returnOrigin?.location?.lng],
      destinationLocation: [
        returnDestinationMap.location.lat,
        returnDestinationMap.location.lng,
      ],
      date: screen ? return_recurring_stamp : stamp,
      availableSeats: availableSeats,
      path: 0,
      costPerSeat: value + availableSeats * settings?.adminCommission,
      interCity: false,
      startDes: returnOrigin?.description,
      destDes: returnDestinationMap?.description,
    };
    dispatch(setReturnRide(body));
    navigation?.navigate('SelectRoute');
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={I18n.t('create_drive')}
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
            navigation.navigate('StartLocationDriver', {
              type: 'startLocation',
            })
          }
          titleStart={
            origin !== null ? origin.description : I18n.t('start_location')
          }
          onPressDes={() =>
            navigation.navigate('StartLocationDriver', {
              type: 'destination',
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

        <Text style={styles.bookSeatsTxt}>{I18n.t('availableSeats')}</Text>
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
              : moment(new Date()).format('DD MMM')
          }
          onPressTime={() => showTimePicker()}
          timeText={time ? time : moment(new Date()).format('hh:mm')}
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

        <Text style={styles.presetTxt}>{I18n.t('cost_percentage')}</Text>
        <DropDownPicker
          open={open}
          value={value}
          dropDownDirection={'TOP'}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{
            width: '90%',
            alignSelf: 'center',
            borderColor: colors.greyBorder,
          }}
          dropDownContainerStyle={{width: '90%', alignSelf: 'center'}}
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
          setDate={setDate}
        />
        {toggleEnabled ? (
          <>
            <ReturnLocationInput
              onPressStart={() => {
                dispatch(setMapSegment('returnTrip'));
                navigation.navigate('StartLocationDriver', {
                  type: 'returnTrip',
                });
              }}
              titleStart={
                returnOrigin
                  ? returnOrigin.description
                  : I18n.t('start_location')
              }
              onPressDes={() => {
                dispatch(setMapSegment('returnTrip'));
                navigation.navigate('StartLocationDriver', {
                  type: 'returnTrip',
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
                returnTime?.returnSecondTime ||
                moment(new Date())
                  .add(returnTime?.settings?.returnRange, 'minutes')
                  .format('HH:mm')
              }
              dateText={
                returnDateTimeStamp !== null
                  ? moment(returnDateTimeStamp).format('DD MMM')
                  : moment(dateTimeStamp).format('DD MMM') != 'Invalid date'
                  ? moment(dateTimeStamp).format('DD MMM')
                  : moment(new Date()).format('DD MMM')
              }
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
        <DateTimePickerModal
          isVisible={firstReturnTimePicker}
          date={
            normalFirstReturnTime ? new Date(normalFirstReturnTime) : new Date()
          }
          mode="time"
          is24Hour={true}
          locale="en_GB"
          onConfirm={handleConfirmFirstReturnTime}
          onCancel={hideFirstReturnTimePicker}
        />
        {isLoading ? <Loader /> : null}
      </ScrollView>
      <KeyboardAvoidingView
        //keyboardVerticalOffset={15}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <AppButton
          bgColor={handleColor(origin, destinationMap, availableSeats)}
          disabled={
            origin === null || destination === null || availableSeats === null
          }
          onPress={() => {
            handleCreateDrive();
          }}
          title={I18n.t('next')}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const handleColor = (origin, destinationMap, availableSeats) => {
  if (origin == null || availableSeats == null || destinationMap == null) {
    return colors.btnGray;
  }
  return colors.green;
};

export default CreateDrive;
