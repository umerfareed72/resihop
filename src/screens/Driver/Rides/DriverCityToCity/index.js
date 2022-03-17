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
} from 'react-native';
import {colors, appIcons, appImages, mode, APIKEY} from '../../../../utilities';
import {useNavigation} from '@react-navigation/core';
import HeartIcon from 'react-native-vector-icons/EvilIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import FavouriteLocations from '../../../FavouriteLocations';
import {CustomHeader} from '../../../../components';
import CalendarSheet from '../../../CalendarSheet';
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
import DropDownPicker from 'react-native-dropdown-picker';
import {Loader} from '../../../../components/Loader/Loader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ReturnCalendarSheet from '../../../../components/ReurnCalenderSheet';
import styles from './styles';
const index = () => {
  let navigation = useNavigation();
  let dispatch = useDispatch();

  const favourteLocationRef = useRef(null);
  const calendarSheetRef = useRef(null);
  const returnCalendarSheetRef = useRef(null);

  const origin = useSelector(state => state.map.origin);
  const destinationMap = useSelector(state => state.map.destination);
  const availableSeats = useSelector(state => state.map.availableSeats);
  const dateTimeStamp = useSelector(state => state.map.dateTimeStamp);
  const time = useSelector(state => state.map.time);

  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [noLaterTime, setNoLaterTime] = useState('');
  const [date, setDate] = useState('');
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [screen, setScreen] = useState(false);
  const [favPress, setFavPress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [normalTime, setnormalTime] = useState();
  const [normalFirstReturnTime, setNormalFirstReturnTime] = useState('');
  const [firstReturnTimePicker, setFirstReturnTimePicker] = useState(false);
  const returnDateTimeStamp = useSelector(
    state => state.map.returnDateTimeStamp,
  );
  const returnTime = useSelector(state => state.map);
  const returnOrigin = useSelector(state => state.map.returnOrigin);
  const returnDestinationMap = useSelector(
    state => state.map.returnDestination,
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '20 NOK', value: 20},
    {label: '30 NOK', value: 30},
    {label: '40 NOK', value: 40},
    {label: '50 NOK', value: 50},
    {label: '60 NOK', value: 60},
    {label: '70 NOK', value: 70},
    {label: '80 NOK', value: 80},
  ]);

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
    setIsLoading(true);
    if (origin && destinationMap != null) {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?alternatives=true&origin=${origin?.description}&destination=${destinationMap?.description}&key=${APIKEY}&mode=${mode}`,
      );
      let respJson = await resp.json();
      if (respJson) {
        const stamp = moment(`${dateTimeStamp}T${time}`).valueOf();
        const body = {
          startLocation: [origin?.location.lat, origin?.location?.lng],
          destinationLocation: [
            destinationMap.location.lat,
            destinationMap.location.lng,
          ],
          date: stamp,
          availableSeats: availableSeats,
          path: 0,
          costPerSeat: value,
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
    setnormalTime(moment(date).format('hh:mm a'));
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
    const stamp = moment(
      `${returnDateTimeStamp}T${returnTime?.returnFirstTime}`,
    ).valueOf();
    const body = {
      startLocation: [returnOrigin?.location.lat, returnOrigin?.location?.lng],
      destinationLocation: [
        returnDestinationMap.location.lat,
        returnDestinationMap.location.lng,
      ],
      date: stamp,
      availableSeats: availableSeats,
      path: 0,
      costPerSeat: value,
      startDes: returnOrigin?.description,
      destDes: returnDestinationMap?.description,
      interCity: true,
    };
    dispatch(setReturnRide(body));
    navigation?.navigate('SelectRoute');
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={I18n.t('city_to_city_drives')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.tripBtnWrapper}>
          <TouchableOpacity
            onPress={() => {
              setScreen(false);
            }}
            style={[
              styles.tripBtnContainer,
              {backgroundColor: screen ? colors.btnGray : colors.green},
            ]}>
            <Text style={styles.btnTxt}>{I18n.t('single_trip')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setScreen(true);
              navigation?.navigate('DRecurringRides');
            }}
            style={[
              styles.tripBtnContainer,
              {backgroundColor: screen ? colors.green : colors.btnGray},
            ]}>
            <Text style={styles.btnTxt}>{I18n.t('recurring_ride')}</Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.locationMainWrapper}>
          <View>
            <View style={{marginBottom: 20}}>
              <TouchableOpacity
                style={styles.txtInput}
                onPress={() =>
                  navigation.navigate('StartLocationDriver', {
                    type: 'startLocation',
                  })
                }>
                <Text style={styles.locationTxt}>
                  {origin !== null
                    ? origin.description
                    : I18n.t('start_location')}
                </Text>
              </TouchableOpacity>
              <View style={styles.startDot} />
            </View>
            <View>
              <TouchableOpacity
                style={styles.txtInput}
                onPress={() =>
                  navigation.navigate('StartLocationDriver', {
                    type: 'destination',
                  })
                }>
                <Text style={styles.locationTxt}>
                  {destinationMap !== null
                    ? destinationMap.description
                    : I18n.t('destination')}
                </Text>
              </TouchableOpacity>
              <View style={styles.destSquare} />
            </View>
          </View>
          <View style={styles.switchWrapper}>
            {favPress === 'startLocation' ? (
              <HeartFilled
                name="heart"
                size={24}
                color={'red'}
                onPress={() => {
                  favourteLocationRef.current.open();
                }}
              />
            ) : (
              <HeartIcon
                name="heart"
                size={30}
                color={colors.btnGray}
                onPress={() => {
                  setFavPress('startLocation');
                  favourteLocationRef.current.open();
                }}
              />
            )}

            <Image source={appIcons.mobiledata} style={styles.locationSwitch} />

            {favPress === 'destination' ? (
              <HeartFilled
                name="heart"
                size={24}
                color={'red'}
                onPress={() => {
                  favourteLocationRef.current.open();
                }}
              />
            ) : (
              <HeartIcon
                name="heart"
                size={30}
                color={colors.btnGray}
                onPress={() => {
                  setFavPress('destination');
                  favourteLocationRef.current.open();
                }}
              />
            )}
          </View>
        </View>
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
          <Text style={[styles.selectTxt, {marginRight: 23}]}>
            {I18n.t('need_to_arrive')}
          </Text>
          <Text style={[styles.selectTxt, {marginLeft: 8}]}>
            {I18n.t('select_date')}
          </Text>
        </View>
        <View style={styles.selectionInputWrapper}>
          <TouchableOpacity
            onPress={() => showTimePicker()}
            style={[styles.noLater, {justifyContent: 'center'}]}>
            <Text style={styles.dateTxt}>{time ? time : `XX:XX`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => calendarSheetRef.current.open()}
            style={[
              styles.noLater,
              {justifyContent: 'center', marginRight: 11},
            ]}>
            <Text style={styles.dateTxt}>
              {dateTimeStamp !== null
                ? moment(dateTimeStamp).format('DD MMM')
                : 'Date'}
            </Text>
          </TouchableOpacity>
          <Image
            source={appImages.calendar}
            resizeMode="contain"
            style={styles.calendarIcon}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            is24Hour={true}
            locale="en_GB"
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideTimePicker}
          />
        </View>
        <Text style={styles.presetTxt}>{I18n.t('cost_percentage')}</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownDirection={'TOP'}
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
        <CalendarSheet calendarSheetRef={calendarSheetRef} setDate={setDate} />
        {toggleEnabled ? (
          <>
            <View style={styles.locationMainWrapper}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setMapSegment('returnTrip'));
                    navigation.navigate('StartLocationDriver', {
                      type: 'returnTrip',
                    });
                  }}
                  style={[styles.txtInput, {marginBottom: 20}]}>
                  <Text style={styles.startTxt}>
                    {returnOrigin
                      ? returnOrigin.description
                      : I18n.t('start_location')}
                  </Text>
                  <View style={styles.startDot} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setMapSegment('returnTrip'));
                    navigation.navigate('StartLocationDriver', {
                      type: 'returnTrip',
                    });
                  }}
                  style={styles.txtInput}>
                  <Text style={styles.startTxt}>
                    {returnDestinationMap
                      ? returnDestinationMap.description
                      : I18n.t('destination')}
                  </Text>
                  <View style={styles.destSquare} />
                </TouchableOpacity>
              </View>
              <View style={styles.switchWrapper}>
                {favPress === 'returnstartLocation' ? (
                  <HeartFilled
                    name="heart"
                    size={24}
                    color={'red'}
                    onPress={() => {
                      favourteLocationRef.current.open();
                    }}
                  />
                ) : (
                  <HeartIcon
                    name="heart"
                    size={30}
                    color={colors.btnGray}
                    onPress={() => {
                      setFavPress('returnstartLocation');
                      favourteLocationRef.current.open();
                    }}
                  />
                )}
                <Image
                  source={appIcons.mobiledata}
                  style={styles.locationSwitch}
                />

                {favPress === 'returndestination' ? (
                  <HeartFilled
                    name="heart"
                    size={24}
                    color={'red'}
                    onPress={() => {
                      favourteLocationRef.current.open();
                    }}
                  />
                ) : (
                  <HeartIcon
                    onPress={() => {
                      setFavPress('returndestination');
                      favourteLocationRef.current.open();
                    }}
                    name="heart"
                    size={30}
                    color={colors.btnGray}
                  />
                )}
              </View>
            </View>
            <View style={{marginLeft: 26}}>
              <Text style={styles.returntimeTxt}>
                {I18n.t('departure_time')}
              </Text>
              <Text style={styles.timeBracketTxt}>
                {I18n.t('departure_time_desc')}
              </Text>
            </View>
            <View style={[styles.selectionInputWrapper, {marginBottom: 20}]}>
              <TouchableOpacity
                onPress={() => showFirstReturnTimePicker()}
                style={[styles.noLater, {justifyContent: 'center'}]}>
                <Text style={styles.dateTxt}>
                  {returnTime?.returnFirstTime != 'Invalid date'
                    ? returnTime?.returnFirstTime
                    : `XX:XX`}
                </Text>
              </TouchableOpacity>
              <Text> {I18n.t('to')}</Text>
              <TouchableOpacity
                style={[styles.noLater, {justifyContent: 'center'}]}>
                <Text style={styles.dateTxt}>
                  {returnTime?.returnSecondTime != 'Invalid date'
                    ? returnTime?.returnSecondTime
                    : `XX:XX`}
                </Text>
              </TouchableOpacity>
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
            </View>
            <View style={{marginBottom: 20}}>
              <TouchableOpacity
                onPress={() => returnCalendarSheetRef.current.open()}
                style={[
                  styles.noLater,
                  {justifyContent: 'center', width: '90%', alignSelf: 'center'},
                ]}>
                <Text style={styles.dateTxt}>
                  {returnDateTimeStamp !== null
                    ? moment(returnDateTimeStamp).format('DD MMM')
                    : 'Date'}
                </Text>
              </TouchableOpacity>
              <Image
                source={appImages.calendar}
                resizeMode="contain"
                style={[styles.calendarIcon, {right: 30}]}
              />
            </View>
            <ReturnCalendarSheet
              mindate={dateTimeStamp}
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
        <TouchableOpacity
          style={[
            styles.nextBtnContainer,
            {
              backgroundColor: handleColor(
                origin,
                destinationMap,
                availableSeats,
                dateTimeStamp,
                time,
                value,
              ),
            },
          ]}
          disabled={
            origin === null ||
            destination === null ||
            availableSeats === null ||
            dateTimeStamp === null
          }
          onPress={() => {
            handleCreateDrive();
          }}>
          <Text style={styles.nextTxt}>{I18n.t('next')}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const handleColor = (
  origin,
  destinationMap,
  availableSeats,
  dateTimeStamp,
  time,
  cost,
) => {
  if (
    !origin ||
    !dateTimeStamp ||
    !availableSeats ||
    !destinationMap ||
    !time ||
    !cost
  ) {
    return colors.btnGray;
  }
  return colors.green;
};

export default index;
