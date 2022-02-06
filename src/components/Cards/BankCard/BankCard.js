import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {family, size, appImages, colors} from '../../../utilities';
import CheckBox from '@react-native-community/checkbox';
import {checkBrand} from '../../../utilities/helpers/checkBrand';

export const BankCard = ({
  onPress,
  value,
  boxType,
  name,
  cardno,
  onPressCard,
  brand,
}) => {
  console.log(brand);
  return (
    <LinearGradient colors={colors.gradientpaidCard} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image style={styles.imageStyle} source={checkBrand(brand)} />
          <CheckBox
            disabled={false}
            value={value}
            onFillColor={colors.green}
            onCheckColor={colors.white}
            onValueChange={onPress}
            tintColors={{true: '#47B000', false: 'gray'}}
            onTintColor={colors.white}
            style={styles.checkBoxLeftStyle}
          />
        </View>
        <TouchableOpacity onPress={onPressCard}>
          <Text style={styles.textStyle}>{name}</Text>
          <Text style={styles.textStyle}>****{cardno}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 106,
    borderRadius: 16,
    margin: 10,
  },
  content: {
    padding: 15,
  },
  checkBoxLeftStyle: {
    width: 20,
    height: 20,
  },
  textStyle: {
    color: colors.light_black,
    fontSize: size.normal,
    paddingVertical: 5,
  },
  imageStyle: {
    width: 46,
    height: 14,
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 5,
  },
});
