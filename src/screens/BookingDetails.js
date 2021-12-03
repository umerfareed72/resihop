import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {CustomHeader} from '../components/Header/CustomHeader';
import {useNavigation} from '@react-navigation/core';
import {colors, appImages} from '../utilities';
import StarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {fonts} from '../theme';
import I18n from '../utilities/translations';

const BookingDetails = () => {
  let navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={I18n.t('booking_detail')}
      />
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
          <Text
            style={{textAlign: 'center', fontFamily: fonts.bold, fontSize: 18}}>
            SEK 20
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: colors.txtGray,
              fontFamily: fonts.regular,
            }}>
            (SEK 20/Trip)
          </Text>
          <Image
            source={appImages.car}
            resizeMode="contain"
            style={{height: 26, width: 64, marginTop: 5, alignSelf: 'flex-end'}}
          />
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
      <View style={styles.line} />

      <Text style={styles.promoTxt}>Promo Code</Text>
      <View style={styles.promoInputContainer}>
        <TextInput
          placeholder="Apply Promo Code"
          placeholderTextColor={colors.inputTxtGray}
          style={styles.promoInput}
        />
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnTxt}>Apply</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.promoLine} />
      <Text
        style={[
          styles.bookingTitles,
          {marginTop: 20, marginBottom: 15, marginLeft: 21},
        ]}>
        Booking Details
      </Text>
      <View style={styles.titleContainer}>
        <Text style={styles.bookingTitles}>Ride Booked</Text>
        <Text style={styles.amount}>SEK 40</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={[styles.bookingTitles, {color: colors.g4}]}>Discount</Text>
        <Text style={[styles.amount, {color: colors.g4}]}>SEK 0</Text>
      </View>
      <View style={[styles.line, {marginTop: 0}]} />
      <View style={styles.totalContainer}>
        <Text style={styles.bookingTitles}>Total Pay</Text>
        <Text style={[styles.amount, {fontSize: 18, fontFamily: fonts.bold}]}>
          SEK 40
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation?.navigate('Payment');
        }}
        style={styles.confirmBtnContainer}>
        <Text style={styles.confirmTxt}>Confirm and Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  addressContainer: {
    height: 42,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    marginTop: 21,
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
  },
  seatTxt: {
    fontSize: 13,
    lineHeight: 22,
    color: colors.txtBlack,
    marginLeft: 7,
    fontFamily: fonts.regular,
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
  driver: {
    height: 58,
    width: 58,
    borderRadius: 58 / 2,
    marginRight: 14,
  },
  line: {
    borderWidth: 0.4,
    borderColor: colors.g4,
    marginTop: 20,
  },
  promoInput: {
    height: 42,
    width: '70%',
    fontSize: 15,
    lineHeight: 24,
    color: colors.inputTxtGray,
    fontFamily: fonts.regular,
  },
  btnContainer: {
    height: 35,
    //width: 52,
    paddingHorizontal: 7,
    backgroundColor: colors.green,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '90%',
  },
  promoTxt: {
    fontSize: 16,
    lineHeight: 39,
    color: colors.txtBlack,
    marginLeft: 20,
    marginTop: 10,
    fontFamily: fonts.regular,
  },
  btnTxt: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.white,
    fontFamily: fonts.regular,
  },
  promoLine: {
    borderWidth: 1,
    borderColor: colors.g2,
    width: '90%',
    alignSelf: 'center',
    marginTop: 8,
  },
  bookingTitles: {
    fontSize: 15,
    lineHeight: 30,
    fontFamily: fonts.regular,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  amount: {
    fontSize: 16,
    lineHeight: 34,
    color: colors.txtBlack,
    fontFamily: fonts.regular,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  confirmBtnContainer: {
    height: 56,
    width: '80%',
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 15,
  },
  confirmTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
    fontFamily: fonts.bold,
  },
});

export default BookingDetails;
