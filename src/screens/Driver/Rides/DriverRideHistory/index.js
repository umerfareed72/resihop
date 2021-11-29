import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageStore,
  FlatList,
} from 'react-native';
import {
  CustomHeader,
  DRideFilterModal,
  DRideHistoryCard,
  PaymentFilterModal,
  RideFilterModal,
  RideHistoryCard,
  SortModal,
  TransHistoryCard,
} from '../../../../components';
import {appIcons, appImages, colors} from '../../../../utilities';
import I18n from '../../../../utilities/translations';
import styles from './style';
//Data
var TimeList = {
  id: 1,
  title: 'Timeframe',
  items: [
    {id: 1, text: 'Today', status: false},
    {id: 2, text: 'This Week', status: false},
    {id: 3, text: 'This Month', status: false},
    {id: 3, text: 'This Month', status: false},
    {id: 3, text: 'This Year', status: false},
  ],
};

const rideTypeList = {
  id: 2,
  title: 'Ride Type',
  items: [
    {id: 1, text: 'All Rides'},
    {id: 2, text: 'Destination Rides'},
    {id: 3, text: 'Return Rides'},
  ],
};

const seatsList = {
  id: 3,
  title: 'Seat',
  items: [
    {id: 1, icon: appImages.seatBlue},
    {id: 2, icon: appImages.seatBlue},
    {id: 3, icon: appImages.seatBlue},
    {id: 4, icon: appImages.seatBlue},
    {id: 5, icon: appImages.seatBlue},
    {id: 6, icon: appImages.seatBlue},
  ],
};

const index = ({navigation}) => {
  const filterModalRef = useRef(null);
  const sortModalRef = useRef(null);
  //States
  const [time, settime] = useState('');
  const [ridetype, setRideType] = useState('');
  const [seats, setSeats] = useState('');

  const selectTime = val => {
    settime(val);
  };

  const selectRideType = val => {
    setRideType(val);
  };
  const selectSeats = val => {
    setSeats(val);
  };

  const resetFilter = () => {
    settime('');
    setRideType('');
    setSeats('');
  };

  return (
    <>
      <CustomHeader
        backButton={true}
        title={I18n.t('driver_ride_history')}
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
            showsVerticalScrollIndicator={false}
            data={[1, 2, 3, 4, 5, 6, 7]}
            renderItem={() => {
              return (
                <DRideHistoryCard
                  profilePic={true}
                  onPressCard={() => {
                    navigation?.navigate('DriverRideDetail');
                  }}
                />
              );
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
          />
        </View>
      </View>
      <DRideFilterModal
        time={TimeList}
        seats={seatsList}
        rideType={rideTypeList}
        onPressrideType={selectRideType}
        onPressseats={selectSeats}
        onPresstime={selectTime}
        show={filterModalRef}
        selectedTime={time}
        selectedRideType={ridetype}
        selectedSeats={seats}
        onPressReset={resetFilter}
        onApply={() => {
          filterModalRef.current.close();
          sortModalRef.current.close();
        }}
      />
      <SortModal show={sortModalRef} />
    </>
  );
};

export default index;
