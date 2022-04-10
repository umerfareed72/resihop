import I18n from 'i18n-js';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {
  appIcons,
  appImages,
  colors,
  family,
  profileIcon,
  size,
} from '../../../utilities';
import RideTitle from '../../Titles/RideTitle';
import {Image} from 'react-native-elements';

export const BlockedListCard = ({item, onPressBlock}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {item?.vehicle ? (
          <View>
            <View style={styles.content1}>
              <View style={styles.alignRow}>
                <Image
                  progressiveRenderingEnabled={true}
                  source={{uri: item?.picture?.url || profileIcon}}
                  style={styles.imageStyle}
                />
                <View style={{width: '50%'}}>
                  <Text style={styles.text1}>
                    {item?.firstName} {item?.lastName}
                  </Text>
                  <View style={[styles.content1H3Style, {marginVertical: 5}]}>
                    <Icon
                      name={'star'}
                      type={'entypo'}
                      color={colors.white}
                      size={11}
                    />
                    <Text style={styles.content1H3}>{item?.rating_d}</Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: size.large,
                      fontFamily: family.product_sans_bold,
                      color: colors.light_black,
                      marginTop: 20,
                    }}>
                    NOK {item?.vehicle?.presetCostPerPassenger}
                  </Text>
                  <Image
                    source={appImages.leftcar}
                    style={{
                      height: 40,
                      width: 95,
                      marginTop: 10,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </View>
            </View>
            <Text
              style={[
                styles.h2Text,
                {fontWeight: '500', color: colors.g5, paddingBottom: 20},
              ]}>
              {item?.vehicle?.vehicleCompanyName},{' '}
              {item?.vehicle?.licencePlateNumber},{' '}
              <Text
                style={[
                  styles.h2Text,
                  {fontWeight: 'bold', color: colors.light_black},
                ]}>
                {item?.vehicle?.color}, {item?.vehicle?.licencePlateNumber}
              </Text>
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.content1}>
              <View style={styles.alignRow}>
                <Image source={appImages.user} style={styles.imageStyle} />
                <Text style={styles.text1}>John Doe</Text>
              </View>
              <View style={styles.content1H3Style}>
                <Icon
                  name={'star'}
                  type={'entypo'}
                  color={colors.white}
                  size={11}
                />

                <Text style={styles.content1H3}>4.5</Text>
              </View>
            </View>
            <View style={{paddingVertical: 15}}>
              <RideTitle />
            </View>
          </>
        )}
        <TouchableOpacity onPress={onPressBlock} style={styles.btnContainer}>
          <Text style={styles.btnText}>
            {item?.blocked ? I18n.t('unblock') : I18n.t('block')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.g6,
    height: 192,
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    marginVertical: 10,
  },
  content: {
    padding: 10,
  },
  content1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageStyle: {
    height: 55,
    width: 55,
    borderRadius: 55,
    marginRight: 20,
  },
  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text1: {
    width: '65%',
    color: colors.light_black,
    fontSize: size.large,
    fontFamily: family.product_sans_regular,
  },
  btnContainer: {
    height: 30,
    width: 163,
    backgroundColor: colors.light_white,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnText: {
    fontSize: size.xxsmall,
    color: colors.light_black,
    fontFamily: family.product_sans_regular,
  },
  content1H3Style: {
    backgroundColor: colors.green,
    height: 18,
    width: 42,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  content1H3: {
    color: colors.white,
    fontSize: size.xxsmall,
    fontFamily: family.product_sans_regular,
  },
});
