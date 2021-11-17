import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {colors, WP, appIcons, size, family} from '../../utilities';
export const PaymentHistory = ({title, image, onPress}) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnContainer}>
          <Image style={styles.imageStyle} source={image} />
        </TouchableOpacity>
        <Text style={styles.titleStyle}>{title}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  imageStyle: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    tintColor: colors.white,
    transform: [{rotateZ: '90deg'}],
  },
  btnContainer: {
    height: 30,
    width: 30,
    backgroundColor: colors.green,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  titleStyle: {
    color: colors.black,
    fontSize: size.normal,
    // fontFamily: family.product_sans_regular,
  },
});
