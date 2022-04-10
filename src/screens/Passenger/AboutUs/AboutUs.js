import I18n from 'i18n-js';
import React, {Component, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CustomHeader} from '../../../components/Header/CustomHeader';
import TermsView from '../../../components/TermsView/TermsView';
import {colors, GET_ABOUT_US, HP, responseValidator} from '../../../utilities';
import {get} from '../../../services';
import Loading from '../../../components/Loading';
import {Loader} from '../../../components';

const AboutUs = ({navigation}) => {
  const [description, setDescription] = useState('');
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getAboutUs();
  }, []);

  const getAboutUs = async () => {
    setloading(true);
    try {
      const response = await get(`${GET_ABOUT_US}`);
      if (response.data) {
        setDescription(response.data?.description);
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      let status = JSON.stringify(error.message);
      let msg = error.response.data.message;
      responseValidator(status, msg);
    }
  };
  return (
    <>
      {!loading ? (
        <>
          <CustomHeader
            navigation={navigation}
            title={I18n.t('about_us')}
            backButton={true}
          />
          <SafeAreaView style={styles.container}>
            <ScrollView>
              <View style={styles.mainView}>
                <TermsView
                  title={I18n.t('about_us')}
                  description={description}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </>
      ) : (
        <Loader />
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

export default AboutUs;
