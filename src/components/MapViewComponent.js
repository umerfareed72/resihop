import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  PermissionsAndroid,
  Platform,
  View,
  Text,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {colors} from '../utilities';

import StartMatchingSheet from './StartMatchingSheet';
import NearestDriverCard from './NearestDriverCard';
import AvailableDrivers from './AvailableDriversCard';

const MapViewComponent = ({rideModals, setModal, style}) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    getLocation();
  }, []);

  let customMarkers = [
    {
      id: 1,
      latitude: 31.526219,
      longitude: 74.342077,
      text: '20 SEK | 20 M',
    },
    {
      id: 2,
      latitude: 31.523227,
      longitude: 74.34243,
      text: '20 SEK | 20 M',
    },
    {
      id: 3,
      latitude: 31.525761,
      longitude: 74.346379,
      text: '20 SEK | 20 M',
    },
    {
      id: 4,
      latitude: 31.523259,
      longitude: 74.347673,
      text: '20 SEK | 20 M',
    },
  ];

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
      if (permission && permission === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            console.log('Position', position);
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
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 31.524909,
          longitude: 74.34291,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
        //onRegionChange={regionChanged}

        followsUserLocation={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        style={style ? style : {...StyleSheet.absoluteFillObject}}>
        <Marker
          coordinate={{
            latitude: 31.524909,
            longitude: 74.34291,
          }}>
          <View style={styles.currenLocation} />
        </Marker>
        {customMarkers.map(item => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}>
            <View style={styles.driverMarker}>
              <Text style={{color: colors.white}}>{item.text}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
      {rideModals === 'startMatching' ? (
        <StartMatchingSheet setModal={setModal} />
      ) : rideModals === 'finding' ? (
        <NearestDriverCard setModal={setModal} />
      ) : rideModals === 'available' ? (
        <AvailableDrivers />
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
});

export default MapViewComponent;
