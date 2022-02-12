import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
} from 'react-native';
import {colors, appIcons, appImages, family} from '../../../utilities';
import HamburgerMenu from 'react-native-vector-icons/Entypo';
import Bell from 'react-native-vector-icons/FontAwesome';
import MyStatusBar from '../../../components/Header/statusBar';
import {RideFilterModal, SortModal} from '../../../components';
import UpcomingRideCards from '../../../components/UpcomingRideCards';
import {fonts} from '../../../theme';
import I18n from '../../../utilities/translations';
import {
  setOrigin,
  setMapDestination,
  SearchDrives,
  SearchRides,
  MyRides,
} from '../../../redux/actions/map.actions';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {getProfileInfo, SwitchDrive} from '../../../redux/actions/auth.action';
import {get} from '../../../services';

//Data
var TimeList = {
  id: 1,
  title: 'Time',
  items: [
    {id: 1, text: '08:00 to 12:00', status: false},
    {id: 2, text: '08:00 to 12:00', status: false},
    {id: 3, text: '08:00 to 12:00', status: false},
  ],
};

var RideStatusList = {
  id: 1,
  title: 'Ride Status',
  items: [
    {id: 1, text: 'Confirmed', status: false},
    {id: 2, text: 'Waiting for Match', status: false},
    {id: 3, text: 'Matching Done', status: false},
  ],
};

const rideTypeList = {
  id: 4,
  title: 'Ride Type',
  items: [
    {id: 1, text: 'All Rides'},
    {id: 2, text: 'Destination Rides'},
    {id: 3, text: 'Return Rides'},
  ],
};

const DateList = {
  id: 1,
  title: 'Date',
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
  title: 'Seat',
  items: [
    {id: 1, icon: appImages.seatBlue},
    {id: 2, icon: appImages.seatBlue},
    {id: 3, icon: appImages.seatBlue},
    {id: 4, icon: appImages.seatBlue},
    {id: 5, icon: appImages.seatBlue},
    {id: 6, icon: appImages.seatBlue},
  ],
};
const PassengerHome = ({navigation}) => {
  let dispatch = useDispatch();
  let isFocused = useIsFocused();

  const filterModalRef = useRef(null);
  const sortModalRef = useRef(null);
  //States
  const [time, settime] = useState('');
  const [date, setdate] = useState('');
  const [ridetype, setRideType] = useState('');
  const [status, setStatus] = useState('');
  const [seats, setSeats] = useState('');
  const [selectedCard, setSelectedCard] = useState([]);
  const auth = useSelector(state => state.auth);
  const myRidesData = useSelector(state => state.map.myRidesData);
  const userId = useSelector(state => state.auth?.userdata?.user?.id);

  useEffect(() => {
    dispatch(MyRides());
    getUserdata();
  }, [isFocused]);

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

  const onPress = item => {
    navigation.navigate('RideStatus', {item: item});
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
              navigation?.navigate('CreateRide');
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
          <>
            <Image
              source={appIcons.noUpcomingRide}
              style={styles.noUpcomingRide}
            />

            <Text style={styles.Txt}>{I18n.t('lorem')}</Text>
            <TouchableOpacity
              style={styles.createRideBtnContainer}
              onPress={() => navigation.navigate('CreateRide')}>
              <Text style={styles.btnTxt}>{I18n.t('first_ride')}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <FlatList
              data={myRidesData}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <UpcomingRideCards
                  item={item}
                  onPress={() => onPress(item)}
                  selectedCard={selectedCard}
                  setSelectedCard={setSelectedCard}
                />
              )}
              ListFooterComponent={() => (
                <TouchableOpacity
                  style={styles.createRideBtnContainer}
                  onPress={() => navigation.navigate('CreateRide')}>
                  <Text style={styles.btnTxt}>{I18n.t('first_ride')}</Text>
                </TouchableOpacity>
              )}
            />
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
      <SortModal show={sortModalRef} />
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
    color: colors.txtBlack,
    fontFamily: fonts.regular,
  },
  noUpcomingRide: {
    height: 197,
    width: 247,
    alignSelf: 'center',
    marginTop: 30,
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
    marginTop: 30,
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
