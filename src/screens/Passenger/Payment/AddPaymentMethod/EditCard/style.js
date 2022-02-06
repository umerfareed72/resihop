import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../../../utilities';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: WP('5'),
  },
  infoStyle: {
    color: colors.g1,
    fontSize: size.xxsmall,
  },
});
