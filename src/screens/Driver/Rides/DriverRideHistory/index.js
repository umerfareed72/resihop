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
  Loader,
  SortModal,
  BlankField,
} from '../../../../components';
import {appIcons, appImages, colors} from '../../../../utilities';
import I18n from '../../../../utilities/translations';
import styles from './style';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  get_drives_history,
  MyRidesHistorySortOrder,
  select_drive_history,
} from '../../../../redux/actions/map.actions';
import mapTypes from '../../../../redux/types/map.types';

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
  const [isLoading, setisLoading] = useState(false);
  const [seats, setSeats] = useState('');
  const drives = useSelector(state => state.map);
  const dispatch = useDispatch(null);
  const isFocus = useIsFocused();
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
  //Get Drives
  useEffect(() => {
    if (isFocus) {
      getRides();
    }
  }, [isFocus]);
  const getRidesByOrder = item => {
    dispatch(
      MyRidesHistorySortOrder('drives', item?.value, res => {
        dispatch({
          type: mapTypes.Get_Drives_Success,
          payload: res,
        });
      }),
    );
  };
  const getRides = () => {
    setisLoading(true);
    try {
      dispatch(
        get_drives_history(res => {
          setisLoading(false);
        }),
      );
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  return (
    <>
      <CustomHeader
        backButton={true}
        title={I18n.t('driver_ride_history')}
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
        {drives?.drive_history != '' ? (
          <View style={styles.contentContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={drives?.drive_history}
              renderItem={({item}) => {
                return (
                  <DRideHistoryCard
                    drive_item={item}
                    profilePic={true}
                    onPressCard={() => {
                      dispatch(
                        select_drive_history(item, () => {
                          navigation?.navigate('DriverRideDetail');
                        }),
                      );
                    }}
                  />
                );
              }}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
            />
          </View>
        ) : (
          <BlankField title={'No Drive Completed Yet.'} />
        )}
      </View>
      <DRideFilterModal
        seats={seatsList}
        rideType={rideTypeList}
        onPressrideType={selectRideType}
        onPressseats={selectSeats}
        show={filterModalRef}
        selectedRideType={ridetype}
        selectedSeats={seats}
        onPressReset={resetFilter}
        onApply={() => {
          filterModalRef.current.close();
          sortModalRef.current.close();
        }}
      />
      <SortModal show={sortModalRef} onPress={getRidesByOrder} />
      {isLoading ? <Loader /> : false}
    </>
  );
};

export default index;
