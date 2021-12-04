import React, {Component, useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {CustomHeader, RatingCardModal} from '../../../components';
import {colors, family, HP, size, WP} from '../../../utilities';
import I18n from '../../..//utilities/translations';
import {Icon} from 'react-native-elements';

const Settings = ({navigation}) => {
  const [rating, setRating] = useState(0);
  const [show, setShow] = useState(false);

  const ItemsView = ({data}) => {
    return (
      <TouchableOpacity onPress={data?.onPress}>
        <View style={styles.itemView}>
          <Text style={styles.titleText}>{data?.title}</Text>

          <Icon
            name={'right'}
            color={colors.light_black}
            size={22}
            type={'antdesign'}
          />
        </View>
      </TouchableOpacity>
    );
  };

  let data = [
    {
      title: I18n.t('set_lang'),
      onPress: () => navigation.navigate('MultiLanguage'),
    },
    {
      title: I18n.t('set_help'),
      onPress: () => navigation.navigate('Help'),
    },
    {
      title: I18n.t('set_notif_set'),
      onPress: () => navigation.navigate('NotificationSettings'),
    },
    {
      title: I18n.t('set_block'),
      onPress: () => navigation.navigate('BlockedList'),
    },
    {
      title: I18n.t('set_faq'),
      onPress: () => navigation.navigate('Faq'),
    },
    {
      title: I18n.t('set_about'),
      onPress: () => navigation.navigate('AboutUs'),
    },
    {
      title: I18n.t('set_terms'),
      onPress: () => navigation.navigate('Terms'),
    },
    {
      title: I18n.t('set_privacy'),
      onPress: () => navigation.navigate('Privacy'),
    },
    {
      title: I18n.t('set_rate'),
      onPress: () => {
        setShow(!show);
      },
    },
    {
      title: I18n.t('set_app_version'),
      onPress: () => alert('Clicked'),
    },
  ];

  return (
    <>
      <CustomHeader
        title={I18n.t('setting')}
        backButton={true}
        navigation={navigation}
      />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.settingsContentContainer}>
            {data.map(item => (
              <ItemsView data={item} />
            ))}
            <Text style={styles.versionText}>1.0.0</Text>
          </View>
        </ScrollView>
      </View>
      {show && (
        <RatingCardModal
          h1={I18n.t('add_experience')}
          show={show}
          onPressHide={() => {
            setShow(false);
          }}
          onSelectRating={setRating}
          rating={rating}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  settingsContentContainer: {
    paddingHorizontal: WP('5'),
  },
  itemView: {
    marginVertical: HP('2'),
    flexDirection: 'row',
    // backgroundColor: 'orange',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  titleText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
  versionText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_regular,
    color: colors.g1,
  },
});

export default Settings;
