import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {appIcons, colors, family, profileIcon, size} from '../../../utilities';
import {appImages} from '../../../utilities/images';
import StarRating from 'react-native-star-rating';
import {Image} from 'react-native-elements';
import I18n from '../../../utilities/translations';
export const RiderInfo = ({driverInfo, block, onPressBlock}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.cardContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              progressiveRenderingEnabled={true}
              source={{uri: driverInfo?.picture?.url || profileIcon}}
              style={styles.icon42}
            />
            <Text style={styles.textStyle}>
              {driverInfo?.firstName || 'Jon'} {driverInfo?.lastName || 'Due'}
            </Text>
          </View>
          <Image source={appIcons.redHeart} style={styles.imageStyle} />
        </View>
        <View style={styles.h2Container}>
          <Text
            style={{
              color: colors.g5,
              fontFamily: family.product_sans_regular,
              fontSize: size.xsmall,
            }}>
            Your Rate
          </Text>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={driverInfo?.rating_d}
            starSize={19}
            emptyStar={appIcons.empty_star}
            fullStarColor={appIcons.full_star}
            starStyle={{paddingHorizontal: 2}}
            fullStarColor={colors.green}
            selectedStar={rating => console.log(rating)}
          />
          <View />
          <TouchableOpacity onPress={onPressBlock} style={styles.btnContainer}>
            <Text style={styles.btnText}>
              {block ? I18n.t('unblock') : I18n.t('block')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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

  icon42: {
    height: 42,
    width: 42,
    borderRadius: 42,
  },
  textStyle: {
    marginLeft: 20,
    fontSize: size.normal,
    fontFamily: family.product_sans_regular,
  },
  imageStyle: {
    width: 18,
    height: 17,
    resizeMode: 'contain',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  h2Container: {
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnContainer: {
    backgroundColor: colors.light_white,
    width: 64,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
  },
  btnText: {
    fontSize: size.xxsmall,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
});
