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
  MyRidesHistorySortOrder,
  MyRidesSortOrder,
  select_ride_history,
} from '../../../../redux/actions/map.actions';
import mapTypes from '../../../../redux/types/map.types';
import BlankField from '../../../../components/BlankField';

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
  const [loading, setloading] = useState(false);
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
    setloading(true);
    dispatch(
      get_rides_history(res => {
        setloading(false);
        // console.log(res);
      }),
    );
  };

  const getRidesByOrder = item => {
    dispatch(
      MyRidesHistorySortOrder('rides', item?.value, res => {
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
        // btnImage1={appIcons.filter}
        height3={25}
        width3={25}
        // onPressbtnImage1={() => {
        //   filterModalRef.current.open();
        // }}
        onPressbtnImage={() => {
          sortModalRef.current.open();
        }}
        btnImage={appIcons.mobiledata}
      />
      <View style={styles.container}>
        {rides?.ride_history != '' ? (
          <View style={styles.contentContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={rides?.ride_history}
              renderItem={({item}) => {
                return (
                  <RideHistoryCard
                    dateTime={item?.tripDate}
                    profilePic={true}
                    cost={'30'}
                    onPressCard={() => {
                      dispatch(
                        select_ride_history(item, () => {
                          navigation?.navigate('RideDetail');
                        }),
                      );
                    }}
                    ride_status={item?.status}
                    no_of_seats={item?.requiredSeats}
                    startLocation={item?.startDes}
                    destination={item?.destDes}
                    vehicleInfo={item?.drive?.user?.vehicle}
                  />
                );
              }}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
            />
          </View>
        ) : (
          <BlankField title={'No Ride Completed Yet.'} />
        )}
      </View>

      <RideFilterModal
        seats={seatsList}
        onPressrideType={selectRideType}
        onPressseats={selectSeats}
        show={filterModalRef}
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
      {loading ? <Loader /> : null}
    </>
  );
};

export default index;
