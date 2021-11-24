import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import {CustomHeader} from '../../components';
import {colors, family, HP, size} from '../../utilities';
import {FavDriver, FavPassenger, FavLocation} from '../../components';

const Favourites = () => {
  return (
    <>
      <CustomHeader title="Favourites" backButton={true} />
      <SafeAreaView style={styles.container}>
        <View style={styles.marginContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.driverTab}>
              <Text style={styles.tabText}>Driver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.driverTab}>
              <Text style={styles.tabTextReplica}>Passenger</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationTab}>
              <Text style={styles.tabTextReplica}>Location</Text>
            </TouchableOpacity>
          </View>
          <FavDriver />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  marginContainer: {
    marginHorizontal: HP('2.5'),
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // height: 50,
    borderRadius: 50,
    backgroundColor: colors.favouriteTabColor,
  },
  driverTab: {
    marginVertical: HP('2'),
    justifyContent: 'center',
    width: '33%',
    borderRightWidth: 0.5,
    alignItems: 'center',
  },
  locationTab: {
    marginVertical: HP('2'),
    justifyContent: 'center',
    width: '33%',
    // borderRightWidth: 0.5,
    alignItems: 'center',
  },
  tabText: {
    fontSize: size.large,
    fontFamily: family.product_sans_regular,
    color: colors.green,
  },
  tabTextReplica: {
    fontSize: size.large,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
});

export default Favourites;
