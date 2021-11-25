import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {appIcons, colors, family, size} from '../../../utilities';
import {appImages} from '../../../utilities/images';

export const RideHistoryCard = ({cancelled, driver}) => {
  const renderListItems = () => {
    return (
      <View style={styles.wrapper}>
        <View style={styles.cardContainer}>
          <Text style={styles.h1}>Mon, 12 June, 08:00</Text>
          {cancelled && <Text style={styles.specialText}>cancelled</Text>}
          <Text style={styles.h2}>SEK 20</Text>
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
            {driver ? (
              false
            ) : (
              <View>
                <FlatList
                  horizontal={true}
                  data={[1, 2]}
                  renderItem={() => {
                    return (
                      <Image
                        style={[styles.rightIcon]}
                        source={appImages.seatBlue}
                      />
                    );
                  }}
                />
              </View>
            )}
          </View>
        </View>
        {driver ? (
          <View>
            <FlatList
              horizontal={true}
              data={[1, 2]}
              renderItem={() => {
                return (
                  <Image
                    style={[
                      styles.rightIcon,
                      {marginStart: driver ? 0 : 5, marginEnd: driver ? 5 : 0},
                    ]}
                    source={appImages.seatBlue}
                  />
                );
              }}
            />
          </View>
        ) : (
          <View style={styles.row3}>
            <Image source={appIcons.noUpcomingRide} style={styles.icon50} />
            <Text
              style={[styles.h2Text, {fontWeight: '500', color: colors.g5}]}>
              Ford, Focus,{' '}
              <Text
                style={[
                  styles.h2Text,
                  {fontWeight: 'bold', color: colors.light_black},
                ]}>
                White, XT32TTU8
              </Text>
            </Text>
            <Image source={appImages.user} style={styles.icon42} />
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={renderListItems}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
      />
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
  separator: {
    borderWidth: 0.5,
    borderColor: colors.g1,
  },
  h2Text: {
    fontFamily: family.product_sans_regular,
    fontSize: size.xxsmall,
  },
  specialText: {
    color: colors.dark_red,
    fontWeight: '700',
    fontSize: size.normal,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderBottomColor: colors.dark_red,
    borderTopColor: colors?.dark_red,
  },
});
