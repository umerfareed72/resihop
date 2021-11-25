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
import CheckBox from '@react-native-community/checkbox';
import {Icon} from 'react-native-elements';

let data = [
  {
    image: appImages.user,
    name: 'John Deo',
    price: 'SEK 20',
    rating: '4.5',
    description: 'Ford, Focus, White, XT32TTU8',
  },
  {
    image: appImages.user,
    name: 'John Deo',
    price: 'SEK 20',
    rating: '4.5',
    description: 'Ford, Focus, White, XT32TTU8',
  },
  {
    image: appImages.user,
    name: 'John Deo',
    price: 'SEK 20',
    rating: '4.5',
    description: 'Ford, Focus, White, XT32TTU8',
  },
];

export const FavDriver = () => {
  const DriverCard = ({data}) => {
    console.log('DATA ===========>    ', data);
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.userImageContainer}>
            <Image style={styles.userImage} source={data?.image} />
            <View>
              <View style={styles.userNameView}>
                <Text style={styles.userName}>{data?.name}</Text>
                <Icon
                  name={'heart'}
                  type={'antdesign'}
                  color={colors.red}
                  style={{marginLeft: HP('1'), marginTop: HP('0.5')}}
                  size={15}
                />
              </View>
              <View style={styles.ratingContainer}>
                <Icon
                  name={'star'}
                  type={'entypo'}
                  color={colors.white}
                  //   style={{marginLeft: HP('1'), marginTop: HP('0.5')}}
                  size={15}
                />
                <Text style={styles.ratingText}>4.5</Text>
              </View>
            </View>
          </View>
          <View style={{marginVertical: HP('1')}}>
            <Text style={styles.descriptionText}>
              <Text style={styles.descriptionTextReplica}> Ford, Focus,</Text>{' '}
              White, XT32TTU8
            </Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.priceText}>{data?.price}</Text>
          </View>
          <Image
            style={{width: HP('9'), height: HP('6')}}
            source={appIcons.car_icon}
          />
        </View>
      </View>
    );
  };

  return (
    <FlatList data={data} renderItem={({item}) => <DriverCard data={item} />} />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.favouriteBorderColor,
    marginVertical: HP('1'),
    backgroundColor: colors.white,
    flexDirection: 'row',
  },
  marginContainer: {
    marginHorizontal: HP('2.5'),
  },
  leftContainer: {
    flex: 0.7,
    marginLeft: HP('1'),
    marginVertical: HP('1'),
    // backgroundColor: 'orange',
  },
  rightContainer: {
    flex: 0.3,
    marginVertical: HP('1'),
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
  },
  userImageContainer: {
    flexDirection: 'row',
  },
  userImage: {
    width: HP('8'),
    height: HP('8'),
    borderRadius: 100,
  },
  userNameView: {
    marginHorizontal: HP('1'),
    flexDirection: 'row',
    // alignItems: 'center',
  },
  userName: {
    fontFamily: family.product_sans_regular,
    fontSize: size.large,
    color: colors.light_black,
  },
  ratingContainer: {
    marginVertical: HP('1'),
    backgroundColor: colors.green,
    borderRadius: 5,
    marginLeft: HP('1'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 50,
  },
  ratingText: {
    fontSize: size.xxsmall,
    fontFamily: family.product_sans_regular,
    color: colors.white,
    marginLeft: 1,
  },
  descriptionText: {
    fontSize: size.xsmall,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
  descriptionTextReplica: {
    fontSize: size.xsmall,
    fontFamily: family.product_sans_regular,
    color: colors.g5,
  },
  priceText: {
    fontSize: size.large,
    fontFamily: family.product_sans_bold,
    color: colors.light_black,
  },
});
