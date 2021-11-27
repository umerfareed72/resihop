import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {appImages, colors} from '../utilities';
import StarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/core';

const AvailableDrivers = ({setHeight}) => {
  let navigation = useNavigation();

  useEffect(() => {
    setHeight(Dimensions.get('screen').height - 400);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.driversTxt}>Available Drivers</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTxt}>
          123 abc apartment abc street abc...
        </Text>
        <View style={styles.addressCircle} />
      </View>
      <View style={[styles.addressContainer, {marginTop: 21}]}>
        <Text style={styles.addressTxt}>
          123 abc apartment abc street abc...
        </Text>
        <View style={styles.addressSquare} />
      </View>
      <View style={styles.timeDateContainer}>
        <Text style={styles.dateTimeTxt}>12 June, 07:50</Text>
        <View style={styles.matchingContainer}>
          <Text style={styles.matchingTxt}>Matching Done</Text>
        </View>
        <View style={styles.seatsContainer}>
          <Image
            source={appImages.seatGreen}
            resizeMode="contain"
            style={styles.greenSeat}
          />
          <Text style={styles.seatTxt}>2 Seat</Text>
        </View>
      </View>
      <View style={styles.driverInfoContainer}>
        <View style={styles.driverInfo}>
          <Image
            source={appImages.driver}
            resizeMode="cover"
            style={styles.driver}
          />
          <View>
            <Text style={styles.driverName}>John Deo</Text>
            <View style={styles.ratingContainer}>
              <StarIcon name="star" size={17} color={colors.white} />
              <Text style={styles.ratingTxt}>4.5</Text>
            </View>
          </View>
        </View>
        <View>
          <Text>SEK 20</Text>
        </View>
      </View>
      <View style={styles.rideDetailsContainer}>
        <View style={styles.seatDetails}>
          <Image
            source={appImages.seatGreen}
            resizeMode="contain"
            style={styles.seatGreen}
          />
          <Text style={styles.seatNum}>4 Seat Available</Text>
        </View>
        <View style={styles.carDetailsTxt}>
          <Text style={styles.carDetails}>Ford, Focus,</Text>
          <Text style={[styles.carDetails, {color: colors.txtBlack}]}>
            White, XT32TTU8
          </Text>
        </View>
      </View>
      <View style={styles.availableMain}>
        <View style={styles.availableBox}>
          <Text style={styles.availableTxt}>Available</Text>
        </View>
        <Text style={styles.date}>12 June 2020</Text>
      </View>
      <View style={styles.btnMainContainer}>
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnTxt}>Book Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            navigation.navigate('AvailableDrivers');
          }}>
          <Text style={styles.btnTxt}>Show All Drivers</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 497,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  driversTxt: {
    fontSize: 18,
    lineHeight: 30,
    color: colors.txtBlack,
    marginTop: 24,
    marginLeft: 24,
  },
  addressContainer: {
    height: 42,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    marginTop: 23,
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  addressTxt: {
    fontSize: 13,
    lineHeight: 20,
    paddingLeft: 40,
  },
  addressCircle: {
    height: 16,
    width: 16,
    borderRadius: 16 / 2,
    backgroundColor: colors.green,
    position: 'absolute',
    left: 13,
  },
  addressSquare: {
    height: 16,
    width: 16,
    borderRadius: 5,
    backgroundColor: colors.blue,
    position: 'absolute',
    left: 13,
  },
  rideInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  timeDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 22,
  },
  seatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchingContainer: {
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    height: 23,
    justifyContent: 'center',
    borderColor: colors.blue,
  },
  greenSeat: {
    height: 21.85,
    width: 16.38,
  },
  dateTimeTxt: {
    fontSize: 15,
    lineHeight: 30,
    color: colors.black,
  },
  matchingTxt: {
    fontSize: 16,
    lineHeight: 16,
    color: colors.blue,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  seatTxt: {
    fontSize: 13,
    lineHeight: 22,
    color: colors.txtBlack,
    marginLeft: 7,
  },
  driver: {
    height: 58,
    width: 58,
    borderRadius: 58 / 2,
    marginRight: 14,
  },
  driverInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 24,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    paddingHorizontal: 5,
    backgroundColor: colors.green,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  ratingTxt: {
    fontSize: 13,
    marginLeft: 3,
    //lineHeight: 37,
    color: colors.white,
  },
  driverName: {
    fontSize: 18,
    lineHeight: 22,
    color: colors.txtBlack,
    marginBottom: 7,
  },
  seatGreen: {
    height: 16,
    width: 12,
  },
  rideDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 17,
  },
  seatDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carDetailsTxt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seatNum: {
    fontSize: 13,
    lineHeight: 22,
    color: colors.txtBlack,
    marginLeft: 6,
  },
  carDetails: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.txtGray,
  },
  availableMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '90%',
    marginTop: 20,
  },
  availableBox: {
    height: 24,
    width: 82,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  availableTxt: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.white,
  },
  date: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.txtBlack,
  },
  btnMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  btnContainer: {
    height: 47,
    width: 143, //'40%',
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.txtBlack,
  },
});

export default AvailableDrivers;
