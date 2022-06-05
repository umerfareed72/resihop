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
import {MapViewComponent, NearestDriverCard} from '../../components';
import {colors, family, HP, size} from '../../utilities';

const SelectRoute = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MapViewComponent modalName="selectRoute" />
      <NearestDriverCard modalName="selectRoute" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default SelectRoute;
