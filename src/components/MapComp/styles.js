import {StyleSheet} from 'react-native';
import {fonts} from '../../theme';
import {colors, size, family} from '../../utilities';

export default StyleSheet.create({
  currenLocation: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: colors.blueLocation,
    borderWidth: 2,
    borderColor: colors.white,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 20,
    shadowColor: colors.blueLocation,
    shadowRadius: 20,
  },
  driverMarker: {
    height: 28,
    paddingHorizontal: 10,
    backgroundColor: colors.blue,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentLocation: {
    height: 42,
    width: 42,
  },
  currentLocationWrapper: {
    position: 'absolute',
    top: 50,
    right: 16,
  },
  currentLocationWrapper2: {
    position: 'absolute',
    bottom: 25,
    right: 16,
  },
  driverCard: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: colors.blue,
    borderRadius: 30,
  },
  driverTxt: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 12,
  },
  destinationIcon: {
    height: 33,
    width: 23,
    resizeMode: 'contain',
  },
  rideImageCon: {
    height: 22,
    width: 22,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.dark_yellow,
    backgroundColor: colors.white,
  },
  rideImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 22,
  },
  locationImg: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
});
