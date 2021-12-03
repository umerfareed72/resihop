import I18n from 'i18n-js';
import React, {Component} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {CustomHeader} from '../../../components/Header/CustomHeader';
import {colors, family, HP, size} from '../../../utilities';

const Offers = ({navigation}) => {
  let data = [
    {
      title: 'Welcome Offer',
      description: 'Welcome to ÅK IHOP',
      promo: I18n.t('offer_promo'),
    },
    {
      title: 'Welcome Offer',
      description: 'Welcome to ÅK IHOP',
      promo: I18n.t('offer_promo'),
    },
    {
      title: 'Welcome Offer',
      description: 'Welcome to ÅK IHOP',
      promo: I18n.t('offer_promo'),
    },
  ];

  const OfferCard = ({data}) => {
    console.log('data val is   ', data);
    return (
      <LinearGradient colors={colors.offerCardColor} style={styles.cardStyle}>
        <View style={styles.cardContent}>
          <Text style={styles.titleText}>{data?.item?.title}</Text>
          <Text style={styles.desciptionText}>{data?.item?.description}</Text>
          <View style={styles.promoStyle}>
            <Text style={styles.promoText}>{data?.item?.promo}</Text>
          </View>
        </View>
      </LinearGradient>
    );
  };

  return (
    <>
      <CustomHeader
        navigation={navigation}
        title={I18n.t('offer_title')}
        backButton={true}
      />
      <SafeAreaView style={styles.container}>
        <FlatList data={data} renderItem={item => <OfferCard data={item} />} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainView: {
    marginHorizontal: HP('2.5'),
    flex: 1,
  },
  cardStyle: {
    marginHorizontal: HP('2.5'),
    marginVertical: HP('1'),
    borderRadius: 13,
  },
  cardContent: {
    marginHorizontal: HP('2'),
    // backgroundColor: 'orange',
  },
  titleText: {
    fontSize: size.xxlarge,
    fontFamily: family.product_sans_bold,
    color: colors.light_black,
    // marginVertical: HP('2'),
    marginTop: HP('2'),
  },
  desciptionText: {
    fontSize: size.xsmall,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
    marginVertical: HP('1'),
  },
  promoStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    width: 128,
    height: 38,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: HP('1'),
    marginBottom: HP('2'),
  },
  promoText: {
    fontFamily: family.product_sans_regular,
    fontSize: size.tiny,
    color: colors.light_black,
  },
});

export default Offers;
