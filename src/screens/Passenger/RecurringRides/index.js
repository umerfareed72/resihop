import React, {useState, useRef, useEffect} from 'react';
import {SafeAreaView, View, FlatList, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  BlankTrip,
  CustomHeader,
  Loader,
  RecurringRideCard,
  RideFilterModal,
  SortModal,
} from '../../../components';
import {get} from '../../../services';
import * as Types from '../../../redux/types/map.types';
import {appIcons, appImages, colors, header, WP} from '../../../utilities';
import BlankField from '../../../components/BlankField';
import {useIsFocused} from '@react-navigation/core';
import I18n from '../../../utilities/translations';
import {
  setCity,
  setOrigin,
  setReturnMapDestination,
} from '../../../redux/actions/map.actions';
import {checkAppPermission} from '../../../utilities/helpers/permissions';
import {Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

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

function index(props) {
  const filterModalRef = useRef(null);
  const sortModalRef = useRef(null);
  const [time, settime] = useState('');
  const [date, setdate] = useState('');
  const [ridetype, setRideType] = useState('');
  const [status, setStatus] = useState('');
  const [seats, setSeats] = useState('');
  const {recurring_ride} = useSelector(state => state.map);
  const [isLoading, setisLoading] = useState(false);
  //Redux States
  const dispatch = useDispatch(null);
  const isFocus = useIsFocused(null);
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
  const onPressCardItem = item => {
    props?.navigation?.navigate('RecurringRideDetail', {
      ride: item,
    });
  };
  useEffect(() => {
    if (isFocus) {
      get_recurring_rides();
    }
  }, [isFocus]);

  // Get Location
  const getLocation = async route => {
    dispatch(setCity(false));
    const permission = await checkAppPermission('location');
    if (permission) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position?.coords;
          Geocoder.from(latitude, longitude)
            .then(json => {
              var addressComponent = json.results[0]?.formatted_address;
              dispatch(
                setOrigin({
                  location: {lat: latitude, lng: longitude},
                  description: addressComponent,
                }),
              );
              dispatch(
                setReturnMapDestination({
                  location: {lat: latitude, lng: longitude},
                  description: addressComponent,
                }),
              );
              props?.navigation?.navigate(route);
            })
            .catch(error => console.warn(error));
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      Alert.alert('Error', 'Location Permission Denied', [
        {
          onPress: () => {
            Linking.openURL('app-settings:');
          },
        },
      ]);
    }
  };
  //Get Recurring Rides
  const get_recurring_rides = async () => {
    setisLoading(true);
    try {
      const res = await get(
        `rides?recurring=true&status_in=WAITING_FOR_MATCH&status_in=MATCHING_DONE&status_in=CONFIRMED&status_in=ON_THE_WAY&_sort=tripDate`,
        await header(),
      );
      if (res.data) {
        setisLoading(false);
        dispatch({
          type: Types.Get_Reccuring_Rides_Success,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
      dispatch({
        type: Types.Get_Reccuring_Rides_Failure,
        payload: null,
      });
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <CustomHeader
          onPressbtnImage={() => sortModalRef.current.open()}
          onPressbtnImage1={() => filterModalRef.current.open()}
          btnImage={appIcons.mobiledata}
          btnImage1={appIcons.filter}
          title={'My Recurring Rides'}
          navigation={props?.navigation}
          backButton={true}
        />
        <View style={{flex: 1}}>
          {recurring_ride != '' ? (
            <FlatList
              style={{height: '80%'}}
              showsVerticalScrollIndicator={false}
              data={recurring_ride}
              renderItem={({item}) => {
                return (
                  <RecurringRideCard
                    ride={item}
                    onPressCard={() => {
                      onPressCardItem(item);
                    }}
                  />
                );
              }}
            />
          ) : (
            <View
              style={{
                marginTop: WP('30'),
              }}>
              <BlankTrip
                icon={appIcons.noUpcomingRide}
                role={'passenger'}
                onPress={() => {
                  getLocation('CreateRide');
                }}
                text={I18n.t('first_ride')}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
      {isLoading && <Loader />}
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
          props.navigation.navigate('RecurringRideDetail');
        }}
      />
      <SortModal show={sortModalRef} />
    </>
  );
}

export default index;
