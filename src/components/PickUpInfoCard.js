import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../utilities';
import {fonts} from '../theme';
import {useNavigation} from '@react-navigation/core';

const PickUpInfoCard = () => {
  let navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{marginHorizontal: 22, marginTop: 38}}>
        <Text style={styles.walking}>Walking 300 M (5 Min)</Text>
        <Text style={styles.estimated}>Estimated Arrival 10 KM (20 Min)</Text>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTxt}>
          123 abc apartment abc street abc...
        </Text>
        <View style={styles.addressCircle} />
      </View>
      <View style={[styles.addressContainer, {marginTop: 21}]}>
        <Text style={styles.addressTxt}>
          123 abc apartment abc street abc...
        </Text>
        <View style={styles.addressSquare} />
      </View>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => navigation.goBack()}>
        <Text style={styles.btnTxt}>Passenger Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PickUpInfoCard;

const styles = StyleSheet.create({
  container: {
    height: 345,
    width: '100%',
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  addressContainer: {
    height: 42,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    marginTop: 23,
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  addressTxt: {
    fontSize: 13,
    lineHeight: 20,
    paddingLeft: 40,
    fontFamily: fonts.regular,
    color: colors.txtBlack,
  },
  addressCircle: {
    height: 16,
    width: 16,
    borderRadius: 16 / 2,
    backgroundColor: colors.green,
    position: 'absolute',
    left: 13,
  },
  addressSquare: {
    height: 16,
    width: 16,
    borderRadius: 5,
    backgroundColor: colors.blue,
    position: 'absolute',
    left: 13,
  },
  walking: {
    fontSize: 18,
    fontFamily: fonts.regular,
    lineHeight: 22,
    color: colors.txtBlack,
  },
  estimated: {
    fontSize: 18,
    fontFamily: fonts.regular,
    lineHeight: 22,
    color: colors.txtBlack,
    marginTop: 22,
  },
  btnContainer: {
    height: 56,
    width: '80%',
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  btnTxt: {
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 22,
    color: colors.white,
  },
});
