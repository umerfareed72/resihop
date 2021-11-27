import {useNavigation} from '@react-navigation/core';
import React, {useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from 'react-native-elements';
import MapViewComponent from '../components/MapViewComponent';
import AddFavrouteLocation from './AddFavrouteLocation';

const StartLocation = () => {
  let navigation = useNavigation();
  const addfavrouiteAddressRef = useRef(null);

  const onPress = () => {
    navigation.navigate('StartMatching');
  };

  return (
    <View style={styles.container}>
      <MapViewComponent
        modalName={'startLocation'}
        addfavrouiteAddressRef={addfavrouiteAddressRef}
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
});

export default StartLocation;
