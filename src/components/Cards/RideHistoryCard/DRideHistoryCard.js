import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {appIcons, colors, family, size} from '../../../utilities';
import {appImages} from '../../../utilities/images';

export const DRideHistoryCard = ({
  cancelled,
  driver,
  profilePic,
  onPressCard,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={onPressCard}>
          <View style={styles.cardContainer}>
            <Text style={styles.h1}>Mon, 12 June, 08:00</Text>
            <Text style={[styles.h2, {marginLeft: driver ? 30 : 0}]}>
              SEK 20
            </Text>
            {driver ? (
              <Image source={appIcons.redHeart} style={styles.imageStyle} />
            ) : (
              false
            )}
          </View>
          <View style={{paddingVertical: 10}}>
            <View style={styles.row2}>
              <View style={styles.alignRow}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    alignItems: 'center',
                  }}>
                  <View style={styles.circleStyle} />
                  <Text style={{color: colors.g4, fontSize: size.xxsmall}}>
                    123 abc apartment abc street abc...
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.rectangleStyle} />
                  <Text style={{color: colors.g4, fontSize: size.xxsmall}}>
                    123 abc apartment abc street abc...
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <FlatList
              horizontal={true}
              data={[1, 2]}
              renderItem={() => {
                return (
                  <Image
                    style={[styles.rightIcon, {marginEnd: 5}]}
                    source={appImages.seatBlue}
                  />
                );
              }}
            />
            {cancelled && (
              <Image source={appIcons.cancelled} style={styles.specialText} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    flexDirection: 'row',
  },
  wrapper: {
    width: '100%',
    marginVertical: 10,
  },
  circleStyle: {
    height: 12,
    width: 12,
    borderRadius: 12,
    backgroundColor: colors.green,
    marginRight: 15,
  },
  rectangleStyle: {
    height: 12,
    width: 12,
    borderRadius: 4,
    backgroundColor: colors.blue,
    marginRight: 15,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  h1: {
    fontSize: size.xsmall,
    fontWeight: 'bold',
    fontFamily: family.product_sans_bold,
  },
  h2: {
    fontSize: size.normal,
    fontWeight: 'bold',
    fontFamily: family.product_sans_bold,
  },
  row2: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alignRow: {
    alignItems: 'center',
    // flexDirection: 'row',
  },
  rightIcon: {
    width: 14,
    height: 18,
    resizeMode: 'contain',
    tintColor: colors.green,
  },
  row3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row3Image: {},
  icon50: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  icon42: {
    height: 42,
    width: 42,
    borderRadius: 42,
    bottom: 10,
  },

  h2Text: {
    fontFamily: family.product_sans_regular,
    fontSize: size.xxsmall,
  },
  specialText: {
    height: 19,
    width: 58,
    resizeMode: 'contain',
  },
  imageStyle: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
});
