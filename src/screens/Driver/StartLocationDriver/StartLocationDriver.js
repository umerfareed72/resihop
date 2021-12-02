import {useNavigation} from '@react-navigation/core';
import React, {useRef} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import AddressCards from '../../../components/AddressCards';
import MapViewComponent from '../../../components/MapViewComponent';
import AddFavrouteLocation from '../../AddFavrouteLocation';
import {colors} from '../../../utilities';

const StartLocationDriver = ({route}) => {
  let navigation = useNavigation();
  const addfavrouiteAddressRef = useRef(null);

  const {type} = route.params;

  return (
    <View style={styles.container}>
      <MapViewComponent style={styles.mapStyles} />
      <AddressCards
        modalName={type}
        addfavrouiteAddressRef={addfavrouiteAddressRef}
        mode="driver"
      />
      <AddFavrouteLocation addfavrouiteAddressRef={addfavrouiteAddressRef} />
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
    marginTop: Dimensions.get('window').height / 2,
  },
});

export default StartLocationDriver;