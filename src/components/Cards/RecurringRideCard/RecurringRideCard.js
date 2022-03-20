import moment from 'moment';
import React, {useState, useRef, useEffect} from 'react';
import {FlatList} from 'react-native';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {fonts} from '../../../theme';
import {colors, appImages, size} from '../../../utilities';

export const RecurringRideCard = ({onPressCard, ride}) => {
  const [seats, setSeats] = useState([]);
  const {recurring_ride, recurring_drive} = useSelector(state => state.map);
  useEffect(() => {
    if (ride.availableSeats) {
      let availableSeats = [];
      for (let i = 0; i < ride.availableSeats + ride.bookedSeats; i++) {
        availableSeats[i] = i;
      }
      setSeats(availableSeats);
    }

    if (ride.requiredSeats) {
      let requiredSeats = [];
      for (let i = 0; i < ride.requiredSeats; i++) {
        requiredSeats[i] = i;
      }
      setSeats(requiredSeats);
    }
  }, [recurring_ride, recurring_drive]);
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPressCard}>
        <View style={styles.cardStyle}>
          <View style={[styles.alignRow]}>
            <View
              style={[
                styles.txtInput,
                {
                  marginBottom: 10,
                },
              ]}>
              <View style={styles.circleStyle} />

              <Text
                style={{
                  color: colors.g4,
                  fontSize: size.xxsmall,
                  width: '90%',
                }}>
                {ride?.startDes}
              </Text>
            </View>
            <View style={styles.txtInput}>
              <View style={styles.rectangleStyle} />
              <Text
                style={{
                  color: colors.g4,
                  fontSize: size.xxsmall,
                  width: '90%',
                }}>
                {ride?.destDes}
              </Text>
            </View>
          </View>
          <View style={styles.filterContainer}>
            <Text>
              {moment(ride?.next[0]?.date).format('DD MMM')} {'-'}{' '}
              {moment(ride?.next[ride.next.length - 1]?.date).format('DD MMM')}
              {' | '}
              {moment(ride?.next[ride.next.length - 1]?.date).format('hh:mm')}
            </Text>
            <View>
              <FlatList
                horizontal={true}
                data={seats}
                renderItem={({item}) => {
                  return (
                    <Image
                      source={
                        ride?.availableSeats
                          ? ride?.bookedSeats
                            ? ride.bookedSeats > item
                              ? appImages.seatGreen
                              : appImages.seatBlue
                            : appImages.seatBlue
                          : appImages.seatGreen
                      }
                      resizeMode="contain"
                      style={styles.greenSeat}
                    />
                  );
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '4%',
            }}>
            <>
              <View
                style={[
                  styles.statusWrapper,
                  {borderColor: getStatusColor(ride.status)},
                ]}>
                <Text
                  style={[styles.status, {color: getStatusColor(ride.status)}]}>
                  {ride?.status.split('_').join(' ')}
                </Text>
              </View>

              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                NOK{' '}
                {ride?.amountPayable * ride?.requiredSeats ||
                  ride?.costPerSeat * ride?.availableSeats}
              </Text>
            </>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    width: '90%',
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 10,
    padding: '5%',
    borderRadius: 15,
  },
  container: {
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
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
  },
  txtInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.greyBorder,
    borderRadius: 10,
    paddingLeft: 10,
    color: colors.inputTxtGray,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  startDot: {
    height: 16,
    width: 16,
    borderRadius: 16 / 2,
    backgroundColor: colors.green,
    position: 'absolute',
    top: 14,
    left: 15,
  },
  destSquare: {
    height: 16,
    width: 16,
    backgroundColor: colors.blue,
    position: 'absolute',
    top: 14,
    left: 15,
    borderRadius: 4,
  },
  ellipsesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ellipses: {
    height: 25,
    width: 25,
    borderRadius: 25,
    marginRight: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: '4%',
    alignItems: 'center',
  },
  greenSeat: {
    height: 21.85,
    width: 16.38,
    marginLeft: 2,
  },
  seatTxt: {
    fontSize: 13,
    lineHeight: 22,
    color: colors.txtBlack,
    marginLeft: 7,
  },
  circleStyle: {
    height: 12,
    width: 12,
    borderRadius: 12,
    backgroundColor: colors.green,
    marginRight: 10,
  },
  rectangleStyle: {
    height: 12,
    width: 12,
    borderRadius: 4,
    backgroundColor: colors.blue,
    marginRight: 10,
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
