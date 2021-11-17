import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {family, size, appImages, colors} from '../../../utilities';
import CheckBox from '@react-native-community/checkbox';

export const BankCard = ({onPress, value, boxType, name, cardno}) => {
  return (
    <LinearGradient colors={colors.gradientpaidCard} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image style={styles.imageStyle} source={appImages.visa} />
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
        <Text style={styles.textStyle}>{name}</Text>
        <Text style={styles.textStyle}>****{cardno}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 106,
    borderRadius: 16,
    marginVertical: 20,
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
