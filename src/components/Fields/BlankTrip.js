import React from 'react';
import {ScrollView} from 'react-native';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {colors, family} from '../../utilities';

export const BlankTrip = ({icon, onPress, text, role}) => {
  return (
    <ScrollView>
      {role == 'passenger' && (
        <>
          <Image source={icon} style={styles.noUpcomingRide} />

          {/* <Text style={styles.Txt}>{I18n.t('lorem')}</Text> */}
          <TouchableOpacity
            style={styles.createRideBtnContainer}
            onPress={onPress}>
            <Text style={styles.btnTxt}>{text}</Text>
          </TouchableOpacity>
        </>
      )}
      {role == 'driver' && (
        <>
          <Image source={icon} style={styles.noUpcomingDrive} />
          {/* <Text style={styles.Txt}>{I18n.t('lorem')}</Text> */}
          <TouchableOpacity
            style={styles.createRideBtnContainer}
            onPress={onPress}>
            <Text style={styles.btnTxt}>{text}</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  createRideBtnContainer: {
    height: 56,
    width: '80%',
    backgroundColor: colors.green,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: colors.dropShadow,
    shadowOpacity: 1,
    alignSelf: 'center',
    marginVertical: 20,
  },
  noUpcomingRide: {
    height: 197,
    width: 247,
    alignSelf: 'center',
    marginTop: 30,
  },
  noUpcomingDrive: {
    width: 305,
    height: 278,
    alignSelf: 'center',
    marginTop: 30,
    resizeMode: 'contain',
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
    fontFamily: family.product_sans_bold,
  },
});
