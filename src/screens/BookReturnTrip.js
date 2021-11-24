import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../utilities';
import MapViewComponent from '../components/MapViewComponent';
import {useNavigation} from '@react-navigation/core';

const BookReturnTrip = () => {
  let navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('BookingDetails');
  };

  return (
    <View style={styles.container}>
      <MapViewComponent modalName={'returnTrip'} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default BookReturnTrip;
