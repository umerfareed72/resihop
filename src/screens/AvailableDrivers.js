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
import {appImages, colors} from '../utilities';
import StarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReturnBookSheet from '../components/ReturnBookSheet';

const AvailableDrivers = () => {
  let navigation = useNavigation();

  const returnBookSheetRef = useRef(null);

  const data = [1, 2, 3, 4, 5, 6, 7];

  return (
    <View style={styles.container}>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={'Available Drivers'}
      />

      <FlatList
        data={data}
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
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => returnBookSheetRef.current.open()}>
              <Text style={styles.btnTxt}>Book Now</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <ReturnBookSheet returnBookSheetRef={returnBookSheetRef} />
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
    //width: '50%',
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