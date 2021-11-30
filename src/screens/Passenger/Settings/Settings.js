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
      title: 'Language',
      onPress: () => navigation.navigate('MultiLanguage'),
    },
    {
      title: 'Help & Support',
      onPress: () => navigation.navigate('Help'),
    },
    {
      title: 'Notifications Settings',
      onPress: () => navigation.navigate('NotificationSettings'),
    },
    {
      title: 'Blocked List',
      onPress: () => navigation.navigate('BlockedList'),
    },
    {
      title: 'FAQs',
      onPress: () => navigation.navigate('Faq'),
    },
    {
      title: 'About Us',
      onPress: () => navigation.navigate('AboutUs'),
    },
    {
      title: 'Terms & Conditions',
      onPress: () => navigation.navigate('Terms'),
    },
    {
      title: 'Privacy Policy',
      onPress: () => navigation.navigate('Privacy'),
    },
    {
      title: 'Rate Us',
      onPress: () => {
        setShow(!show);
      },
    },
    {
      title: 'App Version',
      onPress: () => alert('Clicked'),
    },
  ];

  return (
    <>
      <CustomHeader
        title="Settings"
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
