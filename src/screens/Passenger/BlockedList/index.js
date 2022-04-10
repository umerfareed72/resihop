import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {BlockedListCard, CustomHeader, Loader} from '../../../components';
import I18n from '../../../utilities/translations';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import {get, put} from '../../../services';
import {baseURL, checkConnected, header} from '../../../utilities';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
const BlockedList = ({navigation}) => {
  const isFocus = useIsFocused(null);
  const [blockedList, setblockedList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (isFocus) {
      getBlockedList();
    }
  }, [isFocus]);

  //Get Blocked List
  const getBlockedList = async () => {
    const check = await checkConnected();
    if (check) {
      try {
        setisLoading(true);
        const res = await get(`${baseURL}blocked`, await header());
        if (res?.data) {
          setblockedList(res?.data);
          setisLoading(false);
        }
      } catch (error) {
        console.log(error);
        setisLoading(false);
      }
    } else {
      Alert.alert('Error', 'Check Internet Connectivity!');
      setisLoading(false);
    }
  };
  const onPressBlock = async item => {
    try {
      const check = await checkConnected();
      if (check) {
        const requestBody = {
          blockedUsers: [item?.id],
        };
        // const res = await put(`${baseURL}users/${auth?.profile_info?.id}`);
        // if (res?.data) {
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CustomHeader
        navigation={navigation}
        backButton={true}
        title={I18n.t('blocked_list')}
      />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <FlatList
            data={blockedList}
            renderItem={({item}) => {
              return (
                <BlockedListCard
                  onPressBlock={() => onPressBlock(item)}
                  item={item}
                />
              );
            }}
          />
        </View>
      </View>
      {isLoading && <Loader />}
    </>
  );
};

export default BlockedList;
