import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import {CustomHeader} from '../../../components';
import {colors, family, HP, size} from '../../../utilities';
import {FavDriver, FavPassenger, FavLocation} from '../../../components';
import {getFavouriteData} from '../../../redux/actions/favourite-action';
import {useSelector, useDispatch} from 'react-redux';
import I18n from 'i18n-js';

const Favourites = ({navigation}) => {
  const dispatch = useDispatch();
  //useState here
  const [selected, setSelected] = useState(1);

  //useEffect here
  useEffect(() => {
    getFavouritesData();
  }, []);

  //methods here

  const getFavouritesData = () => {
    dispatch(getFavouriteData())
  };

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
              onPress={() => setSelected(1)}
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
              onPress={() => setSelected(2)}
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
              onPress={() => setSelected(3)}
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
            <FavDriver />
          ) : selected === 2 ? (
            <FavPassenger />
          ) : (
            <FavLocation />
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
