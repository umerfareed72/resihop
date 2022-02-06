import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {colors, appIcons} from '../../../utilities';
import MapViewComponent from '../../../components/MapViewComponent';
import {fonts} from '../../../theme';
import RideStatusCards from '../../../components/RideStatusCards';
import {useNavigation} from '@react-navigation/core';
import I18n from '../../../utilities/translations';
import {useDispatch} from 'react-redux';
import {
  setOrigin,
  setMapDestination,
  SearchDrives,
} from '../../../redux/actions/map.actions';
import moment from 'moment';

const RideStatus = ({route}) => {
  const {item} = route.params;

  let dispatch = useDispatch();
  let navigation = useNavigation();

  useEffect(() => {
    dispatch(
      setOrigin({
        location: {lat: item?.startLat, lng: item?.startLng},
        description: item?.startDes,
      }),
    );
    dispatch(
      setMapDestination({
        location: {
          lat: item?.destinationLat,
          lng: item?.destinationLng,
        },
        description: item?.destDes,
      }),
    );

    dispatch(
      SearchDrives({
        startLocation: [item?.startLat, item?.startLng],
        destinationLocation: [item?.destinationLat, item?.destinationLng],
        time: moment(item.tripDate).valueOf(),
        seats: item.requiredSeats,
      }),
    );

    return () => {
      dispatch(setOrigin(null));
      dispatch(setMapDestination(null));
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapViewComponent />
      <TouchableOpacity
        style={styles.arrowBackCircle}
        onPress={() => navigation.goBack()}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={appIcons.backArrow}
            resizeMode="contain"
            style={styles.arrowBack}
          />
          <Text style={styles.driver}>{I18n.t('ride')}</Text>
        </View>
      </TouchableOpacity>
      <RideStatusCards statusType={item.status} />
    </View>
  );
};

export default RideStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  arrowBack: {
    height: 15,
    width: 15,
  },
  arrowBackCircle: {
    height: 42,
    width: '85%',
    backgroundColor: colors.white,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    top: 50,
    marginLeft: 18,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowColor: colors.dropShadow2,
    borderRadius: 10,
    paddingLeft: 14,
  },
  driver: {
    fontSize: 16,
    fontFamily: fonts.regular,
    lineHeight: 26,
    color: colors.txtBlack,
    marginLeft: 16,
  },
});
