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
  header,
} from '../../../utilities';
import HamburgerMenu from 'react-native-vector-icons/Entypo';
import Bell from 'react-native-vector-icons/FontAwesome';
import MyStatusBar from '../../../components/Header/statusBar';
import {
  BlankTrip,
  CancelRideModal,
  Loader,
  RideFilterModal,
  SortModal,
} from '../../../components';
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
  setAvailableSeats,
  MyRidesFiltering,
  MyDrivesFiltering,
} from '../../../redux/actions/map.actions';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProfileInfo,
  getUserInfo,
  updateInfo,
} from '../../../redux/actions/auth.action';
import {useIsFocused} from '@react-navigation/core';
import mapTypes from '../../../redux/types/map.types';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {checkAppPermission} from '../../../utilities/helpers/permissions';
import {post} from '../../../services';
import {DRIVE_CONST} from '../../../utilities/routes';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Call_Status} from '../../../redux/actions/app.action';

//Data

var RideStatusList = {
  id: 1,
  title: 'Ride Status',
  items: [
    {id: 1, text: 'Confirmed', status: false, value: 'CONFIRMED'},
    {
      id: 2,
      text: 'Waiting For Match',
      status: false,
      value: 'WAITING_FOR_MATCH',
    },
    {id: 3, text: 'Matching Done', status: false, value: 'MATCHING_DONE'},
    {id: 4, text: 'On The Way', status: false, value: 'ON_THE_WAY'},
  ],
};

const rideTypeList = {
  id: 4,
  title: 'Ride Type',
  items: [
    {id: 1, text: 'All Rides', value: null},
    {id: 2, text: 'Destination Rides', value: 'destination'},
    {id: 3, text: 'Return Rides', value: 'return'},
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
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const isFocus = useIsFocused();
  const [multiDelete, setmultiDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const {availableSeats} = useSelector(state => state.map);

  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        // console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        let notificationObj = notification.data.data;
        if (notificationObj) {
          notificationObj = JSON.parse(notificationObj);
          if (notification?.notification?.title == 'Agora Call') {
            dispatch(
              getUserInfo(notificationObj, res => {
                navigation?.navigate('IncomingCall');
              }),
            );
          }
          if (notification?.notification?.title == 'Agora Call Accept') {
            dispatch(Call_Status('answered', () => {}));
          }
          if (notification?.notification?.title == 'Agora Call Reject') {
            dispatch(
              Call_Status('deny', () => {
                navigation?.goBack();
              }),
            );
          }
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios' ? true : false,
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
    });
  }, []);

  //Get Data
  useEffect(() => {
    if (isFocus) {
      getDrives();
      getUserdata();
      dispatch(get_settings());
    }
    return () => {
      dispatch(setAvailableSeats(0));
    };
  }, [isFocus]);

  const getDrives = async () => {
    dispatch(
      MyRidesSortOrder('drives?', 'date', res => {
        dispatch({
          type: mapTypes.myDrives,
          payload: res,
        });
      }),
    );
  };
  // Get Location
  const getLocation = async route => {
    setisLoading(true);
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
              setisLoading(false);

              navigation.navigate(route);
            })
            .catch(error => {
              setisLoading(false);
              console.warn(error);
            });
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          setisLoading(false);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      setisLoading(false);
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

  const selectdDate = val => {
    setdate(val);
  };
  const resetFilter = () => {
    setRideType('');
    dispatch(setAvailableSeats(0));
    setStatus('');
  };

  const onApplyFilter = () => {
    dispatch(
      MyDrivesFiltering(
        'drives?',
        ridetype?.value,
        availableSeats,
        status?.value,
        res => {
          console.log(res);
          filterModalRef.current.close();
          sortModalRef.current.close();
          dispatch({
            type: mapTypes.myDrives,
            payload: res,
          });
        },
      ),
    );
  };

  const onPress = item => {
    dispatch(setIDToUpdateDrive(item));

    if (item?.status === 'COMPLETED') {
      navigation?.navigate('AddFavourites');
    } else {
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
    }
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
      MyRidesSortOrder('drives?', item?.value, res => {
        dispatch({
          type: mapTypes.myDrives,
          payload: res,
        });
      }),
    );
  };
  const onPressCancel = async () => {
    try {
      setisLoading(true);

      let uniqueItems = [...new Set(selectedCard)];
      const requestBody = {
        drives: uniqueItems,
      };
      const res = await post(
        `${DRIVE_CONST}/cancel`,
        requestBody,
        await header(),
      );
      if (res.data) {
        setisLoading(false);
        console.log(res.data);
        Alert.alert('Success', 'Rides deleted successfully', [
          {
            text: 'OK',
            onPress: () => {
              setmultiDelete(false);
              setSelectedCard([]);
              getDrives();
            },
          },
        ]);
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
      Alert.alert('Failed', 'Unable to delete rides', [
        {
          text: 'OK',
          onPress: () => {
            setmultiDelete(false);
            setSelectedCard([]);
          },
        },
      ]);
    }
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
                <UpcomingRideCards
                  multiDelete={multiDelete}
                  onPress={() => {
                    if (multiDelete) {
                      setSelectedCard(item?.id);
                    } else {
                      onPress(item);
                    }
                  }}
                  selectedCard={selectedCard}
                  setSelectedCard={item => {
                    setmultiDelete(true);
                    setSelectedCard(item);
                  }}
                  item={item}
                />
              )}
            />
          </>
        )}
      </SafeAreaView>
      <RideFilterModal
        seats={seats}
        rideType={rideTypeList}
        status={RideStatusList}
        onPressdate={selectdDate}
        onPressrideType={selectRideType}
        onPressseats={item => dispatch(setAvailableSeats(item))}
        onPresstime={selectTime}
        onPressstatus={selectRideStatus}
        show={filterModalRef}
        selectedStatus={status}
        selectedRideType={ridetype}
        selectedSeats={availableSeats}
        onPressReset={resetFilter}
        onApply={() => {
          onApplyFilter();
        }}
      />
      <SortModal show={sortModalRef} onPress={getDrivesByOrder} />
      {multiDelete && (
        <CancelRideModal
          onPressCancel={() => {
            onPressCancel();
          }}
          onPressClose={() => {
            setmultiDelete(false);
            setSelectedCard([]);
          }}
          show={multiDelete}
        />
      )}
      {isLoading && <Loader />}
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
