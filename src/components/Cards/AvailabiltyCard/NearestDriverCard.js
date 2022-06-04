import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  appIcons,
  appImages,
  colors,
  family,
  size,
  HP,
} from '../../../utilities';
import {fonts} from '../../../theme';
import I18n from '../../../utilities/translations';
import {useSelector} from 'react-redux';
import moment from 'moment';

export const NearestDriverCard = ({setModal, setHeight, modalName}) => {
  const {all_routes, createRideRequestResponse} = useSelector(
    state => state.map,
  );

  const [requiredSeats, setRequiredSeats] = useState([]);

  useEffect(() => {
    for (let i = 0; i < all_routes?.requiredSeats; i++) {
      requiredSeats[i] = i;
    }
    setHeight(Dimensions.get('screen').height - 240);

    const interval = setTimeout(() => {
      setModal('available');
    }, 2000);

    return () => {
      clearTimeout(interval);
    };
  }, []);
  return (
    <View style={styles.mainWrapper}>
      {modalName === 'selectRoute' && (
        <Text style={styles.topText}>{I18n.t('min24')}</Text>
      )}
      <View style={styles.addressContainer}>
        <Text style={styles.addressTxt}>
          {createRideRequestResponse?.startDes || all_routes?.drive?.startDes}
        </Text>
        <View style={styles.addressCircle} />
      </View>
      <View style={[styles.addressContainer, {marginTop: 21}]}>
        <Text style={styles.addressTxt}>
          {createRideRequestResponse?.destDes || all_routes?.drive?.destDes}
        </Text>
        <View style={styles.addressSquare} />
      </View>
      <View style={styles.rideInfoContainer}>
        {createRideRequestResponse?.tripDate == 'Invalid date' ||
        all_routes?.tripDate == 'Invalid date' ? (
          false
        ) : (
          <Text style={styles.date}>
            {moment(
              createRideRequestResponse?.tripDate || all_routes?.tripDate,
            ).format('DD MMM, HH:mm')}
          </Text>
        )}
        <View style={styles.imagesContainer}>
          {requiredSeats.map(seat => (
            <Image
              key={seat}
              source={appImages.seatGreen}
              resizeMode="contain"
              style={styles.greenSeat}
            />
          ))}
        </View>
      </View>
      {modalName !== 'selectRoute' && (
        <Text style={styles.driverTxt}>{I18n.t('finding')}</Text>
      )}
      {modalName === 'selectRoute' && (
        <TouchableOpacity style={styles.selectRouteButtom}>
          <Text style={styles.routeText}>{I18n.t('select_route')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topText: {
    color: colors.light_black,
    fontSize: size.large,
    fontFamily: family.product_sans_bold,
    marginTop: HP('2'),
    marginHorizontal: HP('3'),
  },
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
    fontFamily: fonts.regular,
  },
  driverTxt: {
    fontSize: 15,
    lineHeight: 30,
    marginLeft: 21,
    marginTop: 20,
    fontFamily: fonts.regular,
  },
  selectRouteButtom: {
    height: HP('7'),
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: HP('3'),
    borderRadius: 14,
    marginVertical: HP('3'),
  },
  routeText: {
    fontSize: size.large,
    fontFamily: fonts.regular,
    color: colors.white,
  },
});
