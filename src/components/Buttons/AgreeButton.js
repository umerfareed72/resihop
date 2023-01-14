import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { appIcons, colors, family, size } from '../../utilities';
import { Icon } from 'react-native-elements';
import { theme } from '../../theme';

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
        { backgroundColor: bgColor, width: width, borderWidth: borderWidth },
      ]}>
      <Text
        style={[
          styles.btnText,
          { color: txtColor, fontFamily: fontFamily, fontWeight: fontWeight },
        ]}>
        {title}
      </Text>
      <Icon
        name={'arrowright'}
        type={'antdesign'}
        style={{ marginRight: 20, marginTop: 5 }}
        color={theme.colors.white}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    height: 56,
    borderRadius: 14,
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
