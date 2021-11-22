import React, {useEffect} from 'react';
import {SafeAreaView, View, StyleSheet, Image, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {CustomHeader} from '../../../components/Header/CustomHeader';
import {appImages, colors, family, size} from '../../../utilities';
import {Divider} from 'react-native-elements/dist/divider/Divider';

const NotificationList = ({navigation}) => {
  const data = [
    {
      image: appImages.app_logo,
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren',
    },
    {
      image: appImages.app_logo,
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren',
    },
    {
      image: appImages.app_logo,
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren',
    },
    {
      image: appImages.app_logo,
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren',
    },
  ];

  const NotificationItem = ({data}) => {
    console.log('data in NotificationItem  ', data);

    return (
      <View style={styles.notifyItem}>
        <View style={styles.imageContainer}>
          <Image style={styles.imageStyle} source={data?.item?.image} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.titleTextStyle}>{data?.item?.title}</Text>
          <Text numberOfLines={2} style={styles.descriptionTextStyle}>
            {data?.item?.description}
          </Text>
          <Divider color={colors.lightGray} />
        </View>
      </View>
    );
  };

  return (
    <>
      <CustomHeader
        navigation={navigation}
        title={'Notifications'}
        backButton={true}
      />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={item => <NotificationItem data={item} />}
        />
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  notifyItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    minHeight: 120,
  },
  imageContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
    marginVertical: 5,
  },
  contentContainer: {
    justifyContent: 'center',
    flex: 0.7,
    // backgroundColor: 'red',
  },
  imageStyle: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  titleTextStyle: {
    fontSize: size.xsmall,
    color: colors.light_black,
    // fontFamily: family.product_sans_bold,
  },
  descriptionTextStyle: {
    fontSize: size.xxsmall,
    marginVertical: 10,
    // fontFamily: family.product_sans_regular,
    color: colors.grimmyGray,
  },
});

export default NotificationList;
