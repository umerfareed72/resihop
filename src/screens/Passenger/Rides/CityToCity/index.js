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
import {colors, appIcons, appImages, family, size} from '../../../../utilities';
import {useNavigation} from '@react-navigation/core';
import HeartIcon from 'react-native-vector-icons/EvilIcons';
import HeartFilled from 'react-native-vector-icons/Foundation';
import ToggleSwitch from 'toggle-switch-react-native';
import FavouriteLocations from '../../../FavouriteLocations';
import {
  CustomHeader,
  Loader,
  CalendarSheet,
  ReturnCalendarSheet,
} from '../../../../components';
import I18n from '../../../../utilities/translations';
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
  setReturnDateTimeStamp,
} from '../../../../redux/actions/map.actions';
import moment from 'moment';
import styles from './styles';
const index = () => {
  let navigation = useNavigation();
  const favourteLocationRef = useRef(null);
  const calendarSheetRef = useRef(null);
  const returnCalendarSheetRef = useRef(null);
  let dispatch = useDispatch();

  const origin = useSelector(state => state.map.origin);
  const destinationMap = useSelector(state => state.map.destination);
  const availableSeats = useSelector(state => state.map.availableSeats);
  const dateTimeStamp = useSelector(state => state.map.dateTimeStamp);
  const returnDateTimeStamp = useSelector(
    state => state.map.returnDateTimeStamp,
  );
  const time = useSelector(state => state.map.time);
  const returnTime = useSelector(state => state.map);
  const returnOrigin = useSelector(state => state.map.returnOrigin);
  const returnDestinationMap = useSelector(
    state => state.map.returnDestination,
  );
  const [favPress, setFavPress] = useState('');
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(setTime(moment().format('HH:mm')));
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
      dispatch(setReturnDateTimeStamp(null));
    };
  }, []);

  const handleCreateRide = () => {
    let stamp = moment(
      `${moment(new Date()).format('YYYY-MM-DD')}T${time}`,
    ).valueOf();
    if (dateTimeStamp) {
      stamp = moment(`${dateTimeStamp}T${time}`).valueOf();
    }
    const body = {
      startLocation: [origin.location.lat, origin.location.lng],
      destinationLocation: [
        destinationMap.location.lat,
        destinationMap.location.lng,
      ],
      date: stamp,
      requiredSeats: availableSeats,
      startDes: origin.description,
      destDes: destinationMap.description,
      interCity: true,
    };
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
    let stamp = moment(
      `${moment(new Date()).format('YYYY-MM-DD')}T${
        returnTime?.returnFirstTime == 'Invalid date'
          ? moment(new Date()).format('hh:mm')
          : returnTime?.returnFirstTime
      }`,
    ).valueOf();
    if (returnDateTimeStamp) {
      stamp = moment(
        `${returnDateTimeStamp}T${
          returnTime?.returnFirstTime == 'Invalid date'
            ? moment(new Date()).format('hh:mm')
            : returnTime?.returnFirstTime
        }`,
      ).valueOf();
    }
    const body = {
      startLocation: [returnOrigin.location.lat, returnOrigin.location.lng],
      destinationLocation: [
        returnDestinationMap.location.lat,
        returnDestinationMap.location.lng,
      ],
      date: stamp,
      requiredSeats: availableSeats,
      startDes: returnOrigin.description,
      destDes: returnDestinationMap.description,
      interCity: true,
    };

    dispatch(
      CreateRideRequest(body, setIsLoading, null, response => {
        console.log('Return Create Ride', response);
      }),
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={I18n.t('city_to_city')}
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
              navigation?.navigate('RecurringRides');
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
          <Text style={styles.selectTxt}>{I18n.t('select_date')}</Text>
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
                : moment(new Date()).format('DD MMM')}{' '}
            </Text>
          </TouchableOpacity>
          <Image
            source={appImages.calendar}
            resizeMode="contain"
            style={styles.calendarIcon}
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
        <CalendarSheet calendarSheetRef={calendarSheetRef} />
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
            <View style={styles.selectWrapper}>
              <Text style={styles.selectTxt}>{I18n.t('select_date')}</Text>
            </View>
            <View style={{marginVertical: 20}}>
              <TouchableOpacity
                onPress={() => returnCalendarSheetRef.current.open()}
                style={[
                  styles.noLater,
                  {justifyContent: 'center', width: '90%', alignSelf: 'center'},
                ]}>
                <Text style={styles.dateTxt}>
                  {returnDateTimeStamp !== null
                    ? moment(returnDateTimeStamp).format('DD MMM')
                    : moment(new Date()).format('DD MMM')}
                </Text>
              </TouchableOpacity>
              <Image
                source={appImages.calendar}
                resizeMode="contain"
                style={[styles.calendarIcon, {right: 30}]}
              />
            </View>
            <ReturnCalendarSheet
              mindate={dateTimeStamp || new Date()}
              calendarSheetRef={returnCalendarSheetRef}
              date={returnDateTimeStamp || new Date()}
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
          disabled={handleDisable(
            origin,
            destinationMap,
            availableSeats,
            dateTimeStamp,
            time,
          )}
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
