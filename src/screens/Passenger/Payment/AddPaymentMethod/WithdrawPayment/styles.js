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
  headerContainer: {},
  headerText: {
    fontSize: size.normal,
    color: colors.light_black,
    fontWeight: 'bold',
    fontFamily: family.product_sans_bold,
  },
});
