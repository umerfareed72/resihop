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

const DRecurringDetail = ({route}) => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  const favourteLocationRef = useRef(null);
  const {origin, availableSeats, time, recurring_dates} = useSelector(
    state => state.map,
  );
  const {drive} = route?.params;
  const [destination, setDestination] = useState('');
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [favPress, setFavPress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const destinationMap = useSelector(state => state.map.destination);

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
    dispatch(
      setMapDestination({
        location: {
          lat: drive?.destinationLocation?.latitude,
          lng: drive?.destinationLocation?.longitude,
        },
        description: drive?.destDes,
      }),
    );
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

        availableSeats: availableSeats,
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
              ),
            },
          ]}
          disabled={
            origin === null || destination === null || availableSeats === null
          }
          onPress={() => {
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

const handleColor = (origin, destinationMap, availableSeats, cost) => {
  if (!origin || !availableSeats || !destinationMap || !cost) {
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
