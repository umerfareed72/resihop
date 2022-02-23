import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {appIcons, colors, family, size} from '../../../utilities';
import I18n from '../../../utilities/translations';

export const PaymentCard = ({title, add_Money, onPress, onPressAddMoney}) => {
  return (
    <LinearGradient
      colors={colors.gradientBoxColor}
      style={styles.linearGradient}>
      <View>
        <View style={styles.rowAlign}>
          <View style={styles.leftContainer}>
            <Text style={styles.header2Text}>{title}</Text>
            {add_Money ? (
              <TouchableOpacity
                onPress={onPressAddMoney}
                style={styles.btnStyle}>
                <Image source={appIcons.plus} style={styles.btnImage} />
                <Text style={styles.btntext}>{add_Money}</Text>
              </TouchableOpacity>
            ) : (
              false
            )}
          </View>
          <Text style={styles.header2Bold}>00.00 SEK</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
    height: 10,
    width: 10,
    marginRight: 5,
  },
  header2Text: {
    fontSize: size.xsmall,
    color: colors.white,
    fontFamily: family.product_sans_regular,
  },
  btntext: {
    color: colors.blue,
    fontSize: size.xxsmall,
    fontFamily: family.product_sans_regular,
  },
  header2Bold: {
    fontFamily: family.product_sans_bold,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: size.h3,
    color: colors.white,
  },
});
