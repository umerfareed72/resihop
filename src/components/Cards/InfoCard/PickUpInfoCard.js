import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {appIcons, colors, family, size} from '../../../utilities';
import {fonts} from '../../../theme';
import {useNavigation} from '@react-navigation/core';
import I18n from '../../../utilities/translations';
import {useSelector} from 'react-redux';

export const PickUpInfoCard = ({title}) => {
  const navigation = useNavigation();
  const {origin, destination, distanceAndTime} = useSelector(
    state => state.map,
  );

  return (
    <View style={[styles.container]}>
      <View style={{marginHorizontal: 22, marginTop: 20}}>
        {/* <Text style={styles.walking}>{I18n.t('walking')}</Text> */}
        <Text
          style={
            styles.estimated
          }>{`Destination ${distanceAndTime?.distance?.toFixed(
          0,
        )} KM (${distanceAndTime?.duration?.toFixed(0)} Min)`}</Text>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTxt}>
          {origin?.description || '123 abc apartment abc street abc...'}
        </Text>
        <View style={styles.addressCircle} />
      </View>
      <View style={[styles.addressContainer, {marginTop: 21}]}>
        <Text style={styles.addressTxt}>
          {destination?.description || '123 abc apartment abc street abc...'}
        </Text>
        <View style={styles.addressSquare} />
      </View>
      <View style={styles.titlecontainer}>
        <Text
          style={{
            width: '60%',
            fontFamily: family.product_sans_regular,
            color: '#777777',
            fontSize: size.xxsmall,
          }}>
          {I18n.t('call_driver')}
        </Text>
        <TouchableOpacity style={styles.btnContainer1}>
          <Image
            source={appIcons.call}
            style={{
              height: 13,
              width: 13,
              resizeMode: 'contain',
              marginRight: 5,
            }}
          />
          <Text
            style={{
              fontSize: 12,
              fontFamily: family.product_sans_regular,
              color: colors.white,
            }}>
            {I18n.t('call_now')}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => {
          navigation?.replace('PassengerHome');
        }}>
        <Text style={styles.btnTxt}>{I18n.t('passenger_home')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
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
  btnContainer1: {
    backgroundColor: colors.green,
    width: 90,
    height: 33,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  titlecontainer: {
    padding: 20,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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
