import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../../utilities';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: WP('5'),
  },
  separator: {
    borderWidth: 0.5,
    borderColor: colors.g1,
  },
});
