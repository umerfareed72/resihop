import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Alert,
} from 'react-native';
import {colors, appIcons, appImages} from '../../../utilities';
import HeartIcon from 'react-native-vector-icons/EvilIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import FavouriteLocations from '../../FavouriteLocations';
import {
  CustomHeader,
  Loader,
  CalendarSheet,
  ReturnCalendarSheet,
} from '../../../components';
import {useNavigation} from '@react-navigation/core';
import {fonts} from '../../../theme/theme';
import I18n from '../../../utilities/translations';
import {useDispatch, useSelector} from 'react-redux';
import {
  CancelRide,
  CreateRideRequest,
  setAvailableSeats,
  setDateTimeStamp,
  SetDriversResponse,
  setMapDestination,
  setMapSegment,
  setOrigin,
  setRecurringDates,
  setReturnFirstTime,
  setReturnMapDestination,
  setReturnOrigin,
  setReturnRecurringDates,
  setTime,
  setUpdateRide,
} from '../../../redux/actions/map.actions';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import HeartFilled from 'react-native-vector-icons/Foundation';

const RecurringRideDetail = ({route}) => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  const favourteLocationRef = useRef(null);
  const calendarSheetRef = useRef(null);
  const returnCalendarSheetRef = useRef(null);

  const [favPress, setFavPress] = useState('');
  const returnDestinationMap = useSelector(
    state => state.map.returnDestination,
  );

  const {
    origin,
    dateTimeStamp,
    returnDateTimeStamp,
    time,
    availableSeats,
    returnOrigin,
    recurring_dates,
    return_recurring_dates,
  } = useSelector(state => state.map);
  const destinationMap = useSelector(state => state.map.destination);
  const returnTime = useSelector(state => state.map);
  const {ride} = route.params;
  const [date, setDate] = useState('');
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstReturnTimePicker, setFirstReturnTimePicker] = useState(false);
  const [normalTime, setNormalTime] = useState('');
  const [normalFirstReturnTime, setNormalFirstReturnTime] = useState('');

  useEffect(() => {
    dispatch(setAvailableSeats(ride.requiredSeats));
    dispatch(
      setOrigin({
        location: {lat: ride?.startLat, lng: ride?.startLng},
        description: ride?.startDes,
      }),
    );
    dispatch(
      setMapDestination({
        location: {
          lat: ride?.destinationLat,
          lng: ride?.destinationLng,
        },
        description: ride?.destDes,
      }),
    );
    dispatch(
      setReturnOrigin({
        location: {
          lat: ride?.destinationLat,
          lng: ride?.destinationLng,
        },
        description: ride?.destDes,
      }),
    );

    dispatch(
      setReturnMapDestination({
        location: {lat: ride?.startLat, lng: ride?.startLng},
        description: ride?.startDes,
      }),
    );
    dispatch(setTime(moment(ride.next[0]?.date).format('HH:mm').toString()));
    dispatch(setDateTimeStamp(moment(ride.next[0]?.date).format('YYYY-MM-DD')));
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
    dispatch(setTime(moment(date).format('HH:mm')));
    hideTimePicker();
  };
  //Hanlde Update Ride
  const handleUpDateRide = () => {
    let prev_recurring_stamp = [];
    const recurring_stamp = recurring_dates.map(item => {
      return {date: moment(`${item}T${time}`).valueOf()};
    });
    if (recurring_stamp.length == 0) {
      prev_recurring_stamp = ride?.next.map(item => {
        const date = moment(item?.date).format('YYYY-MM-DD');
        return {date: moment(`${date}T${time}`).valueOf()};
      });
    }
    const body = {
      startLocation: [origin.location.lat, origin.location.lng],
      destinationLocation: [
        destinationMap.location.lat,
        destinationMap.location.lng,
      ],
      next:
        recurring_stamp.length == 0
          ? prev_recurring_stamp.length == 0
            ? ride?.next
            : prev_recurring_stamp
          : recurring_stamp,
      requiredSeats: availableSeats,
      startDes: origin.description,
      destDes: destinationMap.description,
    };
    dispatch(
      setUpdateRide(body, ride._id, setIsLoading, response => {
        Alert.alert('Success', 'Ride Updated Successfully', [
          {
            text: 'OK',
            onPress: () => {
              navigation?.navigate('PassengerHome');
            },
          },
        ]);
      }),
    );
  };

  //Update Ride
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
  const handleCreateReturnRide = () => {
    const recurring_stamp = return_recurring_dates.map(item => {
      return moment(`${item}T${returnTime?.returnFirstTime}`).valueOf();
    });
    const body = {
      startLocation: [returnOrigin.location.lat, returnOrigin.location.lng],
      destinationLocation: [
        returnDestinationMap.location.lat,
        returnDestinationMap.location.lng,
      ],
      date: recurring_stamp,
      requiredSeats: availableSeats,
      startDes: returnOrigin.description,
      destDes: returnDestinationMap.description,
    };
    dispatch(
      CreateRideRequest(body, setIsLoading, null, response => {
        console.log('Return Create Ride', response);
      }),
    );
  };
  //Handle Delete Ride
  const handleCancelRide = () => {
    dispatch(
      CancelRide(ride?._id, 'rides', setIsLoading, response => {
        console.log(response);
        Alert.alert('Success', 'Ride Cancelled Successfully', [
          {
            text: 'Ok',
            onPress: () => {
              navigation?.navigate('PassengerHome');
            },
          },
        ]);
      }),
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={'Update Ride'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.locationMainWrapper}>
          <View>
            <View style={{marginBottom: 20}}>
              <TouchableOpacity
                style={styles.txtInput}
                onPress={() =>
                  navigation.navigate('StartLocation', {
                    modalName: 'startLocation',
                  })
                }>
                <Text style={styles.startTxt}>
                  {origin ? origin.description : I18n.t('start_location')}
                </Text>
              </TouchableOpacity>
              <View style={styles.startDot} />
            </View>
            <View>
              <TouchableOpacity
                style={styles.txtInput}
                onPress={() =>
                  navigation.navigate('StartLocation', {
                    modalName: 'destination',
                  })
                }>
                <Text style={styles.startTxt}>
                  {destinationMap
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
        <CalendarSheet
          ride={ride}
          recurring={true}
          calendarSheetRef={calendarSheetRef}
          setDate={setDate}
        />
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
              recurring={true}
              mindate={new Date()}
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
          style={styles.nextBtnContainer}
          onPress={() => {
            handleUpDateRide();
            if (toggleEnabled) {
              handleCreateReturnRide();
            }
          }}>
          <Text style={styles.nextTxt}>{I18n.t('update')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextBtnContainer, {backgroundColor: colors.black}]}
          onPress={() => {
            handleCancelRide();
          }}>
          <Text style={styles.nextTxt}>{I18n.t('delete_rides')}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RecurringRideDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backArrow: {
    height: 15,
    width: 20,
    marginRight: 19,
  },
  createHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 21,
  },
  rideTxt: {
    fontSize: 20,
    lineHeight: 24,
  },
  tripBtnContainer: {
    height: 39,
    width: 145,
    backgroundColor: colors.btnGray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripBtnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '85%',
    alignSelf: 'center',
  },
  btnTxt: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.white,
  },
  txtInput: {
    height: 44,
    width: 291,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    borderRadius: 10,
    paddingLeft: 45,
    color: colors.inputTxtGray,
    fontFamily: fonts.regular,
    justifyContent: 'center',
  },
  startDot: {
    height: 16,
    width: 16,
    borderRadius: 16 / 2,
    backgroundColor: colors.green,
    position: 'absolute',
    top: 14,
    left: 15,
  },
  destSquare: {
    height: 16,
    width: 16,
    backgroundColor: colors.blue,
    position: 'absolute',
    top: 14,
    left: 15,
    borderRadius: 4,
  },
  locationSwitch: {
    height: 25,
    width: 25,
    backgroundColor: colors.green,
    borderRadius: 25 / 2,
    marginVertical: 11,
  },
  switchWrapper: {
    alignItems: 'center',
  },
  locationMainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 19,
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  bookSeatsTxt: {
    fontSize: 14,
    lineHeight: 24,
    marginTop: 37,
    color: colors.txtBlack,
    marginLeft: 21,
    fontFamily: fonts.regular,
  },
  seat: {
    height: 31,
    width: 24,
    marginRight: 20,
  },
  seatsWrapper: {
    flexDirection: 'row',
    marginLeft: 21,
    marginTop: 25,
    alignItems: 'center',
  },
  selectWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 26,
    marginLeft: 20,
  },
  selectTxt: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.txtBlack,
    fontFamily: fonts.regular,
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
    fontFamily: fonts.regular,
  },
  calendarIcon: {
    height: 18,
    width: 18,
    position: 'absolute',
    right: 22,
    top: 13,
  },
  selectionInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  returnTxt: {
    fontSize: 16,
    lineHeight: 29,
    color: colors.txtBlack,
    fontFamily: fonts.regular,
  },
  returnTripWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 31,
    width: '87%',
    alignSelf: 'center',
  },
  returntimeTxt: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.txtBlack,
    marginTop: 20,
    fontFamily: fonts.regular,
  },
  timeBracketTxt: {
    fontSize: 12,
    lineHeight: 24,
    color: colors.btnGray,
    fontFamily: fonts.regular,
  },
  nextBtnContainer: {
    height: 56,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 15,
    marginBottom: 20,
    alignSelf: 'center',
  },
  nextTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  dateTxt: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.g1,
  },
  startTxt: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.g4,
  },
});
