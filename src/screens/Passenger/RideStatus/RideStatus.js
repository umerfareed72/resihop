import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {colors, appIcons, header} from '../../../utilities';
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
  setReturnOrigin,
  setReturnMapDestination,
} from '../../../redux/actions/map.actions';
import moment from 'moment';
import {CopyRideModal, Loader} from '../../../components';
import CalendarSheet from '../../CalendarSheet';
import {post, remove} from '../../../services';
import {Alert} from 'react-native';
import AppHeader from '../../../components/Header/AppHeader';

const RideStatus = ({route}) => {
  const {item} = route.params;
  const calendarSheetRef = useRef(null);
  let dispatch = useDispatch();
  let navigation = useNavigation();

  const origin = useSelector(state => state.map.origin);
  const destinationMap = useSelector(state => state.map.destination);
  const dateTimeStamp = useSelector(state => state.map.dateTimeStamp);
  const auth = useSelector(state => state.auth);
  const [fav, setFav] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [favId, setfavId] = useState('');
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
      setReturnOrigin({
        location: {
          lat: item?.destinationLat,
          lng: item?.destinationLng,
        },
        description: item?.destDes,
      }),
    );

    dispatch(
      setReturnMapDestination({
        location: {lat: item?.startLat, lng: item?.startLng},
        description: item?.startDes,
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
      dispatch(setReturnOrigin(null));
      dispatch(setReturnMapDestination(null));
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
      CreateRideRequest(body, setIsLoading, null, response => {
        navigation?.navigate('PassengerHome');
        console.log('Create Ride', response);
      }),
    );
  };
  //On Add Rating
  const onPressAddRating = async rating => {
    try {
      const requestBody = {
        type: 'Drive',
        drive: item?.drive?._id,
        rating: rating,
        by: auth?.profile_info?._id,
        for: item?.drive?.user?._id,
        ride: item?._id,
      };
      const res = await post(`ratings`, requestBody, await header());
      if (res.data) {
        Alert.alert('Success', 'Ride rated successfully', [
          {
            text: 'OK',
            onPress: () => {
              navigation?.navigate('PassengerHome');
            },
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //On Add Favourite
  const onPressAddFav = async () => {
    try {
      setFav(!fav);
      if (!fav) {
        const requestBody = {
          type: 'DRIVER',
          user: auth?.profile_info?.id,
          driver_passenger: item?.drive?.user?._id,
        };
        const res = await post(`favorites`, requestBody, await header());
        if (res.data) {
          setfavId(res?.data?.id);
          console.log('Favourite');
        }
      } else {
        if (favId != '') {
          const res = await remove(`favorites/${favId}`, await header());
          console.log('UNFAVOURITE');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <MapViewComponent
      // startRide={item.status == 'CONFIRMED' && true}
      />
      <AppHeader
        onPress={() => {
          navigation?.goBack();
        }}
        title={I18n.t('passenger_home')}
      />
      <RideStatusCards
        statusType={item.status}
        ride={item}
        calendarSheetRef={calendarSheetRef}
        onPressAddFav={onPressAddFav}
        onPressAddRating={onPressAddRating}
        fav={fav}
      />
      <CalendarSheet
        calendarSheetRef={calendarSheetRef}
        setModalVisible={setModalVisible}
      />
      <CopyRideModal
        title={'Do you want to copy this Ride to selected date?'}
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
    width: 42,
    backgroundColor: colors.white,
    position: 'absolute',
    justifyContent: 'center',
    top: 50,
    marginLeft: 18,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowColor: colors.dropShadow2,
    borderRadius: 42,
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
