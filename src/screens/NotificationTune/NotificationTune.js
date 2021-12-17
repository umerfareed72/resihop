import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {CustomHeader} from '../../components';
import {
  appIcons,
  appImages,
  colors,
  family,
  HP,
  size,
  GET_NOTIFICATION_TUNE,
  header,
} from '../../utilities';
import {get} from '../../services';
import {Switch} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import {TextInput} from 'react-native-gesture-handler';
import axios from 'axios';
import I18n from 'i18n-js';

const NotificationTune = ({navigation}) => {
  //useEffect here

  useEffect(() => {
    getNotificationTune();
  }, []);

  //methods here

  const getNotificationTune = async () => {
    try {
      var config = {
        method: 'get',
        url: 'https://resihop-server.herokuapp.com/notification-tones',

        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmRhNWE3OGIyZDVkNDVjNDc5NWEwNCIsImlhdCI6MTYzOTMzMzc1MSwiZXhwIjoxNjQxOTI1NzUxfQ.3t0ZKd2y1UvTA9KvMdrdPhdiJEoYocOZalA114Fqdk4`,
        },
      };

      const resp = await axios(config);
      console.log('resp in notif tune is  ', resp);

      if (resp.status === 200) {
        setLoading(false);

        setNotificationTune(resp?.data);
      }
      // const response = await get(`${GET_NOTIFICATION_TUNE}`, await header);
      // if (response.data) {
      //   console.log('DATA sound ===>   ', response);

      //   // setNotificationTune(response.data);
      //   setLoading(false);
      // }
    } catch (error) {
      console.log('Error inn run   ', error);
      setLoading(false);
      // let status = JSON.stringify(error.message);
      // let msg = error.response.data.message;
      // responseValidator(status, msg);
    }
  };

  //useState here
  const [notificationTune, setNotificationTune] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([
    {name: 'Sound 1', icon: true},
    {name: 'Sound 2', icon: false},
    {name: 'Sound 3', icon: false},
  ]);

  const TuneComp = ({data}) => {
    console.log('DATA', data);
    return (
      <>
        <View style={styles.rowContainer}>
          <Text style={styles.nameText}>{data?.item?.soundName}</Text>
          {data?.item?.icon && (
            <Image
              style={{height: 20, width: 20, resizeMode: 'contain'}}
              source={appIcons.tickBg}
            />
          )}
        </View>
        <View style={{borderBottomWidth: 1, borderBottomColor: colors.g3}} />
      </>
    );
  };

  return (
    <>
      <CustomHeader
        navigation={navigation}
        title={I18n.t('notif_tune')}
        backButton={true}
      />
      {loading === true ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={colors.green} />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={notificationTune}
            renderItem={item => <TuneComp data={item} />}
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: HP('2'),
    marginHorizontal: HP('2.5'),
    alignItems: 'center',
  },
  nameText: {
    fontSize: size.large,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
});

export default NotificationTune;
