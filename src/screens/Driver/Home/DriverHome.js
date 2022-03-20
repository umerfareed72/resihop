import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  FlatList,
  Linking,
  Alert,
} from 'react-native';
import {
  colors,
  appIcons,
  appImages,
  family,
  requestPermission,
} from '../../../utilities';
import HamburgerMenu from 'react-native-vector-icons/Entypo';
import Bell from 'react-native-vector-icons/FontAwesome';
import MyStatusBar from '../../../components/Header/statusBar';
import {BlankTrip, RideFilterModal, SortModal} from '../../../components';
import I18n from '../../../utilities/translations';
import UpcomingRideCards from '../../../components/UpcomingRideCards';
import {fonts} from '../../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MyDrives,
  setIDToUpdateDrive,
  setOrigin,
  setMapDestination,
  SearchDrives,
  SearchRides,
  MyRidesSortOrder,
  setReturnMapDestination,
  get_settings,
  setCity,
} from '../../../redux/actions/map.actions';
import {useDispatch, useSelector} from 'react-redux';
import {getProfileInfo, updateInfo} from '../../../redux/actions/auth.action';
import {useIsFocused} from '@react-navigation/core';
import mapTypes from '../../../redux/types/map.types';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {checkAppPermission} from '../../../utilities/helpers/permissions';

//Data
var TimeList = {
  id: 1,
  title: I18n.t('time'),
  items: [
    {id: 1, text: '08:00 to 12:00', status: false},
    {id: 2, text: '08:00 to 12:00', status: false},
    {id: 3, text: '08:00 to 12:00', status: false},
  ],
};

var RideStatusList = {
  id: 1,
  title: I18n.t('ride_status'),
  items: [
    {id: 1, text: 'Confirmed', status: false},
    {id: 2, text: 'Waiting for Match', status: false},
    {id: 3, text: 'Matching Done', status: false},
  ],
};

const rideTypeList = {
  id: 4,
  title: I18n.t('ride_type'),
  items: [
    {id: 1, text: 'All Rides'},
    {id: 2, text: 'Destination Rides'},
    {id: 3, text: 'Return Rides'},
  ],
};

const DateList = {
  id: 1,
  title: I18n.t('date'),
  items: [
    {id: 1, text: '12 June'},
    {id: 2, text: '13 June'},
    {id: 3, text: '14 June'},
    {id: 4, text: '15 June'},
    {id: 5, text: '16 June'},
  ],
};

const seatsList = {
  id: 5,
  title: I18n.t('seat'),
  items: [
    {id: 1, icon: appImages.seatBlue},
    {id: 2, icon: appImages.seatBlue},
    {id: 3, icon: appImages.seatBlue},
    {id: 4, icon: appImages.seatBlue},
    {id: 5, icon: appImages.seatBlue},
    {id: 6, icon: appImages.seatBlue},
  ],
};

const DriverHome = ({navigation}) => {
  const filterModalRef = useRef(null);
  const sortModalRef = useRef(null);
  let dispatch = useDispatch();
  const userId = useSelector(state => state.auth?.userdata?.user?.id);

  const myDrives = useSelector(state => state.map.myDrivesData);

  //States
  const [time, settime] = useState('');
  const [date, setdate] = useState('');
  const [ridetype, setRideType] = useState('');
  const [status, setStatus] = useState('');
  const [seats, setSeats] = useState('');
  const isFocus = useIsFocused();
  //Get Data
  useEffect(() => {
    if (isFocus) {
      dispatch(
        MyRidesSortOrder('drives', 'tripDate', res => {
          dispatch({
            type: mapTypes.myDrives,
            payload: res,
          });
        }),
      );
      getUserdata();
      dispatch(get_settings());
    }
  }, [isFocus]);

  // Get Location
  const getLocation = async route => {
    const permission = await checkAppPermission('location');
    if (permission) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position?.coords;
          Geocoder.from(latitude, longitude)
            .then(json => {
              var addressComponent = json.results[0]?.formatted_address;
              dispatch(
                setOrigin({
                  location: {lat: latitude, lng: longitude},
                  description: addressComponent,
                }),
              );
              dispatch(
                setReturnMapDestination({
                  location: {lat: latitude, lng: longitude},
                  description: addressComponent,
                }),
              );
              navigation.navigate(route);
            })
            .catch(error => console.warn(error));
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      Alert.alert('Error', 'Location Permission Denied', [
        {
          onPress: () => {
            Linking.openURL('app-settings:');
          },
        },
      ]);
    }
  };

  //Save Notification
  useEffect(() => {
    AsyncStorage.getItem('fcmToken').then(token => {
      if (requestPermission() != null) {
        const requestBody = {
          fireAppToken: token,
        };
        dispatch(
          updateInfo(userId, requestBody, res => {
            console.log('Notification Token saved');
          }),
          error => {
            console.log('Unable to save Token', error);
          },
        );
      }
    });
  }, []);

  const selectTime = val => {
    settime(val);
  };
  const selectRideStatus = val => {
    setStatus(val);
  };
  const selectRideType = val => {
    setRideType(val);
  };
  const selectSeats = val => {
    setSeats(val);
  };
  const selectdDate = val => {
    setdate(val);
  };
  const resetFilter = () => {
    settime('');
    setdate('');
    setRideType('');
    setSeats('');
    setStatus('');
  };

  const ridesData = [
    {
      id: 1,
      date: '12 June, 08:00',
      status: 'Fully Booked',
      seats: [1],
    },
    {
      id: 2,
      date: '12 June, 08:00',
      status: 'Partially Booked',
      seats: [1, 2],
    },
    {
      id: 3,
      date: '12 June, 08:00',
      status: 'Waiting for Match',
      seats: [1, 2],
    },
  ];
  const onPress = item => {
    dispatch(setIDToUpdateDrive(item));
    navigation.navigate('DriveStatus', {
      status: item.status,
      startLocation: item.startLocation,
      destinationLocation: item.destinationLocation,
      startDes: item.startDes,
      destDes: item.destDes,
      id: item._id,
      cost: item?.costPerSeat,
      availableSeats: item?.availableSeats,
      drive_date: item?.date,
      bookedSeats: item?.bookedSeats,
    });
  };
  const getUserdata = async () => {
    dispatch(
      getProfileInfo(
        userId,
        () => {
          console.log('Get Profile Info Success!');
        },
        res => {
          console.log('Get Profile Info Error', res);
        },
      ),
    );
  };
  const getDrivesByOrder = item => {
    dispatch(
      MyRidesSortOrder('drives', item?.value, res => {
        dispatch({
          type: mapTypes.myDrives,
          payload: res,
        });
      }),
    );
  };
  return (
    <>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <SafeAreaView style={styles.container}>
        {/* Top Header */}
        <View style={styles.passengerHeader}>
          <TouchableOpacity>
            <HamburgerMenu
              name="menu"
              size={26}
              color={colors.green}
              onPress={() => navigation.toggleDrawer()}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 16}}>{I18n.t('driver_home')}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NotificationList');
            }}>
            <Bell name="bell" size={24} color={colors.green} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(setOrigin(null));
              dispatch(setMapDestination(null));
              dispatch(SearchDrives(null));
              dispatch(SearchRides(null));
              navigation?.replace('PassengerDashboard');
            }}
            style={styles.switchToDriverBtnContainer}>
            <Text
              style={{
                fontSize: 13,
                color: colors.white,
                fontFamily: fonts.regular,
              }}>
              {I18n.t('switch_passenger')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cards */}

        <View style={styles.cardMainContainer}>
          <TouchableOpacity
            onPress={() => {
              dispatch(setCity(false));
              getLocation('CreateDrive');
              AsyncStorage.setItem('city', 'no');
            }}
            style={styles.cardContainer}>
            <Image source={appIcons.driver_brick_bg} style={styles.homeCards} />
            <View style={styles.interiorContainer}>
              <Image
                source={appImages.green_car}
                style={styles.cardInterior}
                resizeMode="contain"
              />
              <Text style={[styles.cardTxt, {marginTop: 14}]}>
                {I18n.t('create_drive')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => {
              navigation?.navigate('DRecurringRides');
            }}>
            <Image source={appIcons.driver_brick_bg} style={styles.homeCards} />
            <View style={styles.interiorContainer}>
              <Image
                source={appImages.blue_car}
                style={styles.cardInterior}
                resizeMode="contain"
              />
              <Text style={styles.cardTxt}>{I18n.t('recurring_drives')}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.cardContainer}>
            <Image source={appIcons.driver_brick_bg} style={styles.homeCards} />
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.setItem('city', 'yes');
                dispatch(setCity(true));
                navigation?.navigate('DriverCityToCity');
              }}
              style={styles.interiorContainer}>
              <Image
                source={appImages.city}
                style={styles.cardInterior}
                resizeMode="contain"
              />
              <Text style={styles.cardTxt}>
                {I18n.t('city_to_city_drives')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* upcoming Rides */}

        <View style={styles.upcomingRidesMainContainer}>
          <Text style={styles.upcomingTxt}>{I18n.t('upcomingDrives')} </Text>
          <View style={styles.ellipsesContainer}>
            <TouchableOpacity
              onPress={() => {
                sortModalRef.current.open();
              }}>
              <Image source={appIcons.mobiledata} style={styles.ellipses} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                filterModalRef.current.open();
              }}>
              <Image source={appIcons.filter} style={styles.ellipses} />
            </TouchableOpacity>
          </View>
        </View>
        {myDrives === null || myDrives?.length === 0 ? (
          <BlankTrip
            icon={appIcons.driver_home}
            text={I18n.t('create_first_drive')}
            onPress={() => getLocation('CreateDrive')}
            role={'driver'}
          />
        ) : (
          <>
            <FlatList
              data={myDrives}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <UpcomingRideCards item={item} onPress={() => onPress(item)} />
              )}
            />
            <TouchableOpacity
              style={styles.createRideBtnContainer}
              onPress={() => getLocation('CreateDrive')}>
              <Text style={styles.btnTxt}>{'Create your Drive'}</Text>
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
      <RideFilterModal
        time={TimeList}
        seats={seatsList}
        rideType={rideTypeList}
        status={RideStatusList}
        date={DateList}
        onPressdate={selectdDate}
        onPressrideType={selectRideType}
        onPressseats={selectSeats}
        onPresstime={selectTime}
        onPressstatus={selectRideStatus}
        show={filterModalRef}
        selectedTime={time}
        selectedDate={date}
        selectedStatus={status}
        selectedRideType={ridetype}
        selectedSeats={seats}
        onPressReset={resetFilter}
        onApply={() => {
          filterModalRef.current.close();
          sortModalRef.current.close();
        }}
      />
      <SortModal show={sortModalRef} onPress={getDrivesByOrder} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  switchToDriverBtnContainer: {
    backgroundColor: colors.green,
    paddingHorizontal: 12,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  passengerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  homeCards: {
    width: 100,
    height: 106,
  },
  cardInterior: {
    height: 50,
    width: 50,
  },
  interiorContainer: {
    position: 'absolute',
    width: 100,
    alignItems: 'center',
  },
  cardContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  cardTxt: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 16,
    marginTop: 8,
    fontFamily: fonts.regular,
  },
  cardMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
  ellipses: {
    height: 25,
    width: 25,
    borderRadius: 25,
    marginRight: 5,
  },
  upcomingRidesMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    alignItems: 'center',
  },
  ellipsesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upcomingTxt: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: fonts.regular,
    color: colors.txtBlack,
  },
  noUpcomingRide: {
    width: 305,
    height: 278,
    alignSelf: 'center',
    marginTop: 30,
    resizeMode: 'contain',
  },
  Txt: {
    textAlign: 'justify',
    alignSelf: 'center',
    maxWidth: 300,
    marginTop: 10,
  },
  createRideBtnContainer: {
    height: 56,
    width: '80%',
    backgroundColor: colors.green,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: colors.dropShadow,
    shadowOpacity: 1,
    alignSelf: 'center',
    marginVertical: 20,
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
    fontFamily: family.product_sans_bold,
  },
});

export default DriverHome;
