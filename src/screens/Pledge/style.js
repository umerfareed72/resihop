import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../utilities';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: WP('5'),
  },
  h1: {
    fontSize: size.h2,
    color: colors.light_black,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    fontFamily: family.product_sans_bold,
  },
  h1Container: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  btnWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
