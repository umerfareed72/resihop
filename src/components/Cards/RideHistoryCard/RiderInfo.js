import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {appIcons, colors, family, size} from '../../../utilities';
import {appImages} from '../../../utilities/images';
import StarRating from 'react-native-star-rating';

export const RiderInfo = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.cardContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={appImages.user} style={styles.icon42} />
            <Text style={styles.textStyle}>John Doe</Text>
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
            disabled={false}
            maxStars={5}
            rating={5}
            starSize={19}
            starStyle={{paddingHorizontal: 2}}
            fullStarColor={colors.green}
            selectedStar={rating => console.log(rating)}
          />
          <View />
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.btnText}>Block</Text>
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
