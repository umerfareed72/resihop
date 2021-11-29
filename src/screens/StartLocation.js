import {useNavigation} from '@react-navigation/core';
import React, {useRef} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {colors} from 'react-native-elements';
import AddressCards from '../components/AddressCards';
import MapViewComponent from '../components/MapViewComponent';
import AddFavrouteLocation from './AddFavrouteLocation';

const StartLocation = props => {
  let navigation = useNavigation();
  const addfavrouiteAddressRef = useRef(null);

  const onPress = () => {
    if (props?.route?.params?.modalName != null) {
      navigation.navigate('CityToCity');
    } else {
      navigation.navigate('CreateRide');
    }
  };

  return (
    <View style={styles.container}>
      <MapViewComponent style={styles.mapStyles} />
      <AddressCards
        modalName={props.route.params.modalName}
        onPress={onPress}
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

export default StartLocation;
