import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  size,
  color,
  WP,
  colors,
  family,
  appImages,
  appIcons,
} from '../../../utilities';
import {BlockInput} from '../../AppInput/ModalInput/BlockInput';
import {PaymentButtons} from '../../Buttons/Payment/PaymentButtons';

export const LogoutModal = ({
  title,
  show,
  btnText,
  onPress,
  onPress2,
  btnText2,
  h1,
  h2,
  icon,
}) => {
  return (
    <RBSheet
      ref={show}
      height={360}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(16,16,16,0.5)',
        },
        container: {
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
        },
      }}>
      <ScrollView style={styles.container}>
        <View style={styles.aiCenter}>
          <Image style={styles.icon67} source={icon} />
          <Text style={styles.h1}>{h1}</Text>
          <Text style={styles.h2}>{h2}</Text>
        </View>

        <View style={{padding: 20}}>
          <PaymentButtons
            onPress={onPress}
            bgColor={colors.green}
            txtColor={colors.white}
            title={btnText}
            fontWeight={'bold'}
          />
          <View style={{paddingVertical: 20}}>
            <PaymentButtons
              onPress={onPress2}
              bgColor={colors.white}
              txtColor={colors.light_black}
              title={btnText2}
              borderWidth={1}
              fontWeight={'bold'}
            />
          </View>
        </View>
      </ScrollView>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: WP('5'),
  },
  header: {
    paddingTop: 10,
  },
  headerText: {
    fontSize: size.large,
    color: colors.black,
    fontWeight: 'bold',
    fontFamily: family.product_sans_bold,
  },
  inputContainer: {
    paddingVertical: 10,
  },
  aiCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  icon67: {
    height: 67,
    width: 67,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  h1: {
    fontSize: size.large,
    color: colors.light_black,
    fontWeight: 'bold',
  },
  h2: {
    color: colors.light_black,
    fontSize: size.small,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
