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

export const FavLocation = () => {
  const DriverCard = ({data}) => {
    console.log('DATA ===========>    ', data);
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.hometag}>
            <Text style={styles.homeText}>Home</Text>
          </View>
          <View>
            <Icon
              name={'heart'}
              style={{alignSelf: 'center', marginTop: 5}}
              type={'antdesign'}
              color={colors.red}
              size={15}
            />
          </View>
        </View>
        <View stlye={styles.bottomContainer}>
          <Text style={styles.descriptionText}>
            123 abc apartment abc street abc abc city, abc country
          </Text>
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
  },
  topContainer: {
    marginHorizontal: HP('2'),
    flexDirection: 'row',
    marginVertical: HP('2'),
    justifyContent: 'space-between',
    flex: 1,
  },
  hometag: {
    borderRadius: 50,
    backgroundColor: colors.green,
  },
  homeText: {
    marginHorizontal: HP('2'),
    marginVertical: HP('1'),
    fontSize: size.xsmall,
    fontFamily: family.product_sans_regular,
    color: colors.white,
  },
  bottomContainer: {
    marginHorizontal: HP('2'),
    marginTop: HP('2'),
    backgroundColor: 'green',
  },
  descriptionText: {
    marginHorizontal: HP('2'),
    marginBottom: HP('2'),
    color: colors.grimmyGray,
    fontFamily: family.product_sans_regular,
    fontSize: size.normal,
  },
});
