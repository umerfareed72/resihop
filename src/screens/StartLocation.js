import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from 'react-native-elements';
import MapViewComponent from '../components/MapViewComponent';

const StartLocation = () => {
  return (
    <View style={styles.container}>
      <MapViewComponent />
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
