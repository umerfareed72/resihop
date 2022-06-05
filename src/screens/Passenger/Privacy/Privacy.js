import I18n from 'i18n-js';
import React, {Component, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CustomHeader} from '../../../components/Header/CustomHeader';
import TermsView from '../../../components/TermsView/TermsView';
import {colors, header, HP, responseValidator} from '../../../utilities';
import {get} from '../../../services';
import {GET_PRIVACY_POLICY} from '../../../utilities/routes';
import {Loader} from '../../../components';

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
      const response = await get(`${GET_PRIVACY_POLICY}`, await header());
      if (response) {
        console.log('DATA ===>   ', response);
        setPrivacyData(response?.data?.description);
        setLoading(false);
      }
    } catch (error) {
      console.log('ERROR   ==> ', error);
      setLoading(false);
      let status = JSON.stringify(error.message);
      let msg = error.response.data.message;
      responseValidator(status, msg);
    }
  };

  return (
    <>
      <CustomHeader
        navigation={navigation}
        title={I18n.t('privacy_title')}
        backButton={true}
      />
      {loading ? (
        <Loader />
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
