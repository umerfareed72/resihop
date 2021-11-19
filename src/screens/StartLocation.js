import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {colors} from 'react-native-elements';
import MyStatusBar from '../components/Header/statusBar';
import MapViewComponent from '../components/MapViewComponent';

const StartLocation = () => {
  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor={'transparent'} />
      <MapViewComponent modalName={'returnTrip'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default StartLocation;
