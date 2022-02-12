import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {
  CustomHeader,
  Loader,
  RideFilterModal,
  RideHistoryCard,
  SortModal,
} from '../../../../components';
import {appIcons, appImages, colors} from '../../../../utilities';
import I18n from '../../../../utilities/translations';
import styles from './style';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  get_rides_history,
  MyRidesSortOrder,
  select_ride_history,
} from '../../../../redux/actions/map.actions';
import mapTypes from '../../../../redux/types/map.types';
//Data
var TimeList = {
  id: 1,
  title: 'Time',
  items: [
    {id: 1, text: '08:00 to 12:00', status: false},
    {id: 2, text: '08:00 to 12:00', status: false},
    {id: 3, text: '08:00 to 12:00', status: false},
  ],
};

var RideStatusList = {
  id: 1,
  title: 'Ride Status',
  items: [
    {id: 1, text: 'Confirmed', status: false},
    {id: 2, text: 'Waiting for Match', status: false},
    {id: 3, text: 'Matching Done', status: false},
  ],
};

const rideTypeList = {
  id: 4,
  title: 'Ride Type',
  items: [
    {id: 1, text: 'All Rides'},
    {id: 2, text: 'Destination Rides'},
    {id: 3, text: 'Return Rides'},
  ],
};

const DateList = {
  id: 1,
  title: 'Date',
  items: [
    {id: 1, text: '12 June'},
    {id: 2, text: '13 June'},
    {id: 3, text: '14 June'},
    {id: 4, text: '15 June'},
    {id: 5, text: '16 June'},
  ],
};

const seatsList = {
  id: 5,
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
  const [date, setdate] = useState('');
  const [ridetype, setRideType] = useState('');
  const [status, setStatus] = useState('');
  const [seats, setSeats] = useState('');
  const isFocus = useIsFocused();
  const rides = useSelector(state => state.map);
  const dispatch = useDispatch(null);
  const selectTime = val => {
    settime(val);
  };
  const selectRideStatus = val => {
    setStatus(val);
  };

  const selectRideType = val => {
    setRideType(val);
  };

  const selectSeats = val => {
    setSeats(val);
  };

  const selectdDate = val => {
    setdate(val);
  };

  const resetFilter = () => {
    settime('');
    setdate('');
    setRideType('');
    setSeats('');
    setStatus('');
  };

  useEffect(() => {
    if (isFocus) {
      getRides();
    }
  }, [isFocus]);

  const getRides = async () => {
    dispatch(
      get_rides_history(res => {
        // console.log(res);
      }),
    );
  };

  const getRidesByOrder = item => {
    dispatch(
      MyRidesSortOrder('rides', item?.value, res => {
        dispatch({
          type: mapTypes.Get_Rides_Success,
          payload: res,
        });
      }),
    );
  };
  return (
    <>
      <CustomHeader
        backButton={true}
        title={I18n.t('ride_history')}
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
            data={rides?.ride_history}
            renderItem={({item}) => {
              return (
                <RideHistoryCard
                  dateTime={item?.createdAt}
                  profilePic={true}
                  cost={'30'}
                  onPressCard={() => {
                    dispatch(
                      select_ride_history(item, () => {
                        navigation?.navigate('RideDetail');
                      }),
                    );
                  }}
                  no_of_seats={item?.requiredSeats}
                  startLocation={item?.startDes}
                  destination={item?.destDes}
                />
              );
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
          />
        </View>
      </View>
      <RideFilterModal
        time={TimeList}
        seats={seatsList}
        rideType={rideTypeList}
        status={RideStatusList}
        date={DateList}
        onPressdate={selectdDate}
        onPressrideType={selectRideType}
        onPressseats={selectSeats}
        onPresstime={selectTime}
        onPressstatus={selectRideStatus}
        show={filterModalRef}
        selectedTime={time}
        selectedDate={date}
        selectedStatus={status}
        selectedRideType={ridetype}
        selectedSeats={seats}
        onPressReset={resetFilter}
        onApply={() => {
          filterModalRef.current.close();
          sortModalRef.current.close();
        }}
      />
      <SortModal show={sortModalRef} onPress={getRidesByOrder} />
      {rides?.loading ? <Loader /> : null}
    </>
  );
};

export default index;
