import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {appIcons, colors, family, size} from '../../../utilities';
import {appImages} from '../../../utilities/images';
import StarRating from 'react-native-star-rating';

export const DRiderInfo = ({}) => {
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '30%',
            }}>
            <Text style={styles.h2}>SEK 20</Text>

            <Image source={appIcons.redHeart} style={styles.imageStyle} />
          </View>
        </View>
        <View style={{paddingVertical: 20}}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              alignItems: 'center',
            }}>
            <View style={styles.circleStyle} />
            <Text style={{color: colors.g4, fontSize: size.xxsmall}}>
              123 abc apartment abc street abc...
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.rectangleStyle} />
            <Text style={{color: colors.g4, fontSize: size.xxsmall}}>
              123 abc apartment abc street abc...
            </Text>
          </View>
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
            rating={4}
            emptyStar={appIcons.empty_star}
            starSize={19}
            starStyle={{paddingHorizontal: 3}}
            fullStar={appIcons.full_star}
            selectedStar={rating => console.log(rating)}
          />
          <View>
            <FlatList
              horizontal={true}
              data={[1, 2]}
              renderItem={() => {
                return (
                  <Image
                    style={[styles.rightIcon, {marginEnd: 5}]}
                    source={appImages.seatBlue}
                  />
                );
              }}
            />
          </View>
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
  h2: {
    fontSize: size.normal,
    fontWeight: 'bold',
    fontFamily: family.product_sans_bold,
  },
  circleStyle: {
    height: 12,
    width: 12,
    borderRadius: 12,
    backgroundColor: colors.green,
    marginRight: 15,
  },
  rectangleStyle: {
    height: 12,
    width: 12,
    borderRadius: 4,
    backgroundColor: colors.blue,
    marginRight: 15,
  },
  rightIcon: {
    width: 14,
    height: 18,
    resizeMode: 'contain',
    top: 3,
    tintColor: colors.green,
  },
});