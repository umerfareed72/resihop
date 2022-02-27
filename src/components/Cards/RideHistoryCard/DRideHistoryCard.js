import moment from 'moment';
import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {fonts} from '../../../theme';
import {appIcons, colors, family, size} from '../../../utilities';
import {appImages} from '../../../utilities/images';

export const DRideHistoryCard = ({
  cancelled,
  driver,
  profilePic,
  onPressCard,
  drive_item,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={onPressCard}>
          <View style={styles.cardContainer}>
            <Text style={styles.h1}>
              {moment(drive_item?.date).format('ddd, DD MMMM,').toString()} {''}
              {moment(drive_item?.date).format('HH:MM').toString()}
            </Text>
            <View
              style={[
                styles.statusWrapper,
                {borderColor: getStatusColor(drive_item.status)},
              ]}>
              <Text
                style={[
                  styles.status,
                  {color: getStatusColor(drive_item.status)},
                ]}>
                {drive_item.status}
              </Text>
            </View>
            <Text style={[styles.h2, {marginLeft: driver ? 30 : 0}]}>
              NOK {drive_item?.costPerSeat}
            </Text>
            {driver ? (
              <Image source={appIcons.redHeart} style={styles.imageStyle} />
            ) : (
              false
            )}
          </View>
          <View style={{paddingVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              <View style={styles.circleStyle} />
              <Text style={{color: colors.g4, fontSize: size.xxsmall}}>
                {drive_item?.startDes}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.rectangleStyle} />
              <Text style={{color: colors.g4, fontSize: size.xxsmall}}>
                {drive_item?.destDes}
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <FlatList
              horizontal={true}
              data={new Array(drive_item?.bookedSeats)}
              renderItem={() => {
                return (
                  <Image
                    style={[styles.rightIcon, {marginEnd: 5}]}
                    source={appImages.seatBlue}
                  />
                );
              }}
            />
            {cancelled && (
              <Image source={appIcons.cancelled} style={styles.specialText} />
            )}
          </View>
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
    marginRight: 15,
  },
  rectangleStyle: {
    height: 12,
    width: 12,
    borderRadius: 4,
    backgroundColor: colors.blue,
    marginRight: 15,
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
    alignItems: 'center',
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
    height: 19,
    width: 58,
    resizeMode: 'contain',
  },
  imageStyle: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
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
});
const getStatusColor = status => {
  if (status === 'CANCELLED' || status === 'NO_MATCH') {
    return colors.red;
  }
  if (status === 'COMPLETED') {
    return colors.green;
  }
};
