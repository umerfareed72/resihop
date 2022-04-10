import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {BlockedListCard, CustomHeader, Loader} from '../../../components';
import I18n from '../../../utilities/translations';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import {get, post, put, remove} from '../../../services';
import {baseURL, checkConnected, header} from '../../../utilities';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {deleteData} from '../../../services/apiServices';
const BlockedList = ({navigation}) => {
  const isFocus = useIsFocused(null);
  const [blockedList, setblockedList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [block, setblock] = useState(true);
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
        setisLoading(true);
        setblock(!block);
        if (!block) {
          const requestBody = {
            user: item?._id,
          };
          const res = await post(
            `${baseURL}blocked`,
            requestBody,
            await header(),
          );
          if (res?.data) {
            Alert.alert('Success', 'User successfully blocked!');
            setisLoading(false);
          }
        } else {
          const res = await remove(
            `${baseURL}blocked/${item?._id}`,
            await header(),
          );
          if (res?.data) {
            Alert.alert('Success', 'User successfully unblocked!');
            setisLoading(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
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
                  block={block}
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
