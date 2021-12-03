import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
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
  HP,
} from '../../../utilities';
import I18n from '../../../utilities/translations';

export const IncorrectRefCode = ({show, onPress}) => {
  return (
    <RBSheet
      ref={show}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(16,16,16,0.5)',
        },
        container: {
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
          height: 300,
        },
      }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            style={{width: HP('8'), height: HP('8'), resizeMode: 'contain'}}
            source={appIcons.wrongData}
          />
          <Text style={styles.reffralText}>{I18n.t('incorrect_ref_code')}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => show?.current?.close()}
            style={styles.button}>
            <Text style={styles.buttonText}>{I18n.t('edit')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress} style={styles.buttonReplica}>
            <Text style={styles.buttonText}>{I18n.t('continue')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: HP('2'),
    // padding: WP('5'),
    // alignItems: 'center',
  },
  reffralText: {
    fontSize: size.large,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
    marginVertical: HP('2'),
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: WP('5'),

    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 14,
    // marginHorizontal: HP('2.5'),
    width: '40%',
    height: HP('7'),
    backgroundColor: colors.light_black,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: HP('2'),
  },
  buttonReplica: {
    borderRadius: 14,
    // marginHorizontal: HP('2.5'),
    width: '40%',
    height: HP('7'),
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: HP('2'),
  },
  buttonText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_bold,
    color: colors.white,
  },
  headerStyle: {
    fontFamily: family.product_sans_bold,
    fontSize: size.h5,
    color: colors.light_black,
    marginVertical: HP('1'),
  },
  headerContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  itemContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
  itemText: {
    fontSize: size.xxlarge,
    fontFamily: family.product_sans_bold,
    color: colors.light_black,
  },
});
