import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {fonts} from '../../theme';
import {appIcons, colors} from '../../utilities';
import I18n from '../../utilities/translations';
const AppHeader = ({onPress, title}) => {
  return (
    <TouchableOpacity style={styles.arrowBackCircle} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={appIcons.backArrow}
          resizeMode="contain"
          style={styles.arrowBack}
        />
        <Text style={styles.driver}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  arrowBack: {
    height: 15,
    width: 15,
  },
  arrowBackCircle: {
    width: '80%',
    backgroundColor: colors.white,
    position: 'absolute',
    justifyContent: 'center',
    top: 50,
    marginLeft: 18,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowColor: colors.dropShadow2,
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 10,
  },
  driver: {
    fontSize: 16,
    fontFamily: fonts.regular,
    lineHeight: 26,
    color: colors.txtBlack,
    marginLeft: 16,
  },
});
