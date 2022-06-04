import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  PermissionsAndroid,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
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
  profileIcon,
} from '../../utilities';

import MapViewDirections from 'react-native-maps-directions';
import {useSelector, useDispatch} from 'react-redux';
import {
  CreateDriveRequest,
  setDistanceAndTime,
  SetNearestDriver,
  setOrigin,
  setReturnRide,
  setRoutes,
} from '../../redux/actions/map.actions';
import styles from './styles';
import database from '@react-native-firebase/database';
import polyline from '@mapbox/polyline';
import {
  Loader,
  StartMatchingSheet,
  NearestDriverCard,
  AvailableDriversCard,
  RideStatusCards,
  SelectRouteCard,
  AvailablePassengersCard,
  DriveStatusCard,
  OfferReturnDriveCard,
  PickUpInfoCard,
} from '../../components';
import {useNavigation} from '@react-navigation/core';
import Geocoder from 'react-native-geocoding';

export const MapViewComponent = ({
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
  const navigation = useNavigation();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [height, setHeight] = useState(0);
  const [minDistance, setMinDistance] = useState(0);
  const searchDrivesResponse = useSelector(
    state => state.map.searchDriveResponse,
  );
  const [isLoading, setIsLoading] = useState(false);
  const {
    mapSegment,
    returnOrigin,
    origin,
    destination,
    searchRideResponse,
    returnRide,
    settings,
  } = useSelector(state => state.map);
  const returnDestinationMap = useSelector(
    state => state.map.returnDestination,
  );
  const deltas = useSelector(state => state.map.deltas);
  const walkingDistance = useSelector(state => state.map.walkingDistance);
  const routes = useSelector(state => state.map.all_routes);

  const [selectedPath, setSelectedPath] = useState(0);
  var watchId;
  const mapRef = useRef(null);
  const [zoomLevel, setzoomLevel] = useState(20);

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

  const handlePathChange = (item, index) => {
    if (index === selectedPath) return;
    setzoomLevel(14);
    setSelectedPath(index);
    const dis = item?.legs[0]?.distance?.text;
    const mins = item?.legs[0]?.duration?.text;
    dispatch(
      setDistanceAndTime({
        distance: dis,
        duration: mins,
      }),
    );
  };

  //On Load Routes
  useEffect(() => {
    if (routes?.selectedRoutes != null) {
      setzoomLevel(14);
      const dis = routes?.selectedRoutes[0]?.legs[0]?.distance?.text;
      const mins = routes?.selectedRoutes[0]?.legs[0]?.duration?.text;
      dispatch(
        setDistanceAndTime({
          distance: dis,
          duration: mins,
        }),
      );
      return () => {
        dispatch(setRoutes(null));
        dispatch(setReturnRide(null));
        setzoomLevel(20);
      };
    }
  }, []);

  const handleCreateDrive = () => {
    const body = {
      startLocation: routes?.startLocation,
      destinationLocation: routes?.destinationLocation,
      date: routes?.date,
      availableSeats: routes?.availableSeats,
      path: selectedPath,
      costPerSeat: routes?.costPerSeat,
      interCity: routes?.interCity,
      startDes: routes?.startDes,
      destDes: routes?.destDes,
    };
    if (returnRide) {
      const returnBody = {
        startLocation: returnRide?.startLocation,
        destinationLocation: returnRide?.destinationLocation,
        date: returnRide?.date,
        availableSeats: returnRide?.availableSeats,
        path: selectedPath,
        costPerSeat: returnRide?.costPerSeat,
        interCity: returnRide?.interCity,
        startDes: returnRide?.startDes,
        destDes: returnRide?.destDes,
      };
      console.log(returnBody);
      dispatch(
        CreateDriveRequest(returnBody, setIsLoading, async response => {
          if (response?.error) {
            Alert.alert('Failed', response?.message[0]?.messages[0]?.message);
          } else {
            navigation.navigate('DriverHome');
          }
        }),
      );
    }
    console.log(body);
    dispatch(
      CreateDriveRequest(body, setIsLoading, async response => {
        if (response?.error) {
          console.log(
            response?.message || response?.message[0]?.messages[0]?.message,
          );
          Alert.alert(
            'Failed',
            response?.message || response?.message[0]?.messages[0]?.message,
          );
        } else {
          navigation.navigate('DriverHome');
        }
      }),
    );
  };
  //On Drag Set location
  const onDragSetLocation = e => {
    const coords = e.nativeEvent.coordinate;
    Geocoder.from(coords.latitude, coords.longitude)
      .then(json => {
        var addressComponent = json.results[0]?.formatted_address;
        dispatch(
          setOrigin({
            location: {lat: coords.latitude, lng: coords.longitude},
            description: addressComponent,
          }),
        );
        googleAutoComplete.current?.setAddressText(addressComponent);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <>
      <MapView
        onDoublePress={() => {
          setzoomLevel(20);
        }}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: origin !== null ? origin.location.lat : latitude,
          longitude: origin !== null ? origin.location.lng : longitude,
          latitudeDelta: deltas ? deltas.latDelta : 0.005,
          longitudeDelta: deltas ? deltas.lngDelta : 0.005,
        }}
        maxZoomLevel={zoomLevel}
        zoomEnabled={true}
        scrollEnabled={true}
        style={
          style
            ? style
            : height
            ? {height: height, ...StyleSheet.absoluteFillObject}
            : {...StyleSheet.absoluteFillObject}
        }>
        {origin && destination && !routes?.selectedRoutes && (
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

        {routes?.selectedRoutes &&
          routes?.selectedRoutes?.map((item, index) => {
            return (
              <Polyline
                key={index}
                strokeWidth={4}
                tappable={true}
                onPress={() => handlePathChange(item, index)}
                strokeColor={selectedPath == index ? 'green' : 'grey'}
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
            draggable={rideModals == 'startLocation' ? true : false}
            identifier="location"
            onDragEnd={e => {
              onDragSetLocation(e);
            }}
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}>
            <Image source={appIcons.startLocatin} style={styles.locationImg} />
          </Marker>
        )}

        {destination?.location && (
          <Marker
            identifier="destination"
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}>
            <Image
              source={appIcons.destination}
              style={styles.destinationIcon}
            />
          </Marker>
        )}

        {/* Search Passenger List */}

        {searchRideResponse !== null && searchRideResponse?.length > 0
          ? searchRideResponse?.map(ride => {
              return (
                <Marker
                  identifier="ride"
                  coordinate={{
                    latitude: ride.startLat,
                    longitude: ride.startLng,
                  }}>
                  <View style={styles.rideImageCon}>
                    <Image
                      style={styles.rideImage}
                      source={{
                        uri: ride?.user?.picture?.url || profileIcon,
                      }}
                    />
                  </View>
                </Marker>
              );
            })
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
        <SelectRouteCard
          setModal={setModal}
          setHeight={setHeight}
          onPressCreateDrive={handleCreateDrive}
        />
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
      {isLoading && <Loader />}
    </>
  );
};
