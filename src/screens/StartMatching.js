import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MyStatusBar from '../components/Header/statusBar';
import MapViewComponent from '../components/MapViewComponent';
import {appIcons, colors} from '../utilities';
import {useSelector, useDispatch} from 'react-redux';
import {SearchDrives} from '../redux/actions/map.actions';

const StartMatching = props => {
  let dispatch = useDispatch();

  const isFocus = useIsFocused();
  const [modal, setModal] = useState(null);

  const origin = useSelector(state => state.map.origin);
  const destinationMap = useSelector(state => state?.map?.destination);
  const availableSeats = useSelector(state => state?.map?.availableSeats);

  const {dateTimeStamp} = props.route.params;

  useEffect(() => {
    if (isFocus) {
      setModal(props?.route?.params?.modalName);
      if (props?.route?.params?.modalName === 'available') {
      } else {
        dispatch(
          SearchDrives({
            startLocation: [origin.location.lat, origin.location.lng],
            destinationLocation: [
              destinationMap.location.lat,
              destinationMap.location.lng,
            ],
            time: dateTimeStamp,
            seats: availableSeats,
          }),
        );
      }
    }
  }, [isFocus]);

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="transparent" />
      <MapViewComponent
        rideModals={modal}
        setModal={setModal}
        modal={modal}
        title={
          props?.route?.params?.modalName === 'finding'
            ? 'Send Request'
            : 'Book Now'
        }
      />
      <TouchableOpacity
        style={styles.arrowBackCircle}
        onPress={() => props?.navigation.goBack()}>
        <Image
          source={appIcons.backArrow}
          resizeMode="contain"
          style={styles.arrowBack}
        />
      </TouchableOpacity>
      {/* {!nearestDriver ? (
        <StartMatchingSheet setNearestDriver={setNearestDriver} />
      ) : availableDrivers ? (
        <AvailableDriversCard
          setAvailableDrivers={setAvailableDrivers}
          setNearestDriver={setNearestDriver}
        />
      ) : (
        <NearestDriverCard setAvailableDrivers={setAvailableDrivers} />
      )} */}
    </View>
  );
};

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
    height: 34,
    width: 34,
    borderRadius: 34 / 2,
    backgroundColor: colors.white,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
    marginLeft: 18,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowColor: colors.dropShadow2,
  },
});

export default StartMatching;
