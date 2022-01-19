import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {appIcons, appImages, colors, size} from '../../../utilities';

export const PledgeCard = ({h1, h2, imageURL}) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardStyle}>
        <View style={styles.leftContainer}>
          <Image source={{uri: imageURL}} style={styles.imageStyle} />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.h1}>{h1}</Text>
          <Text style={styles.h2}>{h2}</Text>
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
    marginVertical: 10,
  },
  container: {
    flex: 1,
  },
  leftContainer: {
    width: 150,
    height: 120,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: '80%',
    paddingVertical: 10,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  h1: {
    fontSize: size.normal,
    fontWeight: 'bold',
    color: colors.light_black,
  },
  h2: {
    fontSize: size.xxsmall,
    color: colors.g3,
    paddingTop: 10,
    width: '60%',
  },
  separator: {
    borderBottomWidth: 0.5,
    paddingTop: 30,
    borderBottomColor: colors.g4,
  },
});
