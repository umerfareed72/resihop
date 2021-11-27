import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {family, HP, size, colors} from '../../utilities';

export const ContributionCard = ({data}) => {
  console.log('ContributionCard item is  ', data);
  return (
    <View style={styles.cardStyle}>
      <Text style={styles.titleStyle}>{data?.item?.title}</Text>
      <Text style={styles.descriptionStyle}>{data?.item?.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    marginTop: HP('2'),
    marginRight: HP('2'),
    width: HP('20'),
    height: HP('17'),
    backgroundColor: colors.white,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: size.h6,
    fontFamily: family.product_sans_bold,
    color: colors.light_black,
  },
  descriptionStyle: {
    fontSize: size.normal,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
});
