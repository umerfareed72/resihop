import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../utilities';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGreen,
  },
  contentContainer: {
    paddingHorizontal: WP('5'),
    height: Dimensions.get('screen').height / 1.2,
    justifyContent: 'space-evenly',
  },
  view1: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageStyle: {
    height: 150,
    width: 150,
    borderRadius: 150,
  },
  username: {fontSize: 20, paddingVertical: 10, fontWeight: '500'},
  ringingText: {fontSize: 12, paddingVertical: 5, fontWeight: 'bold'},
  card_container: {
    height: '15%',
    backgroundColor: colors.light_white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    height: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  icon25: {height: 25, width: 25, resizeMode: 'contain'},
  icon45: {height: 45, width: 45, resizeMode: 'contain'},
});
