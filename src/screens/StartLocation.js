import {useNavigation} from '@react-navigation/core';
import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {colors} from 'react-native-elements';
import AddressCards from '../components/AddressCards';
import MapViewComponent from '../components/MapViewComponent';
import AddFavrouteLocation from './AddFavrouteLocation';

const StartLocation = props => {
  let navigation = useNavigation();
  const addfavrouiteAddressRef = useRef(null);

  const [favName, setfavName] = useState();

  const onPress = () => {
    navigation?.goBack();
  };

  return (
    <View style={styles.container}>
      <MapViewComponent style={styles.mapStyles} />
      <AddressCards
        modalName={props.route.params.modalName}
        addfavrouiteAddressRef={addfavrouiteAddressRef}
        onPress={onPress}
        favName={favName}
      />
      <AddFavrouteLocation
        addfavrouiteAddressRef={addfavrouiteAddressRef}
        setfavName={setfavName}
        favName={favName}
        modalName={props?.route?.params?.modalName}
      />
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
