import React, {Component} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Text} from 'react-native';
import {CustomHeader} from '../../components/Header/CustomHeader';
import styles from './style';
import I18n from '../../utilities/translations';
import {FlatList} from 'react-native-gesture-handler';
import {PledgeCard, AgreeButton} from '../../components';
import {colors} from '../../utilities';
const index = ({navigation}) => {
  return (
    <>
      <CustomHeader navigation={navigation} backButton={true} />
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.h1Container}>
            <Text style={styles.h1}>{I18n.t('pledge_text_h1')}</Text>
          </View>
          <FlatList
            style={{height: '80%'}}
            showsVerticalScrollIndicator={false}
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={() => {
              return <PledgeCard />;
            }}
          />
          <View style={styles.btnWrapper}>
            <AgreeButton
              onPress={() => {
                navigation?.replace('PassengerDashboard');
              }}
              fontWeight={'bold'}
              bgColor={colors.primary}
              title={I18n.t('pledge_agree')}
              txtColor={colors.white}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default index;
