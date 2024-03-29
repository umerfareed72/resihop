import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {colors, appIcons} from '../../../utilities';
import {MapViewComponent} from '../../../components';
import {fonts} from '../../../theme';

const PickUpInfo = ({navigation}) => {
  return (
    <View style={styles.container}>
      <MapViewComponent rideModals="pickUpInfo" />
      <TouchableOpacity
        style={styles.arrowBackCircle}
        onPress={() => navigation.goBack()}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={appIcons.backArrow}
            resizeMode="contain"
            style={styles.arrowBack}
          />
          <Text style={styles.driver}>Pickup Information</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PickUpInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  arrowBackCircle: {
    height: 42,
    width: '85%',
    backgroundColor: colors.white,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    top: 50,
    marginLeft: 18,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowColor: colors.dropShadow2,
    borderRadius: 10,
    paddingLeft: 14,
  },
  driver: {
    fontSize: 16,
    fontFamily: fonts.regular,
    lineHeight: 26,
    color: colors.txtBlack,
    marginLeft: 16,
  },
  arrowBack: {
    height: 15,
    width: 15,
  },
});
