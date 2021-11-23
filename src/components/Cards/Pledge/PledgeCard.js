import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {appIcons, appImages, colors, size} from '../../../utilities';

export const PledgeCard = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardStyle}>
        <View style={styles.leftContainer}>
          <Image source={appIcons.spread_goodness} style={styles.imageStyle} />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.h1}>Respect Each other</Text>
          <Text style={styles.h2}>
            I will respect fellow riders and value their time & space. I would
            never treat as driver/passenger.
          </Text>
          <View style={styles.separator} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 20,
  },
  container: {
    flex: 1,
  },
  leftContainer: {
    width: 142,
    height: 100,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: '70%',
    height: 100,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  h1: {
    fontSize: size.normal,
    fontWeight: 'bold',
    color: colors.light_black,
  },
  h2: {
    fontSize: size.xxsmall,
    color: colors.g3,
    paddingVertical: 10,
  },
  separator: {
    borderBottomWidth: 0.5,
    paddingTop: 30,
    borderBottomColor: colors.g4,
  },
});
