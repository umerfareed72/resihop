import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  family,
  size,
  appImages,
  colors,
  HP,
  appIcons,
} from '../../../utilities';

import StarRating from 'react-native-star-rating';

export const FavDriverCard = ({
  favourite,
  onselectStar,
  selectedStar,

  addFavourite,
}) => {
  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <View
          style={{
            width: '80%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 51,
              width: 51,
              borderRadius: 51,
              marginRight: 20,
            }}
            source={appImages.user}
          />
          <View>
            <Text style={styles.h1}>John Deo</Text>
            <Text style={styles.h2}>Pickup Time 08:00</Text>
          </View>
        </View>
        <TouchableOpacity onPress={addFavourite} style={{padding: 5}}>
          <Image
            style={{height: 21, width: 21, resizeMode: 'contain'}}
            source={favourite ? appIcons.redHeart : appIcons.heart}
          />
        </TouchableOpacity>
      </View>
      {/* Profile Card */}
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            width: '40%',
            fontSize: size.xsmall,
            fontFamily: family.product_sans_regular,
            color: colors.light_black,
          }}>
          Rate your Drive Experience
        </Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={selectedStar}
          starSize={25}
          starStyle={{paddingHorizontal: 3}}
          fullStar={appIcons.full_star}
          emptyStar={appIcons.empty_star}
          selectedStar={onselectStar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.favouriteBorderColor,
    marginVertical: HP('1'),
    backgroundColor: colors.white,
  },
  h1: {
    fontSize: size.large,
    color: colors.light_black,
    fontFamily: family.product_sans_regular,
  },
  h2: {
    fontSize: size.small,
    color: colors.light_black,
    fontFamily: family.product_sans_regular,
  },
});
