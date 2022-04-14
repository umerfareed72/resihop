import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {CustomHeader} from './Header/CustomHeader';
import {appImages, colors, family, size} from '../utilities';
import {GoogleInput} from '../components';

import {useNavigation} from '@react-navigation/core';
import CalendarSheet from '../screens/CalendarSheet';
import I18n from '../utilities/translations';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  setOrigin,
  setMapDestination,
  setAvailableSeats,
  setTime,
  setReturnOrigin,
  setReturnMapDestination,
  setMapSegment,
  setReturnFirstTime,
} from '../redux/actions/map.actions';
import {AddFavLocation} from '../redux/actions/favLocation.actions';
import ReturnCalendarSheet from './ReurnCalenderSheet';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {fonts} from '../theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Loader} from './Loader/Loader';
import {useIsFocused} from '@react-navigation/native';
const AddressCards = ({
  modalName,
  addfavrouiteAddressRef,
  onPress,
  mode,
  favName,
  googleAutoComplete,
  recurring,
}) => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  const calenderSheetRef = useRef(null);
  const returnCalendarSheetRef = useRef(null);

  const startReturnGoogleAutoComplete = useRef(null);
  const destinationReturnGoogleAutoComplete = useRef(null);

  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [favBtn, setFavBtn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [normalTime, setNormalTime] = useState('');
  const [normalFirstReturnTime, setNormalFirstReturnTime] = useState('');

  const [currentReturnStart, setCurrentReturnStart] = useState('');
  const [currentReturnDestination, setCurrentReturnDestination] = useState('');
  const [firstReturnTimePicker, setFirstReturnTimePicker] = useState(false);
  const [secondReturnTimePicker, setSecondReturnTimePicker] = useState(false);
  const [returnSecondTime, setReturnSecondTime] = useState('');

  const {availableSeats, time, city_ride} = useSelector(state => state.map);
  const dateTimeStamp = useSelector(state => state.map.dateTimeStamp);
  const returnDateTimeStamp = useSelector(
    state => state.map.returnDateTimeStamp,
  );
  const {origin, recurring_dates, return_recurring_dates} = useSelector(
    state => state.map,
  );
  const destinationMap = useSelector(state => state.map.destination);
  const returnOrigin = useSelector(state => state.map.returnOrigin);
  const returnDestinationMap = useSelector(
    state => state.map.returnDestination,
  );
  const user = useSelector(state => state.auth.userdata);
  const returnTime = useSelector(state => state.map);
  const isFocus = useIsFocused(null);
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

  const hideSecondReturnTimePicker = () => {
    setSecondReturnTimePicker(false);
  };

  const handleConfirmFirstReturnTime = date => {
    setNormalFirstReturnTime(moment(date).format());
    dispatch(setReturnFirstTime(date));
    hideFirstReturnTimePicker();
  };

  const handleConfirmSecondReturnTime = date => {
    // dispatch(setReturnFirstTime(moment(date).format('HH:mm')));
    // hideFirstReturnTimePicker();
  };

  useEffect(() => {
    dispatch(setTime(moment().format('HH:mm')));
    if (modalName === 'startLocation') {
      if (origin) {
        googleAutoComplete.current?.setAddressText(origin.description);
        setCurrentAddress(origin.description);
      }
    }

    if (modalName === 'destination') {
      if (destinationMap) {
        googleAutoComplete.current?.setAddressText(destinationMap.description);
        setCurrentAddress(destinationMap.description);
      }
    }

    if (modalName === 'returnTrip') {
      if (returnOrigin) {
        startReturnGoogleAutoComplete.current?.setAddressText(
          returnOrigin.description,
        );
        setCurrentReturnStart(returnOrigin.description);
      }

      if (returnDestinationMap) {
        destinationReturnGoogleAutoComplete.current?.setAddressText(
          returnDestinationMap.description,
        );
        setCurrentReturnDestination(returnDestinationMap.description);
      }
    }

    return () => {
      dispatch(setMapSegment(null));
    };
  }, []);

  const handleAddFavLocation = item => {
    setIsLoading(true);
    setFavBtn(item);

    const body = {
      type: 'LOCATION',
      user: {
        _id: user.user.id,
      },
      location: {
        latitude:
          modalName === 'startLocation'
            ? origin.location.lat
            : destinationMap.location.lat,
        longitude:
          modalName === 'startLocation'
            ? origin.location.lng
            : destinationMap.location.lng,
        name: item ? item : favName,
        description:
          modalName === 'startLocation'
            ? origin.description
            : destinationMap.description,
      },
    };

    dispatch(
      AddFavLocation(body, response => {
        setIsLoading(false);
        alert('Location added as favourite');
      }),
    );
  };
  return (
    <>
      {modalName === 'startLocation' ||
      modalName === 'destination' ||
      modalName === 'returnTrip' ? (
        <View style={styles.upperModalContainer}>
          <CustomHeader
            backButton={true}
            navigation={navigation}
            title={getModalName(modalName)}
          />
          <View style={styles.startInputWrapper}>
            {modalName === 'returnTrip' ? (
              <View style={styles.locationMainWrapper}>
                <View>
                  <View style={{marginBottom: 20}}>
                    {city_ride ? (
                      <GooglePlacesAutocomplete
                        ref={startReturnGoogleAutoComplete}
                        placeholder={I18n.t('address_placeholder')}
                        styles={styles.googleInput}
                        onPress={(data, details = null) => {
                          dispatch(
                            setReturnOrigin({
                              location: details.geometry.location,
                              description: data.description,
                            }),
                          );
                        }}
                        query={{
                          key: 'AIzaSyBq3-UEY9QO9X45s8w54-mrwjBQekzDlsA',
                          language: 'en',
                          types: '(cities)', // default: 'geocode'
                        }}
                        debounce={400}
                        fetchDetails={true}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        enablePoweredByContainer={false}
                        returnKeyType={'search'}
                        filterReverseGeocodingByTypes={[
                          'locality',
                          'administrative_area_level_3',
                        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3']
                        textInputProps={{
                          onChangeText: setCurrentReturnStart,
                        }}
                      />
                    ) : (
                      <GooglePlacesAutocomplete
                        ref={startReturnGoogleAutoComplete}
                        placeholder={I18n.t('address_placeholder')}
                        styles={styles.googleInput}
                        onPress={(data, details = null) => {
                          dispatch(
                            setReturnOrigin({
                              location: details.geometry.location,
                              description: data.description,
                            }),
                          );
                        }}
                        debounce={400}
                        fetchDetails={true}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        enablePoweredByContainer={false}
                        returnKeyType={'search'}
                        query={{
                          key: 'AIzaSyBq3-UEY9QO9X45s8w54-mrwjBQekzDlsA',
                          language: 'en',
                        }}
                        textInputProps={{
                          onChangeText: setCurrentReturnStart,
                        }}
                      />
                    )}
                    <View style={styles.startDot} />
                  </View>
                  <View>
                    {city_ride ? (
                      <GooglePlacesAutocomplete
                        ref={destinationReturnGoogleAutoComplete}
                        styles={styles.googleInput}
                        placeholder={I18n.t('address_placeholder')}
                        onPress={(data, details = null) => {
                          dispatch(
                            setReturnMapDestination({
                              location: details.geometry.location,
                              description: data.description,
                            }),
                          );
                        }}
                        debounce={400}
                        fetchDetails={true}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        enablePoweredByContainer={false}
                        returnKeyType={'search'}
                        query={{
                          key: 'AIzaSyBq3-UEY9QO9X45s8w54-mrwjBQekzDlsA',
                          language: 'en',
                          types: '(cities)', // default: 'geocode'
                        }}
                        filterReverseGeocodingByTypes={[
                          'locality',
                          'administrative_area_level_3',
                        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3']
                        textInputProps={{
                          onChangeText: setCurrentReturnDestination,
                        }}
                      />
                    ) : (
                      <GooglePlacesAutocomplete
                        ref={destinationReturnGoogleAutoComplete}
                        placeholder={I18n.t('address_placeholder')}
                        styles={styles.googleInput}
                        onPress={(data, details = null) => {
                          dispatch(
                            setReturnMapDestination({
                              location: details.geometry.location,
                              description: data.description,
                            }),
                          );
                        }}
                        debounce={400}
                        fetchDetails={true}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        enablePoweredByContainer={false}
                        returnKeyType={'search'}
                        query={{
                          key: 'AIzaSyBq3-UEY9QO9X45s8w54-mrwjBQekzDlsA',
                          language: 'en',
                        }}
                        textInputProps={{
                          onChangeText: setCurrentReturnDestination,
                        }}
                      />
                    )}

                    <View style={styles.destSquare} />
                  </View>
                </View>
              </View>
            ) : (
              <>
                {city_ride ? (
                  <GooglePlacesAutocomplete
                    ref={googleAutoComplete}
                    styles={styles.googleInput}
                    placeholder={I18n.t('address_placeholder')}
                    onPress={(data, details = null) => {
                      if (modalName === 'startLocation') {
                        dispatch(
                          setOrigin({
                            location: details.geometry.location,
                            description: data.description,
                          }),
                        );

                        dispatch(
                          setReturnMapDestination({
                            location: details.geometry.location,
                            description: data.description,
                          }),
                        );
                      }

                      if (modalName === 'destination') {
                        dispatch(
                          setMapDestination({
                            location: details.geometry.location,
                            description: data.description,
                          }),
                        );

                        dispatch(
                          setReturnOrigin({
                            location: details.geometry.location,
                            description: data.description,
                          }),
                        );
                      }
                    }}
                    query={{
                      key: 'AIzaSyBq3-UEY9QO9X45s8w54-mrwjBQekzDlsA',
                      language: 'en',
                      types: '(cities)',
                    }}
                    debounce={400}
                    fetchDetails={true}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    enablePoweredByContainer={false}
                    returnKeyType={'search'}
                    filterReverseGeocodingByTypes={[
                      'locality',
                      'administrative_area_level_3',
                    ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3']
                    textInputProps={{
                      onChangeText: setCurrentAddress,
                      autoCorrect: false,
                      autoCapitalize: false,
                    }}
                  />
                ) : (
                  <GooglePlacesAutocomplete
                    ref={googleAutoComplete}
                    styles={styles.googleInput}
                    placeholder={I18n.t('address_placeholder')}
                    onPress={(data, details = null) => {
                      if (modalName === 'startLocation') {
                        dispatch(
                          setOrigin({
                            location: details.geometry.location,
                            description: data.description,
                          }),
                        );

                        dispatch(
                          setReturnMapDestination({
                            location: details.geometry.location,
                            description: data.description,
                          }),
                        );
                      }

                      if (modalName === 'destination') {
                        dispatch(
                          setMapDestination({
                            location: details.geometry.location,
                            description: data.description,
                          }),
                        );

                        dispatch(
                          setReturnOrigin({
                            location: details.geometry.location,
                            description: data.description,
                          }),
                        );
                      }
                    }}
                    debounce={400}
                    fetchDetails={true}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    enablePoweredByContainer={false}
                    returnKeyType={'search'}
                    query={{
                      key: 'AIzaSyBq3-UEY9QO9X45s8w54-mrwjBQekzDlsA',
                      language: 'en',
                    }}
                    textInputProps={{
                      onChangeText: setCurrentAddress,
                      autoCorrect: false,
                      autoCapitalize: false,
                    }}
                  />
                )}

                <View
                  style={
                    modalName === 'startLocation'
                      ? styles.startDot
                      : styles.destSquare
                  }
                />
              </>
            )}
          </View>
          <Text style={styles.favLocation}> {I18n.t('add_this_to_fav')}</Text>
          <View style={styles.faveBtnWrapper}>
            <TouchableOpacity
              style={[
                styles.favLocationBtn,
                {
                  backgroundColor:
                    favBtn === 'Home' ? colors.green : colors.btnGray,
                },
              ]}
              onPress={() => {
                handleAddFavLocation('Home');
              }}
              disabled={handleLocationDisable(
                modalName,
                origin,
                destinationMap,
              )}>
              <Text style={styles.favLocationBtnTxt}>{I18n.t('home')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.favLocationBtn,
                {
                  backgroundColor:
                    favBtn === 'Office' ? colors.green : colors.btnGray,
                },
              ]}
              onPress={() => {
                handleAddFavLocation('Office');
              }}
              disabled={handleLocationDisable(
                modalName,
                origin,
                destinationMap,
              )}>
              <Text style={styles.favLocationBtnTxt}>{I18n.t('office')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.favLocationBtn,
                {
                  backgroundColor:
                    favBtn === 'Other' ? colors.green : colors.btnGray,
                },
              ]}
              disabled={handleLocationDisable(
                modalName,
                origin,
                destinationMap,
              )}
              onPress={() => {
                addfavrouiteAddressRef.current.open();
                setFavBtn('Other');
              }}>
              <Text style={styles.favLocationBtnTxt}>{I18n.t('other')}</Text>
            </TouchableOpacity>
          </View>
          {modalName === 'startLocation' ? (
            <>
              <View style={styles.bookWrapper}>
                <Text style={styles.bookSeatsTxt}>
                  {mode === 'driver'
                    ? I18n.t('availableSeats')
                    : I18n.t('book_seat')}
                </Text>
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
              </View>
            </>
          ) : modalName === 'returnTrip' ? (
            <>
              <View style={{marginLeft: 26}}>
                <Text style={styles.returntimeTxt}>
                  {I18n.t('departure_time')}
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
                <Text>{I18n.t('to')}</Text>
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
                  is24Hour={true}
                  locale="en_GB"
                  mode="time"
                  onConfirm={handleConfirmFirstReturnTime}
                  onCancel={hideFirstReturnTimePicker}
                />
                <DateTimePickerModal
                  isVisible={secondReturnTimePicker}
                  is24Hour={true}
                  locale="en_GB"
                  mode="time"
                  onConfirm={handleConfirmSecondReturnTime}
                  onCancel={hideSecondReturnTimePicker}
                />
              </View>
              <View style={{marginBottom: 20}}>
                <TouchableOpacity
                  onPress={() => returnCalendarSheetRef.current.open()}
                  style={[
                    styles.noLater,
                    {
                      justifyContent: 'center',
                      width: '90%',
                      alignSelf: 'center',
                    },
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
                ride={{
                  next: return_recurring_dates?.map(item => {
                    return {date: item};
                  }),
                }}
                date={returnDateTimeStamp}
                recurring={recurring}
                calendarSheetRef={returnCalendarSheetRef}
              />
            </>
          ) : (
            <>
              <View style={styles.selectWrapper}>
                <Text style={[styles.selectTxt]}>
                  {I18n.t('need_to_arrive')}
                </Text>
                <Text style={styles.selectTxt}>{I18n.t('select_date')}</Text>
              </View>
              <View style={styles.selectionInputWrapper}>
                <TouchableOpacity
                  onPress={() => showTimePicker()}
                  style={[styles.noLater, {justifyContent: 'center'}]}>
                  <Text
                    style={{
                      fontFamily: family.product_sans_regular,
                      fontSize: size.normal,
                      color: colors.btnGray,
                    }}>
                    {time ? time : `XX:XX`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    calenderSheetRef.current.open();
                  }}
                  style={[styles.noLater, {marginRight: 11}]}>
                  <Text
                    style={{
                      fontFamily: family.product_sans_regular,
                      fontSize: size.normal,
                      color: colors.btnGray,
                    }}>
                    {dateTimeStamp !== null
                      ? moment(dateTimeStamp).format('DD MMM')
                      : 'Date'}
                  </Text>
                  <Image
                    source={appImages.calendar}
                    resizeMode="contain"
                    style={styles.calendarIcon}
                  />
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  date={normalTime ? new Date(normalTime) : new Date()}
                  is24Hour={true}
                  locale="en_GB"
                  mode="time"
                  onConfirm={handleConfirm}
                  onCancel={hideTimePicker}
                />
              </View>
            </>
          )}

          <TouchableOpacity
            style={[
              styles.nextBtnContainer,
              {
                marginTop:
                  modalName === 'startLocation'
                    ? 35
                    : modalName === 'returnTrip'
                    ? 20
                    : 25,
                backgroundColor: handleBackgroundColor(
                  currentAddress,
                  availableSeats,
                  time,
                  dateTimeStamp,
                  modalName,
                ),
              },
            ]}
            disabled={handleDisable(
              currentAddress,
              availableSeats,
              time,
              dateTimeStamp,
              modalName,
              currentReturnStart,
              currentReturnDestination,
              returnTime,
            )}
            onPress={onPress}>
            <Text style={styles.nextTxt}>{I18n.t('next')}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <CalendarSheet
        ride={{
          next: recurring_dates?.map(item => {
            return {date: item};
          }),
        }}
        date={dateTimeStamp}
        recurring={recurring}
        calendarSheetRef={calenderSheetRef}
      />
      {isLoading ? <Loader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  upperModalContainer: {
    //height: 467,
    paddingBottom: 26,
    width: '100%',
    position: 'absolute',
    backgroundColor: colors.white,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
  },
  backArrow: {
    width: 20,
    height: 15,
    marginRight: 19,
  },
  chooseLocationHeader: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 21,
  },
  headerTxt: {
    fontSize: 20,
    lineHeight: 24,
  },
  txtInput: {
    height: 44,
    width: 326,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    borderRadius: 10,
    paddingLeft: 45,
    color: colors.inputTxtGray,
    fontFamily: family.product_sans_regular,
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
  startInputWrapper: {
    alignSelf: 'center',
  },
  favLocation: {
    fontSize: 14,
    lineHeight: 24,
    marginLeft: 25,
    color: colors.txtBlack,
    marginTop: 26,
    fontFamily: family.product_sans_regular,
  },
  favLocationBtn: {
    height: 32,
    paddingHorizontal: 20,
    backgroundColor: colors.btnGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  faveBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginLeft: 25,
    marginTop: 20,
  },
  favLocationBtnTxt: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.white,
    fontFamily: family.product_sans_regular,
  },
  bookSeatsTxt: {
    fontSize: 14,
    lineHeight: 24,
    //marginTop: 27,
    //marginLeft: 28,
    fontFamily: family.product_sans_regular,
  },
  seat: {
    height: 31,
    width: 24,
    marginRight: 20,
  },
  seatsWrapper: {
    flexDirection: 'row',
    marginLeft: 27,
    marginTop: 25,
  },
  nextBtnContainer: {
    height: 56,
    backgroundColor: colors.btnGray,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 15,
    alignSelf: 'center',
  },
  nextTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
    fontFamily: family.product_sans_bold,
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
    fontFamily: family.product_sans_regular,
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
    fontFamily: family.product_sans_regular,
    justifyContent: 'center',
  },
  calendarIcon: {
    height: 18,
    width: 18,
    position: 'absolute',
    right: 22,
    top: 11,
  },
  selectionInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  locationMainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  returntimeTxt: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.txtBlack,
    marginTop: 20,
    fontFamily: family.product_sans_regular,
  },
  bookWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '75%',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginStart: 30,
  },
  dateTxt: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.g1,
    fontFamily: fonts.regular,
  },
  googleInput: {
    container: {
      flex: 0,
      width: 326,
    },
    textInput: {
      height: 44,
      borderWidth: 1,
      borderColor: colors.greyBorder,
      borderRadius: 10,
      paddingLeft: 45,
      fontSize: 13,
      color: colors.inputTxtGray,
      fontFamily: fonts.regular,
    },
  },
});

export default AddressCards;

const getModalName = modalName => {
  if (modalName === 'startLocation') {
    return I18n.t('start_location');
  }

  if (modalName === 'returnTrip') {
    return I18n.t('return_trip');
  }

  return I18n.t('destination');
};

const handleBackgroundColor = (
  currentAddress,
  availableSeats,
  time,
  dateTimeStamp,
  modalName,
  currentReturnStart,
  currentReturnDestination,
  returnTime,
) => {
  if (modalName === 'startLocation' && (!currentAddress || !availableSeats)) {
    return colors.btnGray;
  }

  if (
    modalName === 'destination' &&
    (!currentAddress || !time || !dateTimeStamp)
  ) {
    return colors.btnGray;
  }

  if (
    modalName === 'returnTrip' &&
    (!currentReturnStart || !currentReturnDestination || !returnTime)
  ) {
    return colors.btnGray;
  }

  return colors.green;
};

const handleDisable = (
  currentAddress,
  availableSeats,
  time,
  dateTimeStamp,
  modalName,
  currentReturnStart,
  currentReturnDestination,
  returnTime,
) => {
  if (modalName === 'startLocation' && currentAddress && availableSeats) {
    return false;
  }

  if (modalName === 'destination' && currentAddress && time && dateTimeStamp) {
    return false;
  }

  if (
    modalName === 'returnTrip' &&
    currentReturnStart &&
    currentReturnDestination &&
    returnTime
  ) {
    return false;
  }
  return true;
};

const handleLocationDisable = (modalName, origin, destination) => {
  if (modalName === 'startLocation' && !origin) {
    return true;
  }

  if (modalName === 'destination' && !destination) {
    return true;
  }

  if (modalName === 'returnTrip') {
    return true;
  }

  return false;
};
