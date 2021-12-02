import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fonts} from '../theme';
import {appImages, colors} from '../utilities';
import CallIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/core';

const DriveStatusCard = ({status, setModal, onPressCancel}) => {
  const [seats, setSeats] = useState([1, 2, 3, 4]);

  let navigation = useNavigation();

  const passengerData = [
    {
      id: 1,
      name: 'John Deo',
      pickUp: 'Coming to My start Location',
      time: '08:00',
    },
    {
      id: 2,
      name: 'John Deo',
      pickUp: 'Coming to My start Location',
      time: '08:00',
    },
    {
      id: 3,
      name: 'John Deo',
      pickUp: 'Coming to My start Location',
      time: '08:00',
    },
    {
      id: 4,
      name: 'John Deo',
      pickUp: 'Coming to My start Location',
      time: '08:00',
    },
  ];

  if (status === 'Waiting for Match') {
    return (
      <View style={styles.waitcontainer}>
        <View style={styles.heading}>
          <Text style={styles.bookedTxt}>Booked Passenger(s)</Text>
          <View style={styles.seatContainer}>
            {seats.map(() => (
              <Image
                source={appImages.seatBlue}
                resizeMode="contain"
                style={styles.seat}
              />
            ))}
          </View>
        </View>
        <View
          style={[
            styles.statusContainer,
            {borderColor: getStatusColo(status)},
          ]}>
          <Text style={[styles.statusTxt, {color: getStatusColo(status)}]}>
            {status}
          </Text>
        </View>
        <View style={[styles.btnWrapper, {width: '90%'}]}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => navigation.navigate('UpdateDrive')}>
            <Text style={styles.btnTxt}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.btnTxt}>Copy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCancel} style={styles.btnContainer}>
            <Text style={styles.btnTxt}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.bookedTxt}>Booked Passenger(s)</Text>
        <View style={styles.seatContainer}>
          {seats.map(() => (
            <Image
              source={appImages.seatBlue}
              resizeMode="contain"
              style={styles.seat}
            />
          ))}
        </View>
      </View>
      <View
        style={[styles.statusContainer, {borderColor: getStatusColo(status)}]}>
        <Text style={[styles.statusTxt, {color: getStatusColo(status)}]}>
          {status}
        </Text>
      </View>
      <View>
        <FlatList
          data={passengerData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <PassengerInfoCard
              onPressCard={() => {
                navigation?.navigate('AddFavourites');
              }}
              item={item}
            />
          )}
        />
      </View>
      <Text style={styles.warnTxt}>
        (Calls are allowed after, when it is 1 hour remaining from the departure
        time)
      </Text>
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnTxt}>Copy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnTxt}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.startTripContainer}
        onPress={() => setModal('offerReturnDrive')}>
        <Icon name="angle-double-right" size={30} color={colors.white} />
        <Text style={styles.startTripTxt}>Start Drive</Text>
      </TouchableOpacity>
    </View>
  );
};

const PassengerInfoCard = ({item, onPressCard}) => {
  return (
    <View style={styles.passengerInfoContainer}>
      <TouchableOpacity onPress={onPressCard} style={styles.nameContainer}>
        <Text style={{fontFamily: fonts.regular}}>{item.name}</Text>
        <Image
          source={appImages.driver}
          resizeMode="cover"
          style={styles.driver}
        />
      </TouchableOpacity>
      <Text style={styles.pickUp}>{item.pickUp}</Text>
      <View style={styles.btnMainContainer}>
        <Text style={{fontFamily: fonts.regular}}>{item.time}</Text>
        <TouchableOpacity style={styles.callNowContainer}>
          <CallIcon name="call" size={15} color={colors.white} />
          <Text style={styles.callNowTxt}>Call Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DriveStatusCard;

const styles = StyleSheet.create({
  container: {
    height: 452,
    width: '100%',
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  seat: {
    height: 25,
    width: 18,
    marginLeft: 9,
  },
  seatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookedTxt: {
    fontFamily: fonts.regular,
    fontSize: 20,
    lineHeight: 26,
    color: colors.txtBlack,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  statusTxt: {
    fontFamily: fonts.bebasBold,
    fontSize: 16,
    lineHeight: 16,
  },
  statusContainer: {
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    height: 23,
    justifyContent: 'center',
    marginHorizontal: 25,
    alignSelf: 'flex-start',
    marginTop: 18,
  },
  passengerInfoContainer: {
    height: 107,
    borderWidth: 1,
    borderColor: colors.g1,
    borderRadius: 10,
    width: 211,
    marginLeft: 20,
    marginTop: 18,
  },
  driver: {
    height: 41,
    width: 41,
    borderRadius: 41 / 2,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  callNowContainer: {
    height: 25,
    width: 82,
    backgroundColor: colors.green,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callNowTxt: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.white,
    lineHeight: 26,
    marginLeft: 3,
  },
  btnMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    width: '90%',
    alignSelf: 'center',
  },
  pickUp: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.txtBlack,
    marginLeft: 10,
  },
  warnTxt: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 22,
    textAlign: 'center',
    color: colors.g1,
    marginTop: 20,
  },
  btnContainer: {
    height: 36,
    width: 100,
    backgroundColor: colors.txtBlack,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 26,
    color: colors.white,
  },
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '60%',
    alignSelf: 'center',
  },
  startTripContainer: {
    height: 56,
    width: 300,
    backgroundColor: colors.green,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 25,
    flexDirection: 'row',
    paddingLeft: 25,
    marginTop: 20,
  },
  startTripTxt: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 26,
    color: colors.white,
    marginLeft: 17,
  },
  waitcontainer: {
    height: 217,
    width: '100%',
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
});

const getStatusColo = status => {
  if (status === 'Fully Booked') {
    return colors.green;
  }
  if (status === 'Partially Booked') {
    return colors.blue;
  }
  if (status === 'Waiting for Match') {
    return colors.orange;
  }
};