import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {appIcons, colors, family, size} from '../../../utilities';
import {appImages} from '../../../utilities/images';
import moment from 'moment';
import {fonts} from '../../../theme';

export const RideHistoryCard = ({
  cancelled,
  driver,
  profilePic,
  onPressCard,
  dateTime,
  cost,
  startLocation,
  destination,
  no_of_seats,
  vehicleInfo,
  ride_status,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={onPressCard}>
          <View style={styles.cardContainer}>
            <Text style={styles.h1}>
              {moment(dateTime).format('ddd, DD MMMM,').toString()} {''}
              {moment(dateTime).format('HH:MM').toString()}
            </Text>
            <View
              style={[
                styles.statusWrapper,
                {borderColor: getStatusColor(ride_status)},
              ]}>
              <Text
                style={[styles.status, {color: getStatusColor(ride_status)}]}>
                {ride_status}
              </Text>
            </View>

            <Text style={styles.h2}>NOK {cost}</Text>
          </View>
          <View style={{paddingVertical: 10}}>
            <View style={styles.row2}>
              <View style={[styles.alignRow, {width: '60%'}]}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    alignItems: 'center',
                  }}>
                  <View style={styles.circleStyle} />

                  <Text
                    style={{
                      color: colors.g4,
                      fontSize: size.xxsmall,
                    }}>
                    {startLocation}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.rectangleStyle} />
                  <Text
                    style={{
                      color: colors.g4,
                      fontSize: size.xxsmall,
                    }}>
                    {destination}
                  </Text>
                </View>
              </View>
              {driver ? (
                false
              ) : (
                <View>
                  <FlatList
                    horizontal={true}
                    data={new Array(no_of_seats)}
                    renderItem={() => {
                      return (
                        <Image
                          style={[styles.rightIcon, {marginStart: 5}]}
                          source={appImages.seatBlue}
                        />
                      );
                    }}
                  />
                </View>
              )}
            </View>
          </View>
          {driver ? (
            <View>
              <FlatList
                horizontal={true}
                data={[1, 2]}
                renderItem={() => {
                  return (
                    <Image
                      style={[
                        styles.rightIcon,
                        {
                          marginStart: driver ? 0 : 5,
                          marginEnd: driver ? 5 : 0,
                        },
                      ]}
                      source={appImages.seatBlue}
                    />
                  );
                }}
              />
            </View>
          ) : (
            <View style={styles.row3}>
              <Image source={appIcons.car_left} style={styles.icon50} />
              <Text
                style={[styles.h2Text, {fontWeight: '500', color: colors.g5}]}>
                {vehicleInfo?.vehicleCompanyName || 'Ford, Focus' + ' '}
                <Text
                  style={[
                    styles.h2Text,
                    {fontWeight: 'bold', color: colors.light_black},
                  ]}>
                  {' '}
                  {vehicleInfo?.color || 'White'}
                  {', '}
                  {vehicleInfo?.licencePlateNumber || 'XT32TTU8'}
                </Text>
              </Text>
              {profilePic ? (
                <Image source={appImages.user} style={styles.icon42} />
              ) : (
                false
              )}
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    flexDirection: 'row',
  },
  wrapper: {
    width: '100%',
    marginVertical: 10,
  },
  circleStyle: {
    height: 12,
    width: 12,
    borderRadius: 12,
    backgroundColor: colors.green,
    marginRight: 10,
  },
  status: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.green,
    textTransform: 'uppercase',
    fontFamily: fonts.bebasBold,
  },
  statusWrapper: {
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    height: 23,
    justifyContent: 'center',
    borderColor: colors.green,
    marginLeft: 40,
  },
  rectangleStyle: {
    height: 12,
    width: 12,
    borderRadius: 4,
    backgroundColor: colors.blue,
    marginRight: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  h1: {
    fontSize: size.xsmall,
    fontWeight: 'bold',
    fontFamily: family.product_sans_bold,
  },
  h2: {
    fontSize: size.normal,
    fontWeight: 'bold',
    fontFamily: family.product_sans_bold,
  },
  row2: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alignRow: {
    // alignItems: 'center',
    // flexDirection: 'row',
  },
  rightIcon: {
    width: 14,
    height: 18,
    resizeMode: 'contain',
    tintColor: colors.green,
  },
  row3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row3Image: {},
  icon50: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  icon42: {
    height: 42,
    width: 42,
    borderRadius: 42,
    bottom: 10,
  },

  h2Text: {
    fontFamily: family.product_sans_regular,
    fontSize: size.xxsmall,
  },
  specialText: {
    color: colors.dark_red,
    fontWeight: '700',
    fontSize: size.normal,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderBottomColor: colors.dark_red,
    borderTopColor: colors?.dark_red,
  },
});
const getStatusColor = status => {
  if (status === 'CANCELLED' || status === 'NO_MATCH') {
    return colors.red;
  }
  if (status === 'COMPLETED') {
    return colors.green;
  }
};
