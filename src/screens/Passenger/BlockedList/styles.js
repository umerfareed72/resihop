import {StyleSheet} from 'react-native';
import {colors, WP} from '../../../utilities';

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
});
