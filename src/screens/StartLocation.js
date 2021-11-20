import React, {useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from 'react-native-elements';
import MyStatusBar from '../components/Header/statusBar';
import MapViewComponent from '../components/MapViewComponent';
import AddFavrouteLocation from './AddFavrouteLocation';

const StartLocation = () => {
  const addfavrouiteAddressRef = useRef(null);

  return (
    <View style={styles.container}>
      <MapViewComponent
        modalName={'startLocation'}
        addfavrouiteAddressRef={addfavrouiteAddressRef}
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
