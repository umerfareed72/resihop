import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {colors, appIcons} from '../../../utilities';
import MapViewComponent from '../../../components/MapViewComponent';
import {fonts} from '../../../theme';
import RideStatusCards from '../../../components/RideStatusCards';
import {useNavigation} from '@react-navigation/core';
import I18n from '../../../utilities/translations';
import {useDispatch, useSelector} from 'react-redux';
import {
  setOrigin,
  setMapDestination,
  SearchDrives,
  CreateRideRequest,
  setDateTimeStamp,
} from '../../../redux/actions/map.actions';
import moment from 'moment';
import {CopyRideModal, Loader} from '../../../components';
import CalendarSheet from '../../CalendarSheet';

const RideStatus = ({route}) => {
  const {item} = route.params;

  const calendarSheetRef = useRef(null);

  let dispatch = useDispatch();
  let navigation = useNavigation();

  const origin = useSelector(state => state.map.origin);
  const destinationMap = useSelector(state => state.map.destination);
  const dateTimeStamp = useSelector(state => state.map.dateTimeStamp);

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    if (!item.status === 'WAITING_FOR_MATCH') {
      dispatch(
        SearchDrives({
          startLocation: [item?.startLat, item?.startLng],
          destinationLocation: [item?.destinationLat, item?.destinationLng],
          time: moment(item.tripDate).valueOf(),
          seats: item.requiredSeats,
        }),
      );
    }

    return () => {
      dispatch(setOrigin(null));
      dispatch(setMapDestination(null));
      dispatch(SearchDrives(null));
      dispatch(setDateTimeStamp(null));
    };
  }, []);

  const handleCopyRide = () => {
    setModalVisible(false);
    const stamp = moment(
      `${dateTimeStamp}T${moment(item.tripDate).format('HH:mm')}`,
    ).valueOf();
    const body = {
      startLocation: [origin.location.lat, origin.location.lng],
      destinationLocation: [
        destinationMap.location.lat,
        destinationMap.location.lng,
      ],
      date: stamp,
      requiredSeats: item.requiredSeats,
      startDes: origin.description,
      destDes: destinationMap.description,
    };

    dispatch(
      CreateRideRequest(body, setIsLoading, response => {
        console.log('Create Ride', response);
      }),
    );
  };

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
      <RideStatusCards
        statusType={item.status}
        ride={item}
        calendarSheetRef={calendarSheetRef}
      />
      <CalendarSheet
        calendarSheetRef={calendarSheetRef}
        setModalVisible={setModalVisible}
      />
      <CopyRideModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleCopyRide={handleCopyRide}
      />
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
