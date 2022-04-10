import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {
  CustomHeader,
  PaymentFilterModal,
  SortModal,
  TransHistoryCard,
} from '../../../../components';
import {
  appIcons,
  appImages,
  baseURL,
  checkConnected,
  header,
} from '../../../../utilities';
import I18n from '../../../../utilities/translations';
import styles from './style';
import {useIsFocused} from '@react-navigation/native';
import {get} from '../../../../services';
import {FlatList} from 'react-native';

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
  const [transactions, settransactions] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const isFocus = useIsFocused(null);
  const auth = useSelector(state => state.auth);
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
        btnImage1={appIcons.filter}
        height3={25}
        width3={25}
        onPressbtnImage1={() => {
          filterModalRef.current.open();
        }}
        onPressbtnImage={() => {
          sortModalRef.current.open();
        }}
        btnImage={appIcons.mobiledata}
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
