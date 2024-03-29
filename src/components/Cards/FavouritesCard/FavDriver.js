import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  family,
  size,
  appImages,
  colors,
  HP,
  appIcons,
  profileIcon,
} from '../../../utilities';
import {Icon} from 'react-native-elements';

export const FavDriver = ({data}) => {
  const renderRightActions = (progress, dragX) => {
    return (
      <RectButton
        style={{alignItems: 'center', justifyContent: 'center', padding: 20}}
        onPress={() => {
          alert('Item Deleted');
        }}>
        <Image
          source={appIcons.dumpBox}
          style={{height: 30, width: 30, resizeMode: 'contain'}}
        />
      </RectButton>
    );
  };
  const DriverCard = ({data}) => {
    return (
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <View style={styles.userImageContainer}>
              <Image
                style={styles.userImage}
                source={{
                  uri:
                    data?.user?.picture?.url ||
                    data?.driver_passenger?.picture?.url ||
                    profileIcon,
                }}
              />
              <View>
                <View style={styles.userNameView}>
                  <Text style={styles.userName}>
                    {data?.user?.firstName || data?.driver_passenger?.firstName}{' '}
                    {data?.user?.lastName || data?.driver_passenger?.lastName}
                  </Text>
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
                  <Text style={styles.ratingText}>
                    {data?.driver_passenger?.rating_d}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{marginVertical: HP('1')}}>
              <Text style={styles.descriptionText}>
                <Text style={styles.descriptionTextReplica}>
                  {data?.driver_passenger?.vehicle?.vehicleCompanyName},
                </Text>{' '}
                {data?.driver_passenger?.vehicle?.color},{' '}
                {data?.driver_passenger?.vehicle?.licencePlateNumber}
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
      </Swipeable>
    );
  };

  return (
    <FlatList
      style={{marginBottom: 80}}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({item}) => <DriverCard data={item} />}
    />
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
