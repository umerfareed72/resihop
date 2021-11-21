import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomHeader} from '../../components';
import {colors, family, HP, size} from '../../utilities';
import {Icon} from 'react-native-elements';

const Settings = () => {
  const ItemsView = ({data}) => {
    console.log('data value on items view  ', data);

    return (
      <View style={styles.itemView}>
        <Text style={styles.titleText}>{data?.title}</Text>
        <TouchableOpacity onPress={data?.onPress}>
          <Icon
            name={'right'}
            color={colors.light_black}
            size={22}
            type={'antdesign'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  let data = [
    {
      title: 'Language',
      onPress: () => alert('Clicked'),
    },
    {
      title: 'Help & Support',
      onPress: () => alert('Clicked'),
    },
    {
      title: 'Notifications Settings',
      onPress: () => alert('Clicked'),
    },
    {
      title: 'Blocked List',
      onPress: () => alert('Clicked'),
    },
    {
      title: 'FAQs',
      onPress: () => alert('Clicked'),
    },
    {
      title: 'About Us',
      onPress: () => alert('Clicked'),
    },
    {
      title: 'Terms & Conditions',
      onPress: () => alert('Clicked'),
    },
    {
      title: 'Privacy Policy',
      onPress: () => alert('Clicked'),
    },
    {
      title: 'Rate Us',
      onPress: () => alert('Clicked'),
    },
    {
      title: 'App Version',
      onPress: () => alert('Clicked'),
    },
  ];

  return (
    <>
      <CustomHeader title="Settings" backButton={true} />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.settingsContentContainer}>
            {data.map(item => (
              <ItemsView data={item} />
            ))}
            <Text style={styles.versionText}>1.0.0</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  settingsContentContainer: {
    // marginVertical: HP('2'),
    marginHorizontal: HP('2.5'),
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
