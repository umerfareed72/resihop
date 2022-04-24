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
import {appIcons, appId, colors, profileIcon} from '../../utilities';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {create_agoral_channel} from '../../redux/actions/app.action';

const index = ({navigation, route}) => {
  const dispatch = useDispatch(null);
  const createAgoraChannel = () => {
    const requestBody = {
      to: '123',
    };
    dispatch(
      create_agoral_channel(requestBody, res => {
        navigation?.navigate('CallNow', {
          firstName: 'Umer',
          lastName: 'Fareed',
        });
      }),
    );
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
            <Image style={styles.imageStyle} source={{uri: profileIcon}} />
            <Text style={styles.username}>
              {firstName} {lastName}
            </Text>
          </View>
          <View style={styles.card_container}>
            <View style={styles.innerContainer}>
              <TouchableOpacity
                onPress={() => {
                  createAgoraChannel();
                }}
                style={[styles.btnContainer, {backgroundColor: colors.green}]}>
                <Image style={styles.icon45} source={appIcons.phone} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation?.goBack();
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
