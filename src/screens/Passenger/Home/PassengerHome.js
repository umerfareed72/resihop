import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
} from 'react-native';
import {
  colors,
  appIcons,
  family,
  requestPermission,
  header,
} from '../../../utilities';
import HamburgerMenu from 'react-native-vector-icons/Entypo';
import Bell from 'react-native-vector-icons/FontAwesome';
import MyStatusBar from '../../../components/Header/statusBar';
import {
  BlankTrip,
  RideFilterModal,
  SortModal,
  CancelRideModal,
  Loader,
  UpcomingRideCards,
} from '../../../components';
import {fonts} from '../../../theme';
import I18n from '../../../utilities/translations';

import {
  setOrigin,
  setMapDestination,
  SearchDrives,
  SearchRides,
  MyRides,
  MyRidesSortOrder,
  setReturnMapDestination,
  get_settings,
  setCity,
  setAvailableSeats,
  MyRidesFiltering,
} from '../../../redux/actions/map.actions';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  getProfileInfo,
  getUserInfo,
  SwitchDrive,
  updateInfo,
} from '../../../redux/actions/auth.action';
import mapTypes from '../../../redux/types/map.types';
import {move_from_drawer} from '../../../redux/actions/payment.action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {checkAppPermission} from '../../../utilities/helpers/permissions';
import {Alert} from 'react-native';
import {post} from '../../../services';
import {RIDES_CONST} from '../../../utilities/routes';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Call_Status} from '../../../redux/actions/app.action';

//Data

const PassengerHome = ({navigation}) => {
  let dispatch = useDispatch();
  let isFocused = useIsFocused();
  const filterModalRef = useRef(null);
  const sortModalRef = useRef(null);
  //States
  const [ridetype, setRideType] = useState('');
  const [status, setStatus] = useState('');
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [selectedCard, setSelectedCard] = useState([]);
  const auth = useSelector(state => state.auth);
  const {myRidesData, availableSeats} = useSelector(state => state.map);
  const userId = useSelector(state => state.auth?.userdata?.user?.id);
  const [multiDelete, setmultiDelete] = useState(false);
  const [isLoading, setisLoading] = useState(false);

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

  useEffect(() => {
    if (isFocused) {
      getRides();
      getUserdata();
      dispatch(move_from_drawer(true, () => {}));
      dispatch(get_settings());
    }
    return () => {
      dispatch(setAvailableSeats(0));
    };
  }, [isFocused]);
  const getRides = async () => {
    dispatch(
      MyRidesSortOrder('rides?', 'tripDate', res => {
        dispatch({
          type: mapTypes.myRides,
          payload: res,
        });
      }),
    );
  };
  // Get Location
  const getLocation = async route => {
    setisLoading(true);
    dispatch(setCity(false));
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
              navigation?.navigate(route);
            })
            .catch(error => {
              setisLoading(false);
              console.warn(error);
            });
        },
        error => {
          setisLoading(false);
          // See error code charts below.
          console.log(error.code, error.message);
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

  const selectRideStatus = val => {
    setStatus(val);
  };

  const selectRideType = val => {
    setRideType(val);
  };

  const resetFilter = () => {
    settime('');
    setdate('');
    setRideType('');
    dispatch(setAvailableSeats(0));
    setStatus('');
  };
  const onApplyFilter = () => {
    dispatch(
      MyRidesFiltering(
        'rides?',
        ridetype?.value,
        availableSeats,
        status?.value,
        res => {
          console.log(res);
          filterModalRef.current.close();
          sortModalRef.current.close();
          dispatch({
            type: mapTypes.myRides,
            payload: res,
          });
        },
      ),
    );
  };

  const onPress = item => {
    if (item?.status === 'DISPUTED') {
    } else if (item?.status === 'COMPLETED' && item?.rated_drive) {
    } else {
      navigation.navigate('RideStatus', {item: item});
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

  const getRidesByOrder = item => {
    dispatch(
      MyRidesSortOrder('rides?', item?.value, res => {
        dispatch({
          type: mapTypes.myRides,
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
        rides: uniqueItems,
      };
      const res = await post(
        `${RIDES_CONST}/cancel`,
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
              getRides();
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
          <Text style={styles.passengerHomeTxt}>
            {I18n.t('passenger_home')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NotificationList');
            }}>
            <Bell name="bell" size={24} color={colors.green} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (auth?.profile_info?.type == 'PASSENGER') {
                dispatch(setOrigin(null));
                dispatch(setMapDestination(null));
                dispatch(SearchDrives(null));
                dispatch(SearchRides(null));
                if (auth?.profile_info.vehicle) {
                  navigation?.replace('DriverDashboard');
                } else {
                  const body = {
                    switching: true,
                  };
                  dispatch(
                    SwitchDrive(body, () => {
                      navigation?.navigate('VehicleStack');
                    }),
                  );
                }
              } else {
                navigation?.replace('DriverDashboard');
              }
            }}
            style={styles.switchToDriverBtnContainer}>
            <Text
              style={{
                fontSize: 13,
                color: colors.white,
                fontFamily: fonts.regular,
              }}>
              {I18n.t('switch_driver')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cards */}

        <View style={styles.cardMainContainer}>
          <TouchableOpacity
            onPress={() => {
              getLocation('CreateRide');
            }}
            style={styles.cardContainer}>
            <Image source={appIcons.homeIconBg} style={styles.homeCards} />
            <View style={styles.interiorContainer}>
              <Image
                source={appIcons.createRide}
                style={styles.cardInterior}
                resizeMode="contain"
              />
              <Text style={[styles.cardTxt, {marginTop: 14}]}>
                {I18n.t('create_ride')}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('RecurringRides')}
            activeOpacity={0.8}
            style={styles.cardContainer}>
            <View style={styles.cardContainer}>
              <Image source={appIcons.homeIconBg} style={styles.homeCards} />
              <View style={styles.interiorContainer}>
                <Image
                  source={appIcons.recurringRide}
                  style={styles.cardInterior}
                  resizeMode="contain"
                />
                <Text style={styles.cardTxt}>{I18n.t('recurring_ride')}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              onPress={() => {
                dispatch(setCity(true));
                navigation?.navigate('CityToCity');
              }}
              style={styles.cardContainer}>
              <Image source={appIcons.homeIconBg} style={styles.homeCards} />
              <View style={styles.interiorContainer}>
                <Image
                  source={appIcons.cityRide}
                  style={styles.cardInterior}
                  resizeMode="contain"
                />
                <Text style={styles.cardTxt}>{I18n.t('city_to_city')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* upcoming Rides */}

        <View style={styles.upcomingRidesMainContainer}>
          <Text style={styles.upcomingTxt}>{I18n.t('upcoming_rides')} </Text>
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

        {myRidesData === null || myRidesData.length === 0 ? (
          <BlankTrip
            icon={appIcons.noUpcomingRide}
            role={'passenger'}
            onPress={() => {
              getLocation('CreateRide');
            }}
            text={I18n.t('first_ride')}
          />
        ) : (
          <>
            <FlatList
              data={myRidesData}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <UpcomingRideCards
                  multiDelete={multiDelete}
                  item={item}
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
                />
              )}
            />
          </>
        )}
      </SafeAreaView>
      <RideFilterModal
        seats={seats}
        onPressrideType={selectRideType}
        onPressseats={item => dispatch(setAvailableSeats(item))}
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
      <SortModal show={sortModalRef} onPress={getRidesByOrder} />
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
    width: '80%',
  },
  cardMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
  ellipses: {
    height: 30,
    width: 30,
    borderRadius: 25,
    marginRight: 10,
    resizeMode: 'contain',
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
    color: colors.txtBlack,
    fontFamily: fonts.regular,
  },

  Txt: {
    textAlign: 'justify',
    alignSelf: 'center',
    maxWidth: 300,
    marginTop: 10,
    color: colors.g4,
    fontFamily: fonts.regular,
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
  passengerHomeTxt: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 26,
    color: colors.txtBlack,
  },
});

export default PassengerHome;
