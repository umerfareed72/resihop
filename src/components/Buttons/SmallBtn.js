import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {family, size} from '../../utilities';

export const SmallButtons = ({
  onPress,
  title,
  bgColor,
  txtColor,
  width,
  borderWidth,
  fontFamily,
  fontWeight,
  image,
  height,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btnContainer,
        {
          backgroundColor: bgColor,
          height: height,
          width: width,
          borderWidth: borderWidth,
        },
      ]}>
      {image && (
        <Image
          source={image}
          style={{
            height: 14,
            width: 13,
            resizeMode: 'contain',
            marginRight: 10,
          }}
        />
      )}
      <Text
        style={[
          styles.btnText,
          {color: txtColor, fontFamily: fontFamily, fontWeight: fontWeight},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  btnText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_bold,
  },
});
