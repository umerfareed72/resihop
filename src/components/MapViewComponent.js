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
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import Geolocation, {
  getCurrentPosition,
} from 'react-native-geolocation-service';
import {
  appImages,
  colors,
  appIcons,
  GeoCoderHelper,
  APIKEY,
  mode,
} from '../utilities';
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
import {
  setDistanceAndTime,
  SetNearestDriver,
  setOrigin,
} from '../redux/actions/map.actions';
import {fonts} from '../theme';
import database from '@react-native-firebase/database';
import polyline from '@mapbox/polyline';

const MapViewComponent = ({
  rideModals,
  title,
  setModal,
  style,
  modal,
  status,
  onPressCancel,
  startRide,
  onPressCopyDrive,
  googleAutoComplete,
}) => {
  let dispatch = useDispatch();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [height, setHeight] = useState(0);
  const [minDistance, setMinDistance] = useState();
  const origin = useSelector(state => state.map.origin);
  const destination = useSelector(state => state.map.destination);
  const searchRideResponse = useSelector(state => state.map.searchRideResponse);
  const searchDrivesResponse = useSelector(
    state => state.map.searchDriveResponse,
  );
  const mapSegment = useSelector(state => state.map.mapSegment);
  const returnOrigin = useSelector(state => state.map.returnOrigin);
  const returnDestinationMap = useSelector(
    state => state.map.returnDestination,
  );
  const deltas = useSelector(state => state.map.deltas);
  const walkingDistance = useSelector(state => state.map.walkingDistance);
  const routes = useSelector(state => state.map.all_routes);

  var watchId;
  const mapRef = useRef(null);
  useEffect(() => {
    getLocation();
    if (startRide) {
      getLiveLocation();
    }
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);
  //Get Live Location
  const getLiveLocation = async () => {
    let permission;
    try {
      if (Platform.OS === 'ios') {
        permission = await Geolocation.requestAuthorization('whenInUse');
      } else {
        permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
      if (permission || permission === 'granted') {
        watchId = Geolocation.watchPosition(
          position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            dispatch(
              setOrigin({
                location: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
                description: '',
              }),
            );
            var starCountRef = database().ref('live').child('Arose');
            starCountRef.on('value', snapshot => {
              const data = snapshot.val();
            });
          },
          error => {
            console.log(error.code, error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            distanceFilter: 0,
            useSignificantChanges: true,
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!origin || !destination || !searchRideResponse) return;
    mapRef.current.fitToSuppliedMarkers(
      ['location', 'destination', 'ride', 'driver'],
      {
        edgePadding: {
          top: 70,
          right: 70,
          bottom: 70,
          left: 70,
        },
      },
    );
  }, [origin, destination]);

  useEffect(() => {
    if (searchDrivesResponse && searchDrivesResponse?.length > 0) {
      let min = parseInt(searchDrivesResponse[0].distance * 111 * 1000);
      let nearest = searchDrivesResponse[0];

      for (let i = 0; i < searchDrivesResponse.length; i++) {
        if (parseInt(searchDrivesResponse[i].distance * 111 * 1000) < min) {
          min = parseInt(searchDrivesResponse[i].distance * 111 * 1000);
          nearest = searchDrivesResponse[i];
        }
      }

      setMinDistance(min);
      dispatch(SetNearestDriver(nearest));
    }
  }, [searchDrivesResponse]);

  const getLocation = async () => {
    let permission;

    try {
      if (Platform.OS === 'ios') {
        permission = await Geolocation.requestAuthorization('whenInUse');
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

  const GoToCurrentLocation = () => {
    mapRef.current.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,

      duration: 2,
    });
  };

  const zoomToDriver = item => {
    mapRef.current.animateToRegion({
      latitude: item.drive.startLocation.latitude,
      longitude: item.drive.startLocation.longitude,
      latitudeDelta: 0.0001,
      longitudeDelta: 0.0001,

      duration: 2,
    });
  };

  if (mapSegment === 'returnTrip') {
    return (
      <>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: origin !== null ? origin.location.lat : latitude,
            longitude: origin !== null ? origin.location.lng : longitude,
            latitudeDelta: deltas ? deltas.latDelta : 0.005,
            longitudeDelta: deltas ? deltas.lngDelta : 0.005,
          }}
          zoomEnabled={true}
          style={
            style
              ? style
              : height
              ? {height: height, ...StyleSheet.absoluteFillObject}
              : {...StyleSheet.absoluteFillObject}
          }>
          <Marker
            identifier="currentPosition"
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}>
            <View style={styles.currenLocation} />
          </Marker>

          {returnOrigin && returnDestinationMap && (
            <MapViewDirections
              origin={returnOrigin.description}
              destination={returnDestinationMap.description}
              apikey={'AIzaSyBq3-UEY9QO9X45s8w54-mrwjBQekzDlsA'}
              strokeWidth={3}
              strokeColor={'#007BD2'}
              mode="DRIVING"
              timePrecision="now"
              precision="high"
              onReady={result => {
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

          {returnOrigin?.location && (
            <Marker
              identifier="location"
              coordinate={{
                latitude: returnOrigin.location.lat,
                longitude: returnOrigin.location.lng,
              }}
              icon={appIcons.startLocatin}
            />
          )}

          {returnDestinationMap?.location && (
            <Marker
              identifier="destination"
              coordinate={{
                latitude: returnDestinationMap.location.lat,
                longitude: returnDestinationMap.location.lng,
              }}
            />
          )}
        </MapView>
        <TouchableOpacity
          style={styles.currentLocationWrapper}
          activeOpacity={0.8}
          onPress={() => GoToCurrentLocation()}>
          <Image
            source={appImages.currentLocation}
            resizeMode="contain"
            style={styles.currentLocation}
          />
        </TouchableOpacity>
      </>
    );
  }

  return (
    <>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: origin !== null ? origin.location.lat : latitude,
          longitude: origin !== null ? origin.location.lng : longitude,
          latitudeDelta: deltas ? deltas.latDelta : 0.005,
          longitudeDelta: deltas ? deltas.lngDelta : 0.005,
        }}
        //onRegionChange={regionChanged}
        zoomEnabled={true}
        scrollEnabled={true}
        style={
          style
            ? style
            : height
            ? {height: height, ...StyleSheet.absoluteFillObject}
            : {...StyleSheet.absoluteFillObject}
        }>
        {origin && destination && (
          <MapViewDirections
            origin={{
              latitude: origin !== null ? origin.location.lat : latitude,
              longitude: origin !== null ? origin.location.lng : longitude,
            }}
            destination={destination.description}
            apikey={'AIzaSyBq3-UEY9QO9X45s8w54-mrwjBQekzDlsA'}
            strokeWidth={3}
            strokeColor={'#007BD2'}
            mode="DRIVING"
            timePrecision="now"
            precision="high"
            waypoints={routes?.forEach(item => {
              if (item) {
                return polyline
                  .decode(item?.overview_polyline.points)
                  .forEach(data => {
                    return {latitude: data[0], longitude: data[1]};
                  });
              }
            })}
            onReady={result => {
              dispatch(
                setDistanceAndTime({
                  distance: result.distance,
                  duration: result.duration,
                }),
              );
              if (!startRide) {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 70,
                    bottom: 70,
                    left: 70,
                    top: 70,
                  },
                });
              }
            }}
          />
        )}

        {routes?.map((item, index) => {
          console.log(
            polyline.decode(item?.overview_polyline.points).map(data => {
              return {
                latitude: data[0],
                longitude: data[1],
              };
            }),
          );
          return (
            <Polyline
              key={index}
              strokeWidth={4}
              tappable={true}
              // onPress={() => handlePathChange(index)}
              strokeColor={'green'}
              coordinates={polyline
                .decode(item?.overview_polyline.points)
                .map(data => {
                  return {
                    latitude: data[0],
                    longitude: data[1],
                  };
                })}
            />
          );
        })}
        {!startRide ? (
          <Marker
            identifier="currentPosition"
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}>
            <View style={styles.currenLocation} />
          </Marker>
        ) : (
          false
        )}
        {origin?.location && (
          <Marker
            identifier="location"
            draggable={rideModals == 'startLocation' ? true : false}
            onDragEnd={e => {
              GeoCoderHelper(
                e.nativeEvent.coordinate?.latitude,
                e.nativeEvent.coordinate?.longitude,
                dispatch,
                googleAutoComplete,
              );
            }}
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            icon={startRide ? appIcons.DriverCar : appIcons.startLocatin}
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

        {/* Search Passenger List */}

        {searchRideResponse !== null && searchRideResponse?.length > 0
          ? searchRideResponse?.map(ride => (
              <Marker
                identifier="ride"
                coordinate={{
                  latitude: ride.startLat,
                  longitude: ride.startLng,
                }}
              />
            ))
          : null}

        {/* Search Driver List */}
        {searchDrivesResponse !== null && searchDrivesResponse?.length > 0
          ? searchDrivesResponse.map(driver => (
              <Marker
                identifier="driver"
                coordinate={{
                  latitude: driver?.drive?.startLocation?.latitude,
                  longitude: driver?.drive?.startLocation?.longitude,
                }}
                onPress={() => {
                  zoomToDriver(driver);
                  dispatch(SetNearestDriver(driver));
                }}>
                <View
                  style={[
                    styles.driverCard,
                    {
                      backgroundColor:
                        parseInt(driver.distance * 111 * 1000) === minDistance
                          ? colors.green
                          : colors.blue,
                      display:
                        driver.distance * 111 * 1000 < walkingDistance
                          ? 'flex'
                          : 'none',
                    },
                  ]}>
                  <Text style={styles.driverTxt}>{`${
                    driver.drive.costPerSeat
                  } NOk | ${parseInt(driver.distance * 111 * 1000)} M`}</Text>
                </View>
              </Marker>
            ))
          : null}
      </MapView>

      <TouchableOpacity
        style={styles.currentLocationWrapper}
        activeOpacity={0.8}
        onPress={() => GoToCurrentLocation()}>
        <Image
          source={appImages.currentLocation}
          resizeMode="contain"
          style={styles.currentLocation}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.currentLocationWrapper2}
        activeOpacity={0.8}
        onPress={() => GoToCurrentLocation()}>
        <Image
          source={appImages.currentLocation}
          resizeMode="contain"
          style={styles.currentLocation}
        />
      </TouchableOpacity>

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
          onPressCopyDrive={onPressCopyDrive}
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
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 20,
    shadowColor: colors.blueLocation,
    shadowRadius: 20,
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
    top: 50,
    right: 16,
  },
  currentLocationWrapper2: {
    position: 'absolute',
    bottom: 25,
    right: 16,
  },
  driverCard: {
    padding: 10,
    backgroundColor: colors.blue,
    borderRadius: 30,
  },
  driverTxt: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 12,
  },
});

export default MapViewComponent;
