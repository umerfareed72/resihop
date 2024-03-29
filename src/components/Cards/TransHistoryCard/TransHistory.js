import moment from 'moment';
import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {appIcons, colors, size} from '../../../utilities';
import {drawerIcons} from '../../../utilities/images';

export const TransHistoryCard = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image style={styles.imageStyle} source={appIcons.downArrow} />
      </View>
      <View style={styles.centerContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.h2}>{item?.status}</Text>
          <Image
            style={{
              height: 12,
              width: 17,
              resizeMode: 'contain',
              marginHorizontal: 10,
            }}
            source={drawerIcons.my_payment_methods}
          />
        </View>

        <Text style={styles.h3}>
          {moment(item?.createdAt).format('HH:MM, DD MMMM YYYY')}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.h1}>{item?.amountPayable} NOK</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    shadowOpacity: 1,
    shadowOffset: {width: 10, height: 2},
    shadowRadius: 10,
    elevation: 3,
    shadowColor: Platform.OS == 'android' ? 'black' : '#94949429',
    height: 80,
    padding: 20,
    flexDirection: 'row',
    borderRadius: 18,
  },
  leftContainer: {
    width: '20%',
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  centerContainer: {
    width: '50%',
    height: '100%',
  },
  imageStyle: {
    height: 38,
    width: 38,
    resizeMode: 'contain',
  },
  imageContainer: {
    height: 20,
    width: 20,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: size.xxlarge,
    color: colors.light_black,
  },
  h2: {
    color: colors.light_black,
    fontSize: size.normal,
  },
  h3: {
    color: colors.g3,
    fontSize: size.xxsmall,
    paddingVertical: 5,
  },
});
