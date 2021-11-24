import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors, family, HP, size} from '../../utilities';

const TermsView = ({title, description}) => {
  return (
    <View>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: size.xxlarge,
    fontFamily: family.product_sans_bold,
    color: colors.light_black,
  },
  descriptionText: {
    marginVertical: HP('2'),
    fontSize: size.small,
    color: colors.light_black,
    fontFamily: family.product_sans_regular,
  },
});

export default TermsView;
