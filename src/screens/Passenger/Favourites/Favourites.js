import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import {CustomHeader, BlankField} from '../../../components';
import {
  colors,
  family,
  HP,
  size,
  FAVOURITES_CONST,
  header,
} from '../../../utilities';
import {FavDriver, FavPassenger, FavLocation} from '../../../components';
import I18n from 'i18n-js';
import {get} from '../../../services';
import {useIsFocused} from '@react-navigation/native';
import {Dimensions} from 'react-native';

const Favourites = ({navigation}) => {
  const [selected, setSelected] = useState(1);
  const [fav, setFav] = useState(null);
  const isFocus = useIsFocused();
  const getFavourites = async fav => {
    try {
      setFav(null);
      const res = await get(`${FAVOURITES_CONST}?type=${fav}`, await header());
      setFav(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isFocus) {
      getFavourites('DRIVER');
    }
  }, [isFocus]);
  return (
    <>
      <CustomHeader
        navigation={navigation}
        title={I18n.t('fav_title')}
        backButton={true}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.marginContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => {
                getFavourites('DRIVER');
                setSelected(1);
              }}
              style={styles.driverTab}>
              <Text
                style={[
                  styles.tabText,
                  {color: selected === 1 ? colors.green : colors.light_black},
                ]}>
                {I18n.t('fav_driver')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected(2);
                getFavourites('PASSENGER');
              }}
              style={styles.driverTab}>
              <Text
                style={[
                  styles.tabTextReplica,
                  {color: selected === 2 ? colors.green : colors.light_black},
                ]}>
                {I18n.t('fav_passenger')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                getFavourites('LOCATION');
                setSelected(3);
              }}
              style={styles.locationTab}>
              <Text
                style={[
                  styles.tabTextReplica,
                  {color: selected === 3 ? colors.green : colors.light_black},
                ]}>
                {I18n.t('fav_location')}
              </Text>
            </TouchableOpacity>
          </View>
          {selected === 1 ? (
            <>
              {fav != '' ? (
                <FavDriver data={fav} />
              ) : (
                <View
                  style={{
                    height: Dimensions.get('screen').height / 1.5,
                  }}>
                  <BlankField title={'No Favourite Driver Found'} />
                </View>
              )}
            </>
          ) : selected === 2 ? (
            <>
              {fav != '' ? (
                <FavPassenger data={fav} />
              ) : (
                <View
                  style={{
                    height: Dimensions.get('screen').height / 1.5,
                  }}>
                  <BlankField title={'No Favourite Passenger Found'} />
                </View>
              )}
            </>
          ) : (
            <>
              {fav != '' ? (
                <FavLocation data={fav} />
              ) : (
                <View
                  style={{
                    height: Dimensions.get('screen').height / 1.5,
                  }}>
                  <BlankField title={'No Favourite Location Found'} />
                </View>
              )}
            </>
          )}
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
