import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import {SafeAreaView, Text, StyleSheet, View, Image} from 'react-native';
import {CustomHeader} from '../../components/Header/CustomHeader';
import styles from './styles';
import {
  appIcons,
  appId,
  colors,
  profileIcon,
  capitalizeFirstLetter,
  header,
} from '../../utilities';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {create_agoral_channel} from '../../redux/actions/app.action';
import I18n from '../../utilities/translations';
import {post} from '../../services';
import {AGORA_CONST} from '../../utilities/routes';
import {Alert} from 'react-native';
import * as Types from '../../redux/types/app.types';

const index = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch(null);
  const acceptCall = async () => {
    try {
      const requestBody = {
        to: auth?.calling_user?.call_data?.by,
      };
      const res = await post(
        `${AGORA_CONST}/accept`,
        requestBody,
        await header(),
      );
      if (res?.data) {
        const responseData = {
          agora_token: auth?.calling_user?.call_data?.rtctoken,
          agora_data: auth?.calling_user?.call_data,
        };
        dispatch({
          type: Types.Create_Agora_Channel_Success,
          payload: responseData,
        });
        navigation?.navigate('CallNow', {
          firstName: auth?.calling_user?.userData?.firstName,
          lastName: auth?.calling_user?.userData?.lastName,
          picture: auth?.calling_user?.userData?.picture?.url,
        });
      } else {
        Alert.alert('Error', 'Unable to Pick Call');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to Pick Call');
    }
  };

  const RejectCall = async () => {
    try {
      const requestBody = {
        to: auth?.calling_user?.call_data?.by,
      };
      const res = await post(
        `${AGORA_CONST}/reject`,
        requestBody,
        await header(),
      );
      if (res?.data) {
        navigation?.goBack();
      } else {
        Alert.alert('Error', 'Unable to Reject Call');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to Reject Call');
    }
  };

  return (
    <>
      <CustomHeader
        headerColor={colors.lightGreen}
        navigation={navigation}
        barColor={colors.lightGreen}
        backButton={false}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.view1}>
            <Image
              style={styles.imageStyle}
              source={{
                uri: auth?.calling_user?.userData?.picture?.url || profileIcon,
              }}
            />
            <Text style={styles.username}>
              {capitalizeFirstLetter(auth?.calling_user?.userData?.firstName)}{' '}
              {capitalizeFirstLetter(auth?.calling_user?.userData?.lastName)}
            </Text>
          </View>
          <View style={styles.card_container}>
            <View style={styles.innerContainer}>
              <TouchableOpacity
                onPress={() => {
                  acceptCall();
                }}
                style={[styles.btnContainer, {backgroundColor: colors.green}]}>
                <Image style={styles.icon45} source={appIcons.phone} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  RejectCall();
                }}
                style={styles.btnContainer}>
                <Image style={styles.icon45} source={appIcons.phone} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default index;
