import React, {Component, useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Text} from 'react-native';
import {CustomHeader} from '../../components/Header/CustomHeader';
import styles from './style';
import I18n from '../../utilities/translations';
import {FlatList} from 'react-native-gesture-handler';
import {PledgeCard, AgreeButton, Loader} from '../../components';
import {colors} from '../../utilities';
import {get} from '../../services';
import {responseValidator} from '../../utilities/helpers';
import {useSelector} from 'react-redux';
const index = ({navigation}) => {
  const [loading, setloading] = useState(false);
  const [getPledges, setgetPledges] = useState([]);
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    getPledge();
  }, []);
  //Get Pledge
  const getPledge = async () => {
    setloading(true);
    try {
      const res = await get(`pledges`);
      setgetPledges(res?.data);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log('Error', error);
      let status = error?.response?.data?.statusCode;
      responseValidator(
        status,
        error?.response?.data?.message[0]?.messages[0]?.message,
      );
    }
  };
  return (
    <>
      <CustomHeader navigation={navigation} backButton={false} />
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.h1Container}>
            <Text style={styles.h1}>{I18n.t('pledge_text_h1')}</Text>
          </View>

          <FlatList
            style={{height: '80%'}}
            showsVerticalScrollIndicator={false}
            data={getPledges}
            renderItem={({item}) => {
              return (
                <PledgeCard
                  h1={item?.heading}
                  h2={item?.description}
                  imageURL={item?.image?.url}
                />
              );
            }}
          />
          <View style={styles.btnWrapper}>
            <AgreeButton
              onPress={() => {
                auth?.userInfo?.type === 'PASSENGER'
                  ? navigation?.replace('PassengerDashboard')
                  : navigation?.replace('DriverDashboard');
              }}
              fontWeight={'bold'}
              bgColor={colors.primary}
              title={I18n.t('pledge_agree')}
              txtColor={colors.white}
            />
          </View>
        </View>
        {loading ? <Loader /> : null}
      </SafeAreaView>
    </>
  );
};

export default index;
