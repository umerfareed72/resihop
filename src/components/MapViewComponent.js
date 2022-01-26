import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  PermissionsAndroid,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {appImages, colors} from '../utilities';

import StartMatchingSheet from './StartMatchingSheet';
import NearestDriverCard from './NearestDriverCard';
import AvailableDriversCard from './AvailableDriversCard';
import RideStatusCards from './RideStatusCards';
import SelectRouteCard from './SelectRouteCard';
import AvailablePassengersCard from './AvailablePassengersCard';
import DriveStatusCard from './DriveStatusCard';
import OfferReturnDriveCard from './OfferReturnDriveCard';
import PickUpInfoCard from './PickUpInfoCard';

import MapViewDirections from 'react-native-maps-directions';
import {useSelector, useDispatch} from 'react-redux';
import {setDistanceAndTime} from '../redux/actions/map.actions';

const MapViewComponent = ({
  rideModals,
  title,
  setModal,
  style,
  modal,
  status,
  onPressCancel,
}) => {
  let dispatch = useDispatch();

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [height, setHeight] = useState(0);

  const origin = useSelector(state => state.map.origin);
  const destination = useSelector(state => state.map.destination);
  const searchRideResponse = useSelector(state => state.map.searchRideResponse);
  const searchDrivesResponse = useSelector(
    state => state.map.searchDriveResponse,
  );

  const mapRef = useRef();

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (!origin || !destination || !searchRideResponse) return;
    mapRef.current.fitToSuppliedMarkers(['location', 'destination', 'ride'], {
      edgePadding: {
        top: 70,
        right: 70,
        bottom: 70,
        left: 70,
      },
    });
  }, [origin, destination, searchRideResponse]);

  const getLocation = async () => {
    let permission;

    try {
      if (Platform.OS === 'ios') {
        permission = Geolocation.requestAuthorization('whenInUse');
      } else {
        permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
      if (permission || permission === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: origin !== null ? origin.location.lat : latitude,
          longitude: origin !== null ? origin.location.lng : longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        //onRegionChange={regionChanged}
        zoomEnabled={true}
        style={
          style
            ? style
            : height
            ? {height: height, ...StyleSheet.absoluteFillObject}
            : {...StyleSheet.absoluteFillObject}
        }>
        {origin && destination && (
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey={'AIzaSyCDp-9R6VeL2G-8BpsHHxJSNkD5ZKyTZok'}
            strokeWidth={3}
            strokeColor="black"
            mode="DRIVING"
            timePrecision="now"
            precision="high"
            onReady={result => {
              dispatch(
                setDistanceAndTime({
                  distance: result.distance,
                  duration: result.duration,
                }),
              );

              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 70,
                  bottom: 70,
                  left: 70,
                  top: 70,
                },
              });
            }}
          />
        )}

        <Marker
          identifier="currentPosition"
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}>
          <View style={styles.currenLocation} />
        </Marker>
        {origin?.location && (
          <Marker
            identifier="location"
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
          />
        )}

        {destination?.location && (
          <Marker
            identifier="destination"
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
          />
        )}

        {searchRideResponse !== null
          ? searchRideResponse.map(ride => (
              <Marker
                identifier="ride"
                coordinate={{
                  latitude: ride.startLat,
                  longitude: ride.startLng,
                }}
              />
            ))
          : null}
      </MapView>
      <View style={styles.currentLocationWrapper}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => getLocation()}>
          <Image
            source={appImages.currentLocation}
            resizeMode="contain"
            style={styles.currentLocation}
          />
        </TouchableOpacity>
      </View>
      {rideModals === 'startMatching' ? (
        <StartMatchingSheet setModal={setModal} setHeight={setHeight} />
      ) : rideModals === 'finding' ? (
        <NearestDriverCard setModal={setModal} setHeight={setHeight} />
      ) : rideModals === 'available' ? (
        <AvailableDriversCard
          setHeight={setHeight}
          title={title}
          btnText={title}
        />
      ) : rideModals === 'selectRoute' ? (
        <SelectRouteCard setModal={setModal} setHeight={setHeight} />
      ) : rideModals === 'availablePassenger' ? (
        <AvailablePassengersCard />
      ) : rideModals === 'driveStatus' ? (
        <DriveStatusCard
          status={status}
          setModal={setModal}
          onPressCancel={onPressCancel}
        />
      ) : rideModals === 'offerReturnDrive' ? (
        <OfferReturnDriveCard />
      ) : rideModals === 'pickUpInfo' ? (
        <PickUpInfoCard title={title} />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  currenLocation: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: colors.blueLocation,
    borderWidth: 2,
    borderColor: colors.white,
  },
  driverMarker: {
    height: 28,
    paddingHorizontal: 10,
    backgroundColor: colors.blue,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentLocation: {
    height: 42,
    width: 42,
  },
  currentLocationWrapper: {
    position: 'absolute',
    bottom: 25,
    right: 16,
  },
});

export default MapViewComponent;
