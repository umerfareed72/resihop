import I18n from 'i18n-js';
import React, {Component, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CustomHeader} from '../../../components/Header/CustomHeader';
import TermsView from '../../../components/TermsView/TermsView';
import {
  colors,
  header,
  HP,
  responseValidator,
  baseURL,
} from '../../../utilities';
import {get} from '../../../services';
import {GET_PRIVACY_POLICY} from '../../../utilities/routes';
import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmRhNWE3OGIyZDVkNDVjNDc5NWEwNCIsImlhdCI6MTYzOTMzMzc1MSwiZXhwIjoxNjQxOTI1NzUxfQ.3t0ZKd2y1UvTA9KvMdrdPhdiJEoYocOZalA114Fqdk4';

const Privacy = ({navigation}) => {
  //useEffect
  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  //USESTATE HERE

  const [privacyData, setPrivacyData] = useState();
  const [loading, setLoading] = useState(true);

  //METHODS HERE
  const getPrivacyPolicy = async () => {
    setLoading(true);
    try {
      var config = {
        method: 'get',
        url: `${baseURL}${GET_PRIVACY_POLICY}`,

        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmRhNWE3OGIyZDVkNDVjNDc5NWEwNCIsImlhdCI6MTYzOTMzMzc1MSwiZXhwIjoxNjQxOTI1NzUxfQ.3t0ZKd2y1UvTA9KvMdrdPhdiJEoYocOZalA114Fqdk4`,
        },
      };

      const resp = await axios(config);
      console.log('resp in privacy policy is  ', resp);
      if (resp.status === 200) {
        setLoading(false);
        setPrivacyData(resp?.data?.description);
      }
      // const response = await get(`${GET_PRIVACY_POLICY}`, await header);
      // if (response) {
      //   console.log('DATA ===>   ', response);
      //   // setPrivacyData(response?.description);
      //   setloading(false);
      // }
    } catch (error) {
      // console.log('ERROR   ==> ', error);
      setLoading(false);
      // let status = JSON.stringify(error.message);
      // let msg = error.response.data.message;
      // responseValidator(status, msg);
    }
  };

  let description = I18n.t('lorem');
  return (
    <>
      <CustomHeader
        navigation={navigation}
        title={I18n.t('privacy_title')}
        backButton={true}
      />
      {loading === true ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={colors.green} />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.mainView}>
              <TermsView
                title={I18n.t('privacy_title')}
                description={privacyData}
              />
            </View>
          </ScrollView>
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
  mainView: {
    marginHorizontal: HP('2.5'),
    flex: 1,
  },
});

export default Privacy;
