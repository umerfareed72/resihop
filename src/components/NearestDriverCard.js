import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {appIcons, appImages, colors} from '../utilities';

const NearestDriverCard = ({setModal, setHeight}) => {
  useEffect(() => {
    setHeight(Dimensions.get('screen').height - 240);

    const interval = setTimeout(() => {
      setModal('available');
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, []);

  return (
    <View style={styles.mainWrapper}>
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
      <View style={styles.rideInfoContainer}>
        <Text style={styles.date}>12 June, 08:00</Text>
        <View style={styles.imagesContainer}>
          <Image
            source={appImages.seatGreen}
            resizeMode="contain"
            style={styles.greenSeat}
          />
          <Image
            source={appImages.seatGreen}
            resizeMode="contain"
            style={styles.greenSeat}
          />
        </View>
      </View>
      <Text style={styles.driverTxt}>Finding Nearest Driver...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    height: 265,
    backgroundColor: colors.white,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
  addressContainer: {
    height: 42,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    marginTop: 29,
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
  rideInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenSeat: {
    width: 18.75,
    height: 25,
    marginLeft: 10,
  },
  date: {
    fontSize: 15,
    lineHeight: 30,
    color: colors.txtBlack,
  },
  driverTxt: {
    fontSize: 15,
    lineHeight: 30,
    marginLeft: 21,
    marginTop: 20,
  },
});

export default NearestDriverCard;
