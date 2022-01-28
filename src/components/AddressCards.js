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
import {useNavigation} from '@react-navigation/core';
import CalendarSheet from '../screens/CalendarSheet';
import I18n from '../utilities/translations';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  setOrigin,
  setMapDestination,
  setAvailableSeats,
  setTime,
} from '../redux/actions/map.actions';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {fonts} from '../theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AddressCards = ({modalName, addfavrouiteAddressRef, onPress, mode}) => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  const calenderSheetRef = useRef(null);
  const googleAutoComplete = useRef();

  const [destination, setDestination] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [noLaterTime, setNoLaterTime] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');

  const availableSeats = useSelector(state => state.map.availableSeats);
  const dateTimeStamp = useSelector(state => state.map.dateTimeStamp);
  const time = useSelector(state => state.map.time);
  const origin = useSelector(state => state.map.origin);
  const destinationMap = useSelector(state => state.map.destination);

  const showTimePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    dispatch(setTime(moment(date).format('hh:mm a')));
    hideTimePicker();
  };

  useEffect(() => {
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
  }, []);

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
                    <TextInput
                      placeholder={I18n.t('start_location')}
                      placeholderTextColor={colors.inputTxtGray}
                      value={startLocation}
                      onChangeText={setStartLocation}
                      style={styles.txtInput}
                    />
                    <View style={styles.startDot} />
                  </View>
                  <View>
                    <TextInput
                      placeholder={I18n.t('destination')}
                      placeholderTextColor={colors.inputTxtGray}
                      value={destination}
                      onChangeText={setDestination}
                      style={styles.txtInput}
                    />
                    <View style={styles.destSquare} />
                  </View>
                </View>
              </View>
            ) : (
              <>
                <GooglePlacesAutocomplete
                  ref={googleAutoComplete}
                  placeholder={I18n.t('address_placeholder')}
                  onPress={(data, details = null) => {
                    if (modalName === 'startLocation') {
                      dispatch(
                        setOrigin({
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
                    }
                  }}
                  query={{
                    key: 'AIzaSyBGAcF8ef7sdugk0h9us-J12pidnXqgmmQ',
                    language: 'en',
                  }}
                  debounce={400}
                  fetchDetails={true}
                  nearbyPlacesAPI="GooglePlacesSearch"
                  enablePoweredByContainer={false}
                  returnKeyType={'search'}
                  minLength={2}
                  styles={{
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
                  }}
                  textInputProps={{
                    onChangeText: setCurrentAddress,
                  }}
                />
                {/* <TextInput
                  placeholder={I18n.t('address_placeholder')}
                  placeholderTextColor={colors.inputTxtGray}
                  value={startLocation}
                  onChangeText={setStartLocation}
                  style={styles.txtInput}
                /> */}
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
            <TouchableOpacity style={styles.favLocationBtn}>
              <Text style={styles.favLocationBtnTxt}>{I18n.t('home')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.favLocationBtn}>
              <Text style={styles.favLocationBtnTxt}>{I18n.t('office')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.favLocationBtn}
              onPress={() => addfavrouiteAddressRef.current.open()}>
              <Text style={styles.favLocationBtnTxt}>{I18n.t('other')}</Text>
            </TouchableOpacity>
          </View>
          {modalName === 'startLocation' ? (
            <>
              <View style={styles.bookWrapper}>
                <Text style={styles.bookSeatsTxt}>
                  {mode === 'driver' ? ' Available Seats' : 'Book Your Seats'}
                </Text>
                <Text>{availableSeats}</Text>
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
                <TextInput
                  placeholder="XX:XX"
                  placeholderTextColor={colors.btnGray}
                  value={noLaterTime}
                  onChangeText={setNoLaterTime}
                  style={styles.noLater}
                />
                <Text>{I18n.t('to')}</Text>
                <TextInput
                  placeholder="XX:XX"
                  placeholderTextColor={colors.btnGray}
                  value={noLaterTime}
                  onChangeText={setNoLaterTime}
                  style={styles.noLater}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.selectWrapper}>
                <Text style={[styles.selectTxt, {marginRight: 23}]}>
                  {I18n.t('need_to_arrive')}
                </Text>
                <Text style={styles.selectTxt}>{I18n.t('select_date')}</Text>
              </View>
              <View style={styles.selectionInputWrapper}>
                <TouchableOpacity
                  onPress={() => showTimePicker()}
                  style={[styles.noLater, {justifyContent: 'center'}]}>
                  <Text>{time ? time : `XX:XX`}</Text>
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
            )}
            onPress={() => navigation.goBack()}>
            <Text style={styles.nextTxt}>{I18n.t('next')}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <CalendarSheet calendarSheetRef={calenderSheetRef} />
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
    width: '70%',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginStart: 30,
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

  return colors.green;
};

const handleDisable = (
  currentAddress,
  availableSeats,
  time,
  dateTimeStamp,
  modalName,
) => {
  if (modalName === 'startLocation' && currentAddress && availableSeats) {
    return false;
  }

  if (modalName === 'destination' && currentAddress && time && dateTimeStamp) {
    return false;
  }

  return true;
};
