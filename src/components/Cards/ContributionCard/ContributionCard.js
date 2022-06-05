import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {family, HP, size, colors, WP} from '../../../utilities';

export const ContributionCard = ({title, description}) => {
  return (
    <View style={styles.cardStyle}>
      <Text style={styles.titleStyle}>{title}</Text>
      <Text style={styles.descriptionStyle}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    marginTop: HP('2'),
    // marginRight: HP('2'),
    width: '45%',
    height: 126,
    backgroundColor: colors.white,
    borderRadius: 15,
    justifyContent: 'center',
    padding: WP('5'),
    elevation: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowColor: colors.green,
  },
  titleStyle: {
    fontSize: size.h6,
    fontFamily: family.product_sans_bold,
    color: colors.light_black,
    marginBottom: 20,
  },
  descriptionStyle: {
    fontSize: size.normal,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
});
