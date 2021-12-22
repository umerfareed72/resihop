import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {CustomHeader} from '../../../components/Header/CustomHeader';
import {
  appImages,
  colors,
  family,
  size,
  responseValidator,
} from '../../../utilities';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import {GET_NOTIFICATION_LIST} from '../../../utilities/routes';
import {get} from '../../../services';

const NotificationList = ({navigation}) => {
  //useState here
  const [notifData, setNotifData] = useState();
  const [loading, setLoading] = useState(true);

  //useEffect here

  useEffect(() => {
    getNotificationList();
  }, []);

  //methods here

  const getNotificationList = async () => {
    try {
      const response = await get(`${GET_NOTIFICATION_LIST}`);
      if (response.data) {
        console.log('DATA ===>   ', response.data);

        setNotifData(response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      let status = JSON.stringify(error.message);
      let msg = error.response.data.message;
      responseValidator(status, msg);
    }
  };

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
      {loading === true ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={colors.green} />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={notifData}
            renderItem={item => <NotificationItem data={item} />}
          />
        </SafeAreaView>
      )}
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
    fontFamily: family.product_sans_bold,
  },
  descriptionTextStyle: {
    fontSize: size.xxsmall,
    marginVertical: 10,
    fontFamily: family.product_sans_regular,
    color: colors.grimmyGray,
  },
});

export default NotificationList;
