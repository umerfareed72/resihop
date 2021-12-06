import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {appImages, colors} from '../utilities';
import StarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {fonts} from '../theme/theme';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from '../utilities/translations';

const AvailablePassengersCard = () => {
  const [seat, setSeats] = useState([1, 2]);

  let navigation = useNavigation();
  const getData = async () => {
    const res = await AsyncStorage.getItem('city');
    if (res == 'yes') {
      navigation.navigate('AvailablePassenger');
    } else {
      navigation.navigate('AvailablePassengerDriver');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.available}>{I18n.t('available_passenger')}</Text>
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
      <View style={styles.infoMainContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={appImages.driver}
            resizeMode="cover"
            style={styles.driver}
          />
          <View style={{marginLeft: 13}}>
            <Text style={styles.name}>{I18n.t('john')}</Text>
            <View style={styles.ratingContainer}>
              <StarIcon name="star" size={17} color={colors.white} />
              <Text style={styles.ratingTxt}>4.5</Text>
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginBottom: 10,
            }}>
            {seat.map(() => (
              <Image
                source={appImages.seatGreen}
                resizeMode="contain"
                style={styles.green}
              />
            ))}
          </View>
          <Text style={{fontFamily: fonts.regular}}>{I18n.t('date_time')}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btnContainer} onPress={getData}>
        <Text style={styles.btnTxt}>{I18n.t('show_all_passenger')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvailablePassengersCard;

const styles = StyleSheet.create({
  container: {
    height: 389,
    width: '100%',
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
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
  driver: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
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
  infoMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 29,
  },
  green: {
    height: 25,
    width: 18,
    marginLeft: 9,
  },
  name: {
    fontFamily: fonts.regular,
    fontSize: 18,
    // lineHeight: 39,
    color: colors.txtBlack,
    marginBottom: 10,
  },
  btnContainer: {
    height: 56,
    width: 300,
    backgroundColor: colors.green,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  available: {
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 30,
    marginTop: 20,
    marginHorizontal: 24,
  },
});
