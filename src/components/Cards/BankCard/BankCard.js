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
            tintColor={colors.green}
            value={value}
            onValueChange={onPress}
            boxType={boxType}
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
    padding: 10,
  },
  textStyle: {
    color: colors.light_black,
    fontSize: size.normal,
    paddingVertical: 2,
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
