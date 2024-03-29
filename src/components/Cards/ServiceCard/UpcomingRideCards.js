import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {appImages, colors} from '../../../utilities';
import {fonts} from '../../../theme/theme';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

export const UpcomingRideCards = ({
  item,
  onPress,
  selectedCard,
  setSelectedCard,
  multiDelete,
}) => {
  const [seats, setSeats] = useState([]);
  const myRidesData = useSelector(state => state.map.myRidesData);
  const myDrives = useSelector(state => state.map.myDrivesData);

  useEffect(() => {
    if (item.availableSeats) {
      let availableSeats = [];
      for (let i = 0; i < item?.availableSeats + item?.bookedSeats; i++) {
        availableSeats[i] = i;
      }
      setSeats(availableSeats);
    }

    if (item.requiredSeats) {
      let requiredSeats = [];
      for (let i = 0; i < item?.requiredSeats; i++) {
        requiredSeats[i] = i;
      }
      setSeats(requiredSeats);
    }
  }, [myRidesData, myDrives]);
  const CardSelect = id => {
    if (selectedCard?.includes(item.id)) {
      setSelectedCard(selectedCard.filter(card => card !== id));
    } else setSelectedCard([id, ...selectedCard]);
  };
  return (
    <View style={{padding: 10}}>
      <TouchableOpacity
        style={[
          styles.cardContainer,
          {elevation: selectedCard?.includes(item.id) ? 0 : 10},
        ]}
        onPress={() => {
          if (multiDelete) {
            CardSelect(item?.id);
          } else {
            onPress();
          }
        }}
        onLongPress={() => CardSelect(item.id)}>
        <View style={styles.addressContainer}>
          <Text style={styles.addressTxt}>{item.startDes}</Text>
          <View style={styles.addressCircle} />
        </View>
        <View style={[styles.addressContainer, {marginTop: 10}]}>
          <Text style={styles.addressTxt}>{item.destDes}</Text>
          <View style={styles.addressSquare} />
        </View>
        <View style={styles.dateWrapper}>
          <Text style={styles.date}>
            {item.tripDate
              ? moment(item.tripDate).format('DD-MMM')
              : moment(item.date).format('DD-MMM')}{' '}
            {item.tripDate
              ? moment(item.tripDate).format('hh:mm a')
              : moment(item.date).format('hh:mm a')}
          </Text>
          <View
            style={[
              styles.statusWrapper,
              {borderColor: getStatusColor(item.status)},
            ]}>
            <Text style={[styles.status, {color: getStatusColor(item.status)}]}>
              {item?.status.split('_').join(' ')}
            </Text>
          </View>
        </View>
        <View style={styles.dateWrapper}>
          {item.costPerSeat ? (
            <Text style={styles.fair}>{`NOK ${item.costPerSeat}`}</Text>
          ) : (
            <View />
          )}
          <View style={styles.seatContainer}>
            {seats?.map(seat => (
              <Image
                key={seat}
                source={
                  item?.availableSeats
                    ? item?.bookedSeats
                      ? item.bookedSeats > seat
                        ? appImages.seatGreen
                        : appImages.seatBlue
                      : appImages.seatBlue
                    : appImages.seatGreen
                }
                resizeMode="contain"
                style={styles.green}
              />
            ))}
          </View>
        </View>
      </TouchableOpacity>
      {selectedCard?.includes(item.id) ? (
        <>
          <TouchableOpacity
            style={{
              backgroundColor: colors.green,
              opacity: 0.5,
              height: 199,
              borderRadius: 15,
              width: 333,
              alignSelf: 'center',
              position: 'absolute',
              top: 25,
            }}
            onPress={() => CardSelect(item.id)}
          />
          <Image
            source={appImages.tickMark}
            resizeMode="contain"
            style={{
              height: 49,
              width: 49,
              position: 'absolute',
              alignSelf: 'center',
              top: 100,
              opacity: 1,
            }}
          />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 199,
    width: 333,
    backgroundColor: colors.white,
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
  if (status === 'CONFIRMED' || status === 'FULLY_BOOKED') {
    return colors.green;
  }
  if (status === 'MATCHING_DONE' || status === 'PARTIALLY_BOOKED') {
    return colors.blue;
  }
  if (status === 'WAITING_FOR_MATCH') {
    return colors.orange;
  }
};
