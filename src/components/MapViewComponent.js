import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const MapViewComponent = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    getLocation();
  }, []);

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
            // See error code charts below.
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
    <MapView
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: latitude, //31.524909,
        longitude: longitude, //74.34291,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      }}
      //onRegionChange={regionChanged}
      zoomEnabled={true}
      zoomControlEnabled={true}
      style={{...StyleSheet.absoluteFillObject}}>
      <Marker coordinate={{latitude: latitude, longitude: longitude}} />
    </MapView>
  );
};

export default MapViewComponent;
