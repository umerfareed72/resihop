import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {appIcons, colors, family, size} from '../../utilities';

export const AgreeButton = ({
  onPress,
  title,
  bgColor,
  txtColor,
  width,
  borderWidth,
  fontFamily,
  fontWeight,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btnContainer,
        {backgroundColor: bgColor, width: width, borderWidth: borderWidth},
      ]}>
      <Text
        style={[
          styles.btnText,
          {color: txtColor, fontFamily: fontFamily, fontWeight: fontWeight},
        ]}>
        {title}
      </Text>
      <Image source={appIcons.next} style={styles.btnInner} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    height: 56,
    borderRadius: 14,
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_bold,
  },
  btnInner: {
    width: 21,
    height: 14,
    resizeMode: 'center',
    tintColor: colors.white,
  },
});
