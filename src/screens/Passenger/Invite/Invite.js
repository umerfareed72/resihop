import I18n from 'i18n-js';
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import {CustomHeader} from '../../../components';
import {colors, appImages, HP, size, family} from '../../../utilities';

const Invite = ({navigation}) => {
  const onInviteFriend = async () => {
    try {
      const result = await Share.share({
        title: 'Pawtai',
        message:
          Platform.OS == 'android'
            ? `Your Pawtai Joining Code is ${code}, Link to Download Application from PlayStore https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en`
            : `Your Pawtai Joining Code is ${code}, Link to Download Application from AppStore https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <CustomHeader
        navigation={navigation}
        title={I18n.t('invite_title')}
        backButton={true}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.subContainerOne}>
            <Image source={appImages.inviteImage} />
            <Text style={styles.headingText}>{I18n.t('invite_friend')}</Text>
            <Text style={styles.descriptionText}>{I18n.t('lorem')}</Text>
            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>ABCD1234</Text>
              <Text style={styles.copyText}>{I18n.t('invite_copy_code')}</Text>
            </View>
          </View>
          <View style={styles.subContainerTwo}>
            <TouchableOpacity
              style={{
                borderRadius: 15,
                height: HP('7'),
                backgroundColor: colors.green,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: HP('2'),
              }}
              onPress={() => onInviteFriend()}>
              <Text
                style={{
                  fontSize: size.normal,
                  fontFamily: family.product_sans_bold,
                  color: colors.white,
                }}>
                {I18n.t('invite_friend')}
              </Text>
            </TouchableOpacity>
          </View>
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
  contentContainer: {
    marginHorizontal: HP('3'),
    flex: 1,
  },
  headingText: {
    fontSize: size.xxlarge,
    fontFamily: family.product_sans_bold,
    color: colors.light_black,
  },
  descriptionText: {
    fontSize: size.small,
    fontFamily: family.product_sans_regular,
    lineHeight: 25,
    color: colors.light_black,
  },
  subContainerOne: {
    flex: 0.8,
  },
  subContainerTwo: {
    flex: 0.2,
    justifyContent: 'center',
  },
  codeContainer: {
    marginTop: HP('4'),
    height: HP('7'),
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: colors.lightGray,
  },
  codeText: {
    marginLeft: HP('2'),
    fontSize: size.xxlarge,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
  copyText: {
    fontSize: size.xsmall,
    fontFamily: family.product_sans_regular,
    color: colors.blue,
    marginRight: HP('2'),
  },
});

export default Invite;
