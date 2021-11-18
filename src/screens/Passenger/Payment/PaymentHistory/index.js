import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageStore,
} from 'react-native';
import {CustomHeader, TransHistoryCard} from '../../../../components';
import {appIcons, appImages} from '../../../../utilities';
import I18n from '../../../../utilities/translations';
import styles from './style';

const index = ({navigation}) => {
  return (
    <>
      <CustomHeader
        backButton={true}
        title={I18n.t('trnsaction_history')}
        navigation={navigation}
        btnImage={appIcons.filter}
        btnImage1={appIcons.mobiledata}
      />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <TransHistoryCard />
        </View>
      </View>
    </>
  );
};

export default index;
