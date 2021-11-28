import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import {colors, appIcons, appImages, family} from '../../../utilities';
import {
  passenger_home,
  create_ride,
  recurring_ride,
  city_to_city,
  upcoming_rides,
  lorem,
  first_ride,
} from '../../../theme/strings';
import HamburgerMenu from 'react-native-vector-icons/Entypo';
import Bell from 'react-native-vector-icons/FontAwesome';
import MyStatusBar from '../../../components/Header/statusBar';
import {RideFilterModal, SortModal} from '../../../components';
import I18n from '../../../utilities/translations';
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
const DriverHome = ({navigation}) => {
  const filterModalRef = useRef(null);
  const sortModalRef = useRef(null);
  //States
  const [time, settime] = useState('');
  const [date, setdate] = useState('');
  const [ridetype, setRideType] = useState('');
  const [status, setStatus] = useState('');
  const [seats, setSeats] = useState('');

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
              navigation?.replace('PassengerDashboard');
            }}
            style={styles.switchToDriverBtnContainer}>
            <Text style={{fontSize: 13, color: colors.white}}>
              Switch to Passenger
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cards */}

        <View style={styles.cardMainContainer}>
          <View style={styles.cardContainer}>
            <Image source={appIcons.driver_brick_bg} style={styles.homeCards} />
            <View style={styles.interiorContainer}>
              <Image
                source={appImages.green_car}
                style={styles.cardInterior}
                resizeMode="contain"
              />
              <Text style={[styles.cardTxt, {marginTop: 14}]}>
                Create Drive
              </Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <Image source={appIcons.driver_brick_bg} style={styles.homeCards} />
            <View style={styles.interiorContainer}>
              <Image
                source={appImages.blue_car}
                style={styles.cardInterior}
                resizeMode="contain"
              />
              <Text style={styles.cardTxt}>My Recurring Drives</Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <Image source={appIcons.driver_brick_bg} style={styles.homeCards} />
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('DriverCityToCity');
              }}
              style={styles.interiorContainer}>
              <Image
                source={appImages.city}
                style={styles.cardInterior}
                resizeMode="contain"
              />
              <Text style={styles.cardTxt}>City to City Drives</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* upcoming Rides */}

        <View style={styles.upcomingRidesMainContainer}>
          <Text style={styles.upcomingTxt}>{upcoming_rides} </Text>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 10}}>
          <Image source={appIcons.driver_home} style={styles.noUpcomingRide} />

          <Text style={styles.Txt}>{lorem}</Text>

          <TouchableOpacity
            style={styles.createRideBtnContainer}
            onPress={() => navigation.navigate('CreateRide')}>
            <Text style={styles.btnTxt}>Create your Frist Drive</Text>
          </TouchableOpacity>
        </ScrollView>
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
    marginTop: 30,
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
    fontFamily: family.product_sans_bold,
  },
});

export default DriverHome;
