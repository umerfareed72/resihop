import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {BlockedListCard, CustomHeader} from '../../../components';
import I18n from '../../../utilities/translations';
import styles from './styles';
const BlockedList = ({navigation}) => {
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
            data={[
              {id: 1, card: false},
              {id: 2, card: false},
              {id: 3, card: true},
            ]}
            renderItem={({item}) => {
              return <BlockedListCard card1={item?.card} />;
            }}
          />
        </View>
      </View>
    </>
  );
};

export default BlockedList;
