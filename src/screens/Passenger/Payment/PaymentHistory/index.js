import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageStore,
} from 'react-native';
import {
  CustomHeader,
  PaymentFilterModal,
  SortModal,
  TransHistoryCard,
} from '../../../../components';
import {appIcons, appImages} from '../../../../utilities';
import I18n from '../../../../utilities/translations';
import styles from './style';
//Data
var TimeFrame = {
  id: 1,
  title: 'Time',
  items: [
    {id: 1, text: 'Last Month'},
    {id: 2, text: 'This Year'},
    {id: 3, text: 'Last Year'},
  ],
};

var Cost = {
  id: 2,
  title: 'Cost',
  items: [
    {id: 1, text: '05'},
    {id: 2, text: '10'},
    {id: 3, text: '15'},
  ],
};

const TransactionType = {
  id: 3,
  title: 'Transaction Type',
  items: [
    {id: 1, text: 'Paid for Ride'},
    {id: 2, text: 'Withdrawal'},
    {id: 3, text: 'Paid by Passenger'},
  ],
};

const index = ({navigation}) => {
  const filterModalRef = useRef(null);
  const sortModalRef = useRef(null);
  //States
  const [time, settime] = useState('');
  const [cost, setCost] = useState('');
  const [transactiontype, setTransactionType] = useState('');

  const selectTime = val => {
    settime(val);
  };
  const selecttransType = val => {
    setTransactionType(val);
  };

  const selectdCost = val => {
    setCost(val);
  };
  const resetFilter = () => {
    settime('');
    setCost('');
    setTransactionType('');
  };

  return (
    <>
      <CustomHeader
        backButton={true}
        title={I18n.t('trnsaction_history')}
        navigation={navigation}
        btnImage={appIcons.filter}
        onPress={() => {
          filterModalRef.current.open();
        }}
        onPress1={() => {
          sortModalRef.current.open();
        }}
        btnImage1={appIcons.mobiledata}
      />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <TransHistoryCard />
        </View>
      </View>
      <PaymentFilterModal
        time={TimeFrame}
        cost={Cost}
        transactionType={TransactionType}
        onPressCost={selectdCost}
        onPresstime={selectTime}
        onPresstransType={selecttransType}
        show={filterModalRef}
        selectedTime={time}
        selectedTransType={transactiontype}
        selectedCost={cost}
        onPressReset={resetFilter}
      />
      <SortModal show={sortModalRef} />
    </>
  );
};

export default index;
