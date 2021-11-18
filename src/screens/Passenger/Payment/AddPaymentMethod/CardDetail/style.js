import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../../../utilities';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  contentContainer: {
    paddingHorizontal: WP('5'),
  },

  content: {
    marginVertical: 20,
    padding: 20,
    height: 146,
    width: 255,
    alignSelf: 'center',
    backgroundColor: colors.gradientpaidCard,
    borderRadius: 16,
  },
  checkBoxLeftStyle: {
    width: 20,
    height: 20,
  },
  textStyle: {
    color: colors.light_black,
    fontSize: size.normal,
    paddingVertical: 10,
  },
  imageStyle: {
    width: 46,
    height: 14,
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
});
