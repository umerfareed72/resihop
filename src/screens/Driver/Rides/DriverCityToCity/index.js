import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {
  colors,
  appIcons,
  appImages,
  mode,
  APIKEY,
  header,
  dateConvertor,
  returnDateConvertor,
} from '../../../../utilities';
import {useNavigation} from '@react-navigation/core';
import HeartIcon from 'react-native-vector-icons/EvilIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import FavouriteLocations from '../../../FavouriteLocations';
import {
  CustomHeader,
  CalendarSheet,
  ReturnCalendarSheet,
  Loader,
  LocationInput,
  AppButton,
  ReturnLocationInput,
  ReturnDateTimerPicker,
} from '../../../../components';
import {fonts} from '../../../../theme/theme';
import I18n from '../../../../utilities/translations';
import HeartFilled from 'react-native-vector-icons/Foundation';
import {useSelector, useDispatch} from 'react-redux';
import {
  setAvailableSeats,
  setOrigin,
  setMapDestination,
  CreateDriveRequest,
  setDateTimeStamp,
  setTime,
  SetRidesResponse,
  setReturnFirstTime,
  setMapSegment,
  setReturnMapDestination,
  setReturnOrigin,
  setRoutes,
  setReturnRide,
} from '../../../../redux/actions/map.actions';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './styles';
import {post} from '../../../../services';
const index = () => {
  let navigation = useNavigation();
  let dispatch = useDispatch();

  const favourteLocationRef = useRef(null);
  const calendarSheetRef = useRef(null);
  const returnCalendarSheetRef = useRef(null);

  const {origin, settings} = useSelector(state => state.map);
  const destinationMap = useSelector(state => state.map.destination);
  const availableSeats = useSelector(state => state.map.availableSeats);
  const dateTimeStamp = useSelector(state => state.map.dateTimeStamp);
  const time = useSelector(state => state.map.time);

  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [favPress, setFavPress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [normalTime, setnormalTime] = useState(new Date());
  const [normalFirstReturnTime, setNormalFirstReturnTime] = useState(
    new Date(),
  );
  const [firstReturnTimePicker, setFirstReturnTimePicker] = useState(false);
  const returnDateTimeStamp = useSelector(
    state => state.map.returnDateTimeStamp,
  );
  const returnTime = useSelector(state => state.map);
  const returnOrigin = useSelector(state => state.map.returnOrigin);
  const returnDestinationMap = useSelector(
    state => state.map.returnDestination,
  );
  const [cost, setcost] = useState(null);

  // Release Redux States
  useEffect(() => {
    return () => {
      dispatch(setAvailableSeats(0));
      dispatch(setOrigin(null));
      dispatch(setMapDestination(null));
      dispatch(setDateTimeStamp(null));
      dispatch(SetRidesResponse(null));
      dispatch(setReturnOrigin(null));
      dispatch(setReturnMapDestination(null));
      dispatch(setReturnFirstTime(null));
    };
  }, []);

  const handleCreateDrive = async () => {
    const totalCost = cost + availableSeats * settings?.adminCommission;
    setIsLoading(true);
    if (origin && destinationMap != null) {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?alternatives=true&origin=${origin?.description}&destination=${destinationMap?.description}&key=${APIKEY}&mode=${mode}`,
      );
      let respJson = await resp.json();
      if (respJson) {
        let stamp = dateConvertor(dateTimeStamp, time);

        const body = {
          startLocation: [origin?.location.lat, origin?.location?.lng],
          destinationLocation: [
            destinationMap.location.lat,
            destinationMap.location.lng,
          ],
          date: stamp,
          availableSeats: availableSeats,
          path: 0,
          costPerSeat: totalCost.toFixed(0),
          interCity: true,
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
    dispatch(setTime(moment(date).format('HH:mm')));
    setnormalTime(date);
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
    const totalCost = cost + availableSeats * settings?.adminCommission;
    const {returnFirstTime} = returnTime;
    const stamp = returnDateConvertor(returnDateTimeStamp, returnFirstTime);
    const body = {
      startLocation: [returnOrigin?.location.lat, returnOrigin?.location?.lng],
      destinationLocation: [
        returnDestinationMap.location.lat,
        returnDestinationMap.location.lng,
      ],
      date: stamp,
      availableSeats: availableSeats,
      path: 0,
      costPerSeat: totalCost.toFixed(0),
      startDes: returnOrigin?.description,
      destDes: returnDestinationMap?.description,
      interCity: true,
    };
    dispatch(setReturnRide(body));
    navigation?.navigate('SelectRoute');
  };
  const onPressCost = async () => {
    if (
      origin?.location?.lat &&
      origin?.location?.lng &&
      destinationMap?.location?.lat &&
      destinationMap?.location?.lng
    ) {
      const body = {
        startLocation: [origin?.location.lat, origin?.location?.lng],
        destinationLocation: [
          destinationMap?.location?.lat,
          destinationMap?.location?.lng,
        ],
      };
      const res = await post(`drives/city`, body, await header());
      if (res?.data) {
        setcost(res?.data?.price);
        navigation?.navigate('CostPerSeat', {data: res.data});
      }
    } else {
      Alert.alert('Error!', 'Please add start and sestination location!');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={I18n.t('city_to_city_drives')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <View style={styles.selectWrapper}>
          <Text style={styles.selectTxt}>{I18n.t('select_date')}</Text>
          <Text style={[styles.selectTxt]}>{I18n.t('need_to_arrive')}</Text>
        </View>
        <View style={styles.selectionInputWrapper}>
          <TouchableOpacity
            onPress={() => calendarSheetRef.current.open()}
            style={[
              styles.noLater,
              {justifyContent: 'center', marginRight: 11},
            ]}>
            <Text style={styles.dateTxt}>
              {dateTimeStamp !== null
                ? moment(dateTimeStamp).format('DD MMM')
                : moment(new Date()).format('DD MMM')}
            </Text>
            <Image
              source={appImages.calendar}
              resizeMode="contain"
              style={styles.calendarIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => showTimePicker()}
            style={[styles.noLater, {justifyContent: 'center'}]}>
            <Text style={styles.dateTxt}>
              {time ? time : moment(new Date()).format('hh:mm')}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            is24Hour={true}
            locale="en_GB"
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideTimePicker}
            date={new Date(normalTime)}
          />
        </View>

        <Text style={styles.presetTxt}>{I18n.t('cost_percentage')}</Text>
        <TouchableOpacity
          onPress={() => {
            onPressCost();
          }}
          style={[
            styles.dropBtn,
            {backgroundColor: cost ? colors.navy_blue : colors.g1},
          ]}>
          <Text style={styles.dropText}>
            {cost ? `${cost.toFixed(0)} NOK` : I18n.t('cost_per_seat')}
          </Text>
        </TouchableOpacity>

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
        <CalendarSheet calendarSheetRef={calendarSheetRef} setDate={setDate} />
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
                  : moment(new Date()).format('DD MMM')
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
              mindate={dateTimeStamp || new Date()}
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
          bgColor={handleColor(origin, destinationMap, availableSeats, cost)}
          disabled={
            origin === null || destination === null || availableSeats === null
          }
          onPress={() => {
            handleCreateDrive();
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const handleColor = (origin, destinationMap, availableSeats, cost) => {
  if (!origin || !availableSeats || !destinationMap || !cost) {
    return colors.btnGray;
  }
  return colors.green;
};

export default index;
