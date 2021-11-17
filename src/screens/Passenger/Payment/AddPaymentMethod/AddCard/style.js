import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../../../utilities';

export default StyleSheet.create({
  h1: {
    fontSize: size.normal,
    color: colors.black,
    // fontFamily: family.product_sans_regular,
  },
  h1container: {
    paddingVertical: 30,
  },
  fieldContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.g2,
  },
  cardStyle: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    placeholderColor: colors.g1,
    fontSize: size.small,
  },
  payStyle: {
    width: '100%',
    height: 50,
    left: -15,
  },
  infoStyle: {
    color: colors.g1,
    fontSize: size.xxsmall,
  },
});
