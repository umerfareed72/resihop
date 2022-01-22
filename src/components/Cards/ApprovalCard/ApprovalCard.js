import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {PaymentButtons} from '../..';
import {appIcons, colors, family, size} from '../../../utilities';

export const ApprovalCard = ({
  image,
  h1,
  h2,
  btnText,
  onPress,
  height,
  width,
  h3,
  textColor,
  fontSize,
  fontFamily,
  h4,
  switching,
}) => {
  return (
    <View>
      <Text style={styles.h1}>{h1}</Text>
      <View style={{paddingVertical: 20}}>
        <Image
          source={image}
          style={[
            styles.imageStyle,
            {
              height: height,
              width: width,
            },
          ]}
        />
      </View>
      <Text
        style={[
          styles.h2,
          {
            fontFamily: fontFamily,
            fontSize: fontSize,
            color: textColor,
          },
        ]}>
        {h2}
      </Text>
      {h3 && <Text style={styles.h3}>{h3} </Text>}
      {btnText && switching ? (
        <View style={{padding: 20}}>
          <PaymentButtons
            onPress={onPress}
            bgColor={colors.blue}
            title={btnText}
            txtColor={colors.white}
            fontFamily={family.product_sans_bold}
          />
        </View>
      ) : (
        false
      )}
      {h4 && switching ? <Text style={styles.h3}>{h4} </Text> : false}
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {},
  h1: {
    textAlign: 'center',
    fontSize: size.h2,
    color: colors.light_black,
    fontFamily: family.product_sans_bold,
  },
  h2: {
    textAlign: 'center',
    padding: 20,
    lineHeight: 30,
  },
  h3: {
    textAlign: 'center',
    fontSize: size.xsmall,
    color: colors.g3,
    fontFamily: family.product_sans_regular,
    padding: 20,
  },
  imageStyle: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
});
