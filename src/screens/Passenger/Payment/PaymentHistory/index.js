import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import {
  CustomHeader, TransHistoryCard
} from '../../../../components';
import { get } from '../../../../services';
import {
  baseURL,
  checkConnected,
  header
} from '../../../../utilities';
import I18n from '../../../../utilities/translations';
import styles from './style';

const index = ({navigation}) => {
  //States
  const [transactiontype, setTransactionType] = useState('');
  const [transactions, settransactions] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const isFocus = useIsFocused(null);
  const auth = useSelector(state => state.auth);




  useEffect(() => {
    if (isFocus) {
      getTransactions();
    }
  }, [isFocus]);
  const getTransactions = async () => {
    try {
      setisLoading(true);
      const check = await checkConnected();
      if (check) {
        const res = await get(
          `${baseURL}transactions?user=${auth?.profile_info?.id}`,
          await header(),
        );
        if (res?.data) {
          settransactions(res?.data);
          setisLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  return (
    <>
      <CustomHeader
        backButton={true}
        title={I18n.t('trnsaction_history')}
        navigation={navigation}
        // btnImage1={appIcons.filter}
        height3={25}
        width3={25}
     
      />

      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <FlatList
            data={transactions}
            renderItem={({item}) => {
              return <TransHistoryCard item={item?.payment} />;
            }}
          />
        </View>
      </View>

    </>
  );
};

export default index;
