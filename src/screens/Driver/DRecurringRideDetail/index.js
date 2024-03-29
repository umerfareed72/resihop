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
import {colors, appIcons, appImages, total_seats} from '../../../utilities';
import {useNavigation} from '@react-navigation/core';
import HeartIcon from 'react-native-vector-icons/EvilIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import FavouriteLocations from '../../FavouriteLocations';
import {
  CustomHeader,
  CalendarSheet,
  ReturnCalendarSheet,
  Loader,
} from '../../../components';
import {fonts} from '../../../theme/theme';
import I18n from '../../../utilities/translations';
import HeartFilled from 'react-native-vector-icons/Foundation';
import {useSelector, useDispatch} from 'react-redux';
import {
  setAvailableSeats,
  setDateTimeStamp,
  setTime,
  setReturnFirstTime,
  setMapSegment,
  setUpdateDrive,
  setSeats,
  setReturnMapDestination,
  setReturnOrigin,
  setMapDestination,
  setOrigin,
  CreateDriveRequest,
  CancelRide,
} from '../../../redux/actions/map.actions';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DRecurringDetail = ({route}) => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  const favourteLocationRef = useRef(null);
  const calendarSheetRef = useRef(null);
  const returnCalendarSheetRef = useRef(null);
  const {
    origin,
    availableSeats,
    dateTimeStamp,
    returnDateTimeStamp,
    returnOrigin,
    time,
    recurring_dates,
    return_recurring_dates,
    settings,
  } = useSelector(state => state.map);
  const {drive} = route?.params;
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [favPress, setFavPress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [normalTime, setnormalTime] = useState();
  const [normalFirstReturnTime, setNormalFirstReturnTime] = useState('');
  const [firstReturnTimePicker, setFirstReturnTimePicker] = useState(false);
  const destinationMap = useSelector(state => state.map.destination);
  const returnTime = useSelector(state => state.map);
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
  useEffect(() => {
    dispatch(setAvailableSeats(drive.availableSeats));
    dispatch(
      setOrigin({
        location: {
          lat: drive?.startLocation?.latitude,
          lng: drive?.startLocation?.longitude,
        },
        description: drive?.startDes,
      }),
    );
    console.log();
    dispatch(
      setMapDestination({
        location: {
          lat: drive?.destinationLocation?.latitude,
          lng: drive?.destinationLocation?.longitude,
        },
        description: drive?.destDes,
      }),
    );
    dispatch(
      setReturnOrigin({
        location: {
          lat: drive?.startLocation?.latitude,
          lng: drive?.startLocation?.longitude,
        },
        description: drive?.destDes,
      }),
    );

    dispatch(
      setReturnMapDestination({
        location: {
          lat: drive?.destinationLocation?.latitude,
          lng: drive?.destinationLocation?.longitude,
        },
        description: drive?.startDes,
      }),
    );
    setValue(drive?.costPerSeat);
    dispatch(setDateTimeStamp(drive?.next[0]?.date));
    setDate(setDateTimeStamp(drive?.next[0]?.date));
    dispatch(setTime(moment(drive.next[0]?.date).format('HH:mm').toString()));
  }, []);
  //Handle Update Drive
  const handleCreateDrive = () => {
    setIsLoading(true);
    try {
      let prev_recurring_stamp = [];
      const recurring_stamp = recurring_dates.map(item => {
        return {date: moment(`${item}T${time}`).valueOf()};
      });
      if (recurring_stamp.length == 0) {
        prev_recurring_stamp = drive?.next.map(item => {
          const date = moment(item?.date).format('YYYY-MM-DD');
          return {date: moment(`${date}T${time}`).valueOf()};
        });
      }
      const body = {
        startLocation: {
          latitude: origin?.location.lat,
          longitude: origin?.location?.lng,
        },
        destinationLocation: {
          latitude: destinationMap?.location?.lat,
          longitude: destinationMap?.location?.lng,
        },
        next:
          recurring_stamp.length == 0
            ? prev_recurring_stamp.length == 0
              ? ride?.next
              : prev_recurring_stamp
            : recurring_stamp,
        availableSeats: availableSeats,
        path: 0,
        costPerSeat: value + settings?.adminCommission,
        interCity: false,
        startDes: origin?.description,
        destDes: destinationMap?.description,
      };
      dispatch(
        setUpdateDrive(drive?._id, body, response => {
          Alert.alert('Success', 'Ride Updated Successfully', [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('DriverHome');
                setIsLoading(false);
              },
            },
          ]);
        }),
      );
    } catch (error) {
      setIsLoading(false);
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
    const recurring_stamp = return_recurring_dates.map(item => {
      return moment(`${item}T${returnTime?.returnFirstTime}`).valueOf();
    });
    setIsLoading(true);
    try {
      const body = {
        startLocation: [
          returnOrigin?.location.lat,
          returnOrigin?.location?.lng,
        ],
        destinationLocation: [
          returnDestinationMap?.location?.lat,
          returnDestinationMap?.location?.lng,
        ],
        date: recurring_stamp,
        availableSeats: availableSeats,
        path: 0,
        costPerSeat: value + settings?.adminCommission,
        interCity: false,
        startDes: returnOrigin?.description,
        destDes: returnDestinationMap?.description,
      };
      dispatch(
        CreateDriveRequest(body, setIsLoading, async response => {
          if (response) {
            navigation.navigate('DriverHome');
          }
        }),
      );
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  };
  const handleCancelDrive = () => {
    dispatch(
      CancelRide(drive?._id, 'drives', setIsLoading, response => {
        Alert.alert('Success', 'Drive Cancelled Successfully', [
          {
            text: 'Ok',
            onPress: () => {
              navigation?.navigate('DriverHome');
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
        title={'Update Drive'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
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
                    ? destinationMap?.description
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
          dropDownDirection={'TOP'}
          setValue={setValue}
          setItems={setItems}
          style={{width: '90%', alignSelf: 'center'}}
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
          recurring={true}
          calendarSheetRef={calendarSheetRef}
          ride={drive}
          setDate={setDate}
        />
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
                      ? returnDestinationMap?.description
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
            if (toggleEnabled) {
              handleReturnCreateDrive();
            }
            handleCreateDrive();
          }}>
          <Text style={styles.nextTxt}>{I18n.t('update')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextBtnContainer, {backgroundColor: colors.black}]}
          onPress={() => {
            handleCancelDrive();
          }}>
          <Text style={styles.nextTxt}>{I18n.t('delete_drives')}</Text>
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
    fontFamily: fonts.regular,
  },
  txtInput: {
    height: 44,
    width: 291,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    borderRadius: 10,
    paddingLeft: 45,
    color: colors.inputTxtGray,
    justifyContent: 'center',
    fontFamily: fonts.regular,
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
    fontFamily: fonts.regular,
  },
  presetCostContainer: {
    height: 44,
    width: '90%',
    borderWidth: 1,
    borderColor: colors.greyBorder,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  presetTxt: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 24,
    color: colors.black,
    marginVertical: 25,
    marginHorizontal: 22,
  },
  locationTxt: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.g4,
  },
  to: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 24,
    color: colors.txtBlack,
  },
});

export default DRecurringDetail;
