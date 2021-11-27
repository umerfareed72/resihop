import {useNavigation} from '@react-navigation/core';
import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {CustomHeader} from '../../components';
import MyStatusBar from '../../components/Header/statusBar';
import MapViewComponent from '../../components/MapViewComponent';
import NearestDriverCard from '../../components/NearestDriverCard';
import {colors, family, HP, size} from '../../utilities';
import AvailableDrivers from '../../components/AvailableDriversCard';
const AvailablePassengerMap = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MapViewComponent modalName="selectRoute" />
      <AvailableDrivers modalName="availableDrivers" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default AvailablePassengerMap;
