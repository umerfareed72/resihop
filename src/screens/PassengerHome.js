import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {colors, appIcons} from '../utilities';
import {
  passenger_home,
  create_ride,
  recurring_ride,
  city_to_city,
  upcoming_rides,
  lorem,
  first_ride,
} from '../theme/strings';
import HamburgerMenu from 'react-native-vector-icons/Entypo';
import Bell from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/core';
import MyStatusBar from '../components/Header/statusBar';

const PassengerHome = () => {
  let navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <MyStatusBar backgroundColor={colors.white} />
      <View style={styles.passengerHeader}>
        <TouchableOpacity>
          <HamburgerMenu name="menu" size={26} color={colors.green} />
        </TouchableOpacity>
        <Text style={{fontSize: 16}}>{passenger_home}</Text>
        <TouchableOpacity>
          <Bell name="bell" size={24} color={colors.green} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.switchToDriverBtnContainer}>
          <Text style={{fontSize: 13, color: colors.white}}>
            Switch to Driver
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}

      <View style={styles.cardMainContainer}>
        <View style={styles.cardContainer}>
          <Image source={appIcons.homeIconBg} style={styles.homeCards} />
          <View style={styles.interiorContainer}>
            <Image
              source={appIcons.createRide}
              style={styles.cardInterior}
              resizeMode="contain"
            />
            <Text style={[styles.cardTxt, {marginTop: 14}]}>{create_ride}</Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <Image source={appIcons.homeIconBg} style={styles.homeCards} />
          <View style={styles.interiorContainer}>
            <Image
              source={appIcons.recurringRide}
              style={styles.cardInterior}
              resizeMode="contain"
            />
            <Text style={styles.cardTxt}>{recurring_ride}</Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <Image source={appIcons.homeIconBg} style={styles.homeCards} />
          <View style={styles.interiorContainer}>
            <Image
              source={appIcons.cityRide}
              style={styles.cardInterior}
              resizeMode="contain"
            />
            <Text style={styles.cardTxt}>{city_to_city}</Text>
          </View>
        </View>
      </View>

      {/* upcoming Rides */}

      <View style={styles.upcomingRidesMainContainer}>
        <Text style={styles.upcomingTxt}>{upcoming_rides} </Text>
        <View style={styles.ellipsesContainer}>
          <View style={styles.ellipses} />
          <View style={styles.ellipses} />
        </View>
      </View>

      <Image source={appIcons.noUpcomingRide} style={styles.noUpcomingRide} />

      <Text style={styles.Txt}>{lorem}</Text>

      <TouchableOpacity
        style={styles.createRideBtnContainer}
        onPress={() => navigation.navigate('CreateRide')}>
        <Text style={styles.btnTxt}>{first_ride}</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    height: 28,
    width: 28,
    backgroundColor: colors.green,
    borderRadius: 28 / 2,
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
    width: '20%',
    justifyContent: 'space-between',
  },
  upcomingTxt: {
    fontSize: 16,
    lineHeight: 26,
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
  },
});

export default PassengerHome;
