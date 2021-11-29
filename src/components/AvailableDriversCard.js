import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {appImages, colors, HP, size, family} from '../utilities';
import StarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/core';
import {fonts} from '../theme';

const AvailableDrivers = ({
  modalName,
  setAvailableDrivers,
  setNearestDriver,
  setHeight,
  title,
  btnText,
}) => {
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
      {modalName !== 'availableDrivers' && (
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
      )}

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
        {modalName === 'availableDrivers' ? (
          <View>
            <View style={styles.imagesContainer}>
              <Image
                source={appImages.seatGreen}
                resizeMode="contain"
                style={styles.greenSeat}
              />
              <Image
                source={appImages.seatGreen}
                resizeMode="contain"
                style={styles.greenSeat}
              />
            </View>

            <Text style={styles.dateStyle}>12 June, 08:00</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.fair}>SEK 20</Text>
            <Image
              source={appImages.car}
              resizeMode="contain"
              style={styles.car}
            />
          </View>
        )}
      </View>
      {modalName !== 'availableDrivers' && (
        <>
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
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => navigation.navigate('PickUpInfo')}>
              <Text style={styles.btnTxt}>{title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                navigation.navigate('AvailableDrivers', {btnText: btnText});
              }}>
              <Text style={styles.btnTxt}>Show All Drivers</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {modalName === 'availableDrivers' && (
        <TouchableOpacity style={styles.selectRouteButtom}>
          <Text style={styles.routeText}>Select Route</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectRouteButtom: {
    height: HP('7'),
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: HP('3'),
    borderRadius: 14,
    marginVertical: HP('3'),
  },
  routeText: {
    fontSize: size.large,
    fontFamily: family.product_sans_regular,
    color: colors.white,
  },
  imagesContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateStyle: {
    fontSize: size.small,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
    marginTop: HP('1'),
  },
  greenSeat: {
    width: 18.75,
    height: 25,
    marginHorizontal: 10,
  },
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
    fontFamily: fonts.regular,
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
    fontFamily: fonts.regular,
    color: colors.txtBlack,
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
    fontFamily: fonts.regular,
  },
  matchingTxt: {
    fontSize: 16,
    lineHeight: 16,
    color: colors.blue,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: fonts.bebasBold,
  },
  seatTxt: {
    fontSize: 13,
    lineHeight: 22,
    color: colors.txtBlack,
    marginLeft: 7,
    fontFamily: fonts.regular,
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
    fontFamily: fonts.regular,
  },
  driverName: {
    fontSize: 18,
    lineHeight: 22,
    color: colors.txtBlack,
    marginBottom: 7,
    fontFamily: fonts.regular,
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
    fontFamily: fonts.regular,
  },
  carDetails: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.txtGray,
    fontFamily: fonts.regular,
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
    fontFamily: fonts.regular,
  },
  date: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.txtBlack,
    fontFamily: fonts.regular,
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
    fontFamily: fonts.bold,
  },
  fair: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 22,
    color: colors.txtBlack,
  },
  car: {
    height: 26,
    width: 64,
    marginTop: 8,
  },
});

export default AvailableDrivers;
