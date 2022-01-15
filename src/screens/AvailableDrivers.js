import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {CustomHeader} from '../components/Header/CustomHeader';
import {appIcons, appImages, colors, family} from '../utilities';
import StarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReturnBookSheet from '../components/ReturnBookSheet';
import {fonts} from '../theme';
import I18n from '../utilities/translations';
import {useSelector} from 'react-redux';
import moment from 'moment';

const AvailableDrivers = props => {
  let navigation = useNavigation();

  const returnBookSheetRef = useRef(null);

  const data = [1, 2, 3, 4, 5, 6, 7];

  const searchDrivesResponse = useSelector(
    state => state.map.searchDriveResponse,
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={I18n.t('available_drivers')}
      />

      <FlatList
        data={searchDrivesResponse}
        renderItem={({item}) => (
          <View key={item} style={styles.driversCard}>
            <View style={styles.driverInfoContainer}>
              <View style={styles.driverInfo}>
                <Image
                  source={appImages.driver}
                  resizeMode="cover"
                  style={styles.driver}
                />
                <View>
                  <Text
                    style={
                      styles.driverName
                    }>{`${item.drive.user.firstName} ${item.drive.user.lastName}`}</Text>
                  <View style={styles.ratingContainer}>
                    <StarIcon name="star" size={17} color={colors.white} />
                    <Text style={styles.ratingTxt}>4.5</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text
                  style={[
                    styles.driverName,
                    {
                      fontFamily: family.product_sans_bold,
                      top: 5,
                    },
                  ]}>
                  {`SEK ${item.drive.costPerSeat}`}
                </Text>
                <Image
                  source={appImages.car}
                  style={{
                    height: 30,
                    width: 64,
                    resizeMode: 'contain',
                    top: 5,
                  }}
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
                <Text
                  style={
                    styles.seatNum
                  }>{`${item.drive.availableSeats} Seat Available`}</Text>
              </View>
              <View style={styles.carDetailsTxt}>
                <Text style={styles.carDetails}>{I18n.t('ford')}</Text>
                <Text style={[styles.carDetails, {color: colors.txtBlack}]}>
                  {I18n.t('car_detail')}
                </Text>
              </View>
            </View>
            <View style={styles.availableMain}>
              <View style={styles.availableBox}>
                <Text style={styles.availableTxt}>{I18n.t('available')}</Text>
              </View>
              <Text style={styles.date}>
                {moment(item.drive.date).format('DD MMM YYYY')}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                props?.route?.params?.btnText === 'Book Now'
                  ? returnBookSheetRef.current.open()
                  : navigation?.navigate('StartMatching', {
                      modalName: 'pickUpInfo',
                    });
              }}>
              <Text style={styles.btnTxt}>{props?.route?.params?.btnText}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <ReturnBookSheet
        onPressReturn={() => {
          returnBookSheetRef.current.close();
          navigation.navigate('ReturnTrip');
        }}
        onPressSkip={() => {
          returnBookSheetRef.current.close();
          navigation.navigate('BookingDetails');
        }}
        returnBookSheetRef={returnBookSheetRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    //width: '50%',
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
  btnContainer: {
    height: 42,
    backgroundColor: colors.txtBlack,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 25,
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  driversCard: {
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    borderColor: colors.greyBorder,
    paddingBottom: 25,
    marginBottom: 20,
  },
});

export default AvailableDrivers;
