import {useNavigation} from '@react-navigation/core';
import React, {useRef} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {AddressCards, MapViewComponent} from '../../../components';
import AddFavrouteLocation from '../../AddFavrouteLocation';
import {colors} from '../../../utilities';

const StartLocationDriver = ({route}) => {
  let navigation = useNavigation();
  const addfavrouiteAddressRef = useRef(null);
  const googleAutoComplete = useRef();

  const {type, recurring} = route.params;

  return (
    <View style={styles.container}>
      <MapViewComponent
        googleAutoComplete={googleAutoComplete}
        rideModals={type}
        style={styles.mapStyles}
      />
      <AddressCards
        onPress={() => {
          navigation?.goBack();
        }}
        recurring={recurring}
        modalName={type}
        addfavrouiteAddressRef={addfavrouiteAddressRef}
        mode="driver"
        googleAutoComplete={googleAutoComplete}
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
