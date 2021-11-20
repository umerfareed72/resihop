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
  header: {
    flexDirection: 'row',
    width: '100%',
  },
  btnContainer: {
    backgroundColor: colors.green,
    height: 28,
    width: 94,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: colors.white,
    fontSize: size.xsmall,
    // fontFamily: family.product_sans_regular,
  },
  btnContainer2: {
    backgroundColor: colors.green,
    height: 28,
    width: 130,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  btnText2: {
    color: colors.white,
    fontSize: size.xsmall,
    // fontFamily: family.product_sans_regular,
  },
  linearGradient: {
    height: 97,
    width: '100%',
    borderRadius: 23,
    alignSelf: 'center',
    marginVertical: 20,
  },

  rowAlign: {
    width: '100%',
    height: '100%',
    borderRadius: 23,
  },
  leftContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnStyle: {
    width: 97,
    height: 28,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnImage: {
    tintColor: colors.blue,
    height: 11,
    width: 11,
    marginRight: 5,
  },
  header2Text: {
    fontSize: size.xsmall,
    color: colors.white,
    // fontFamily: family.product_sans_regular,
  },
  btntext: {
    color: colors.blue,
    fontSize: size.xxsmall,
    // fontFamily: family.product_sans_regular,
  },
  header2Bold: {
    // fontFamily: family.product_sans_bold,
    paddingHorizontal: 20,
    fontWeight: '900',
    fontSize: size.h3,
    color: colors.white,
  },
});
