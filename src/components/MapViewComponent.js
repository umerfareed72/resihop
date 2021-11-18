import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
    try {
      const permission = Geolocation.requestAuthorization('whenInUse');
      if (permission) {
        Geolocation.getCurrentPosition(
          position => {
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
  }, []);

  const regionChanged = region => {
    console.log(region);
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: 31.524909,
        longitude: 74.34291,
        latitudeDelta: 0.0009,
        longitudeDelta: 0.0009,
      }}
      onRegionChange={regionChanged}
      zoomEnabled={true}
      zoomControlEnabled={true}
      style={{...StyleSheet.absoluteFillObject}}>
      <Marker coordinate={{latitude: 31.524909, longitude: 74.34291}} />
    </MapView>
  );
};

export default MapViewComponent;
