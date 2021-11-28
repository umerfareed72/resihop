import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MyStatusBar from '../components/Header/statusBar';
import MapViewComponent from '../components/MapViewComponent';
import {appIcons, colors} from '../utilities';

const StartMatching = props => {
  let navigation = useNavigation();
  const [modal, setModal] = useState(props?.route?.params?.modalName);

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="transparent" />
      <MapViewComponent
        rideModals={modal}
        setModal={setModal}
        title={
          props?.route?.params?.modalName === 'finding'
            ? 'Send Request'
            : 'Book Now'
        }
      />
      <TouchableOpacity
        style={styles.arrowBackCircle}
        onPress={() => navigation.goBack()}>
        <Image
          source={appIcons.backArrow}
          resizeMode="contain"
          style={styles.arrowBack}
        />
      </TouchableOpacity>
      {/* {!nearestDriver ? (
        <StartMatchingSheet setNearestDriver={setNearestDriver} />
      ) : availableDrivers ? (
        <AvailableDriversCard
          setAvailableDrivers={setAvailableDrivers}
          setNearestDriver={setNearestDriver}
        />
      ) : (
        <NearestDriverCard setAvailableDrivers={setAvailableDrivers} />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  arrowBack: {
    height: 15,
    width: 15,
  },
  arrowBackCircle: {
    height: 34,
    width: 34,
    borderRadius: 34 / 2,
    backgroundColor: colors.white,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
    marginLeft: 18,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowColor: colors.dropShadow2,
  },
});

export default StartMatching;
