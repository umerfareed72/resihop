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
export const AddWalletModal = ({
  title,
  show,
  onSuccess,
  btnText,
  onFailed,
  onPress,
  addMoney,
  h1,
  h2,
  icon,
}) => {
  return (
    <RBSheet
      ref={show}
      height={350}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(16,16,16,0.5)',
        },
        container: {
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
        },
      }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {addMoney ? (
          <>
            <View style={styles.header}>
              <Text style={styles.headerText}>{title}</Text>
            </View>
            <View style={styles.inputContainer}>
              <BlockInput
                placeholder={'Amount'}
                placeholderTextColor={colors.g1}
              />
            </View>
          </>
        ) : (
          false
        )}
        {onSuccess ? (
          <View style={styles.aiCenter}>
            <Image style={styles.icon67} source={icon} />
            <Text style={styles.h1}>{h1}</Text>
            <Text style={styles.h2}>{h2}</Text>
          </View>
        ) : (
          false
        )}
        {onFailed ? (
          <View style={styles.aiCenter}>
            <Image style={styles.icon67} source={icon} />
            <Text style={styles.h1}>{h1}</Text>
            <Text style={styles.h2}>{h2}</Text>
          </View>
        ) : (
          false
        )}
        <View style={{padding: 20}}>
          <PaymentButtons
            onPress={onPress}
            bgColor={colors.green}
            txtColor={colors.white}
            title={btnText}
          />
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
    paddingVertical: 10,
  },
  h2: {
    color: colors.g3,
    fontSize: size.xsmall,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    lineHeight: 25,
  },
});
