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
import {colors, appIcons, appImages} from '../../../utilities';
import {useNavigation} from '@react-navigation/core';
import HeartIcon from 'react-native-vector-icons/EvilIcons';
import HeartFilled from 'react-native-vector-icons/Foundation';
import ToggleSwitch from 'toggle-switch-react-native';
import FavouriteLocations from '../../FavouriteLocations';
import {CustomHeader, Loader} from '../../../components';
import CalendarSheet from '../../CalendarSheet';
import ReturnCalendarSheet from '../../../components/ReurnCalenderSheet';
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
  get_settings,
  setRecurringDates,
  setReturnRecurringDates,
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
  const [normalTime, setNormalTime] = useState('');
  const [normalFirstReturnTime, setNormalFirstReturnTime] = useState('');
  const [firstReturnTimePicker, setFirstReturnTimePicker] = useState(false);

  useEffect(() => {
    dispatch(setTime(moment().format('HH:mm')));
    dispatch(get_settings());

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
    const recurring_stamp = recurring_dates.map(item => {
      return moment(`${item}T${time}`).valueOf();
    });
    const stamp = moment(`${dateTimeStamp}T${time}`).valueOf();
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
    console.log(body);
    dispatch(
      CreateRideRequest(body, setIsLoading, toggleEnabled, response => {
        if (response.error) {
          Alert.alert('Error', response?.message[0]?.messages[0]?.message);
        } else {
          navigation.navigate('StartMatching', {
            modalName: 'startMatching',
            dateTimeStamp: stamp,
          });
        }
      }),
    );
  };

  const handleCreateReturnRide = () => {
    const return_recurring_stamp = return_recurring_dates.map(item => {
      return moment(`${item}T${returnTime?.returnFirstTime}`).valueOf();
    });
    const stamp = moment(
      `${returnDateTimeStamp}T${returnTime?.returnFirstTime}`,
    ).valueOf();
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
    console.log(body);
    dispatch(
      CreateRideRequest(body, setIsLoading, null, response => {
        // console.log('Return Create Ride', response);
      }),
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={I18n.t('create_ride')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.tripBtnWrapper}>
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
            }}
            style={[
              styles.tripBtnContainer,
              {backgroundColor: screen ? colors.green : colors.btnGray},
            ]}>
            <Text style={styles.btnTxt}>{I18n.t('recurring_ride')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.locationMainWrapper}>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('StartLocation', {
                  modalName: 'startLocation',
                })
              }
              style={[styles.txtInput, {marginBottom: 20}]}>
              <Text style={styles.startTxt}>
                {origin !== null
                  ? origin.description
                  : I18n.t('start_location')}
              </Text>
              <View style={styles.startDot} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('StartLocation', {modalName: 'destination'})
              }
              style={styles.txtInput}>
              <Text style={styles.startTxt}>
                {destinationMap !== null
                  ? destinationMap.description
                  : I18n.t('destination')}
              </Text>
              <View style={styles.destSquare} />
            </TouchableOpacity>
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
                onPress={() => {
                  setFavPress('destination');
                  favourteLocationRef.current.open();
                }}
                name="heart"
                size={30}
                color={colors.btnGray}
              />
            )}
          </View>
        </View>
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
        <View style={styles.selectWrapper}>
          <Text style={[styles.selectTxt]}>{I18n.t('need_to_arrive')}</Text>
          <Text style={styles.selectTxt}>{I18n.t('select_date')}</Text>
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
            date={normalTime ? new Date(normalTime) : new Date()}
            is24Hour
            locale="en_GB"
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideTimePicker}
          />
        </View>
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
        <CalendarSheet recurring={screen} calendarSheetRef={calendarSheetRef} />
        {toggleEnabled ? (
          <>
            <View style={styles.locationMainWrapper}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setMapSegment('returnTrip'));
                    navigation.navigate('StartLocation', {
                      modalName: 'returnTrip',
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
                    navigation.navigate('StartLocation', {
                      modalName: 'returnTrip',
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
              recurring={screen}
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
              ),
            },
          ]}
          // disabled={handleDisable(
          //   origin,
          //   destinationMap,
          //   availableSeats,
          //   dateTimeStamp,
          //   time,
          // )}
          onPress={() => {
            handleCreateRide();
            if (toggleEnabled) {
              handleCreateReturnRide();
            }
          }}>
          <Text style={styles.nextTxt}>{I18n.t('next')}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const handleDisable = (
  origin,
  destinationMap,
  availableSeats,
  dateTimeStamp,
  time,
) => {
  if (
    !origin ||
    !dateTimeStamp ||
    !availableSeats ||
    !destinationMap ||
    !time
  ) {
    return true;
  }
  return false;
};

const handleColor = (
  origin,
  destinationMap,
  availableSeats,
  dateTimeStamp,
  time,
) => {
  if (
    !origin ||
    !dateTimeStamp ||
    !availableSeats ||
    !destinationMap ||
    !time
  ) {
    return colors.btnGray;
  }
  return colors.green;
};

export default index;
