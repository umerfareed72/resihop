import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {colors} from '../utilities';
import {MapViewComponent} from '../components';
import {useNavigation} from '@react-navigation/core';
import {AddressCards} from '../components';

const BookReturnTrip = () => {
  let navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('BookingDetails');
  };

  return (
    <View style={styles.container}>
      <MapViewComponent style={styles.mapStyles} />
      <AddressCards modalName={'returnTrip'} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mapStyles: {
    flex: 1,
    marginTop: Dimensions.get('window').height / 1.55,
  },
});

export default BookReturnTrip;
