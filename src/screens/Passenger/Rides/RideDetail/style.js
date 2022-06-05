import {StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../../utilities';

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
  mainContainer: {
    marginHorizontal: HP('2.5'),
  },
  reportText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_bold,
    color: colors.blue,
    marginVertical: HP('1'),
  },
});
