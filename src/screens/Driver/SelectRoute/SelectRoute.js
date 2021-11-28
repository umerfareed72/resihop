import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import MapViewComponent from '../../../components/MapViewComponent';
import {colors, appIcons} from '../../../utilities';
import {useNavigation} from '@react-navigation/core';

const SelectRoute = () => {
  let navigation = useNavigation();

  const [modal, setModal] = useState('selectRoute');

  return (
    <View style={styles.container}>
      <MapViewComponent rideModals={modal} modal={modal} setModal={setModal} />
      <TouchableOpacity
        style={styles.arrowBackCircle}
        onPress={() => navigation.goBack()}>
        <Image
          source={appIcons.backArrow}
          resizeMode="contain"
          style={styles.arrowBack}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SelectRoute;

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
