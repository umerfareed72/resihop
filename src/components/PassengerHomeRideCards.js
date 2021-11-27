import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {appImages, colors} from '../utilities';
import {fonts} from '../theme/theme';
import {useNavigation} from '@react-navigation/core';

const PassengerHomeRideCards = ({item}) => {
  let navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('UpdateRide')}>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTxt}>
          123 abc apartment abc street abc...
        </Text>
        <View style={styles.addressCircle} />
      </View>
      <View style={[styles.addressContainer, {marginTop: 10}]}>
        <Text style={styles.addressTxt}>
          123 abc apartment abc street abc...
        </Text>
        <View style={styles.addressSquare} />
      </View>
      <View style={styles.dateWrapper}>
        <Text style={styles.date}>{item.date}</Text>
        <View
          style={[
            styles.statusWrapper,
            {borderColor: getStatusColor(item.status)},
          ]}>
          <Text style={[styles.status, {color: getStatusColor(item.status)}]}>
            {item.status}
          </Text>
        </View>
      </View>
      <View style={styles.dateWrapper}>
        <Text style={styles.fair}>SEK 20</Text>
        <View style={styles.seatContainer}>
          {item?.seats.map(seat => (
            <Image
              source={appImages.seatGreen}
              resizeMode="contain"
              style={styles.green}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PassengerHomeRideCards;

const styles = StyleSheet.create({
  cardContainer: {
    height: 199,
    width: 333,
    backgroundColor: colors.white,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: colors.dropShadow2,
    shadowOpacity: 0.8,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 24,
  },
  addressContainer: {
    height: 42,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    marginTop: 10,
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
  green: {
    height: 20,
    width: 15,
    marginLeft: 10,
  },
  fair: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 22,
    color: colors.txtBlack,
  },
  status: {
    fontSize: 16,
    lineHeight: 16,
    color: colors.green,
    textTransform: 'uppercase',
  },
  statusWrapper: {
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    height: 23,
    justifyContent: 'center',
    borderColor: colors.green,
    marginLeft: 40,
  },
  date: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 26,
    color: colors.txtBlack,
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  seatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const getStatusColor = status => {
  if (status === 'Confirmed') {
    return colors.green;
  }
  if (status === 'Matching Done') {
    return colors.blue;
  }
  if (status === 'Waiting for Match') {
    return colors.orange;
  }
};
