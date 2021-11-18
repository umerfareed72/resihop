import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {appIcons, colors, size} from '../../../utilities';

export const TransHistoryCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <LinearGradient
          colors={['#82DB1F', '#47B000']}
          style={styles.imageContainer}>
          <Image style={styles.imageStyle} source={appIcons.backArrow} />
        </LinearGradient>
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.h2}>Refund</Text>
        <Text style={styles.h3}>18:00, 12 June 2020</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.h1}>100 SEK</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    shadowOpacity: 1,
    shadowOffset: {width: 10, height: 2},
    shadowRadius: 10,
    elevation: 3,
    shadowColor: Platform.OS == 'android' ? 'black' : '#94949429',
    height: 80,
    padding: 20,
    flexDirection: 'row',
    borderRadius: 18,
  },
  leftContainer: {
    width: '20%',
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  centerContainer: {
    width: '50%',
    height: '100%',
  },
  imageStyle: {
    height: 17,
    width: 22,
    resizeMode: 'contain',
  },
  imageContainer: {
    height: 20,
    width: 20,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: size.xxlarge,
    color: colors.light_black,
  },
  h2: {
    color: colors.light_black,
    fontSize: size.normal,
  },
  h3: {
    color: colors.g3,
    fontSize: size.xxsmall,
    paddingVertical: 5,
  },
});
