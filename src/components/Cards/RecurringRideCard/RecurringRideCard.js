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
import {colors, appImages} from '../../../utilities';

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
          <View style={{marginBottom: 20}}>
            <TextInput
              editable={false}
              multiline={true}
              placeholder={ride?.startDes}
              placeholderTextColor={colors.inputTxtGray}
              style={styles.txtInput}
            />
            <View style={styles.startDot} />
          </View>
          <View>
            <TextInput
              multiline={true}
              editable={false}
              placeholder={ride?.destDes}
              placeholderTextColor={colors.inputTxtGray}
              style={styles.txtInput}
            />
            <View style={styles.destSquare} />
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
              <Text></Text>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                NOK {ride?.amountPayable || ride?.costPerSeat}
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
  txtInput: {
    height: 44,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.greyBorder,
    borderRadius: 10,
    paddingLeft: 45,
    color: colors.inputTxtGray,
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
});
