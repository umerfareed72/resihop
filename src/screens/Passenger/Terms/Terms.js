import I18n from 'i18n-js';
import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CustomHeader} from '../../../components/Header/CustomHeader';
import TermsView from '../../../components/TermsView/TermsView';
import {colors, HP} from '../../../utilities';

const Terms = ({navigation}) => {
  let description = I18n.t('lorem');
  return (
    <>
      <CustomHeader
        navigation={navigation}
        title={I18n.t('terms_title')}
        backButton={true}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.mainView}>
            <TermsView
              title={I18n.t('terms_title')}
              description={description}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
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

export default Terms;
