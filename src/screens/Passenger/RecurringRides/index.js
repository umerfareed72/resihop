import React, {useState, useRef, useEffect} from 'react';
import {SafeAreaView, View, FlatList, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  BlankTrip,
  CancelRideModal,
  CustomHeader,
  Loader,
  RecurringRideCard,
  RideFilterModal,
  SortModal,
  BlankField,
} from '../../../components';
import {get, post} from '../../../services';
import * as Types from '../../../redux/types/map.types';
import {appIcons, appImages, colors, header, WP} from '../../../utilities';
import {useIsFocused} from '@react-navigation/core';
import I18n from '../../../utilities/translations';
import {
  MyRidesFiltering,
  MyRidesSortOrder,
  setAvailableSeats,
  setCity,
  setOrigin,
  setReturnMapDestination,
} from '../../../redux/actions/map.actions';
import {checkAppPermission} from '../../../utilities/helpers/permissions';
import {Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {RIDES_CONST} from '../../../utilities/routes';

function index(props) {
  const filterModalRef = useRef(null);
  const sortModalRef = useRef(null);
  const [time, settime] = useState('');
  const [date, setdate] = useState('');
  const [ridetype, setRideType] = useState('');
  const [status, setStatus] = useState('');
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const {recurring_ride, availableSeats} = useSelector(state => state.map);
  const [isLoading, setisLoading] = useState(false);
  const [multiDelete, setmultiDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState([]);

  //Redux States
  const dispatch = useDispatch(null);
  const isFocus = useIsFocused(null);


  const sortRideritems = [
    {
      id: 1,
      title: I18n.t('sort_by_date_as'),
      value: 'tripDate:asc',
    },
    {
      id: 2,
      title: I18n.t('sort_by_date_ds'),

      value: 'tripDate:desc',
    },
    {
      id: 3,
      title: I18n.t('sort_by_date_ao'),
      value: 'destDes:asc',
    },
    {
      id: 4,
      title: I18n.t('sort_by_date_oa'),
      value: 'destDes:desc',
    },
  ];


  const selectTime = val => {
    settime(val);
  };
  const selectRideStatus = val => {
    setStatus(val);
  };
  const selectRideType = val => {
    setRideType(val);
  };

  const selectdDate = val => {
    setdate(val);
  };
  const resetFilter = () => {
    settime('');
    setdate('');
    setRideType('');
    dispatch(setAvailableSeats(0));
    setStatus('');
  };
  const onApplyFilter = () => {
    dispatch(
      MyRidesFiltering(
        'rides?recurring=true&',
        ridetype?.value,
        availableSeats,
        status?.value,
        res => {
          filterModalRef.current.close();
          sortModalRef.current.close();
          dispatch({
            type: Types.Get_Reccuring_Rides_Success,
            payload: res,
          });
        },
      ),
    );
  };
  const getRidesByOrder = item => {
    dispatch(
      MyRidesSortOrder('rides?recurring=true&', item?.value, res => {
        dispatch({
          type: Types.Get_Reccuring_Rides_Success,
          payload: res,
        });
      }),
    );
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
              props?.navigation?.navigate(route, {
                recurring: true,
              });
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
  const onPressCancel = async () => {
    try {
      setisLoading(true);
      let uniqueitems = [...new Set(selectedCard)];
      const requestBody = {
        rides: [].concat(...uniqueitems?.map(item => item?.rides_)),
      };
      console.log(requestBody);
      const res = await post(
        `${RIDES_CONST}/cancel`,
        requestBody,
        await header(),
      );
      if (res.data) {
        setisLoading(false);
        Alert.alert('Success', 'Rides deleted successfully', [
          {
            text: 'OK',
            onPress: () => {
              setmultiDelete(false);
              setSelectedCard([]);
              get_recurring_rides();
            },
          },
        ]);
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
      Alert.alert('Failed', 'Unable to delete rides', [
        {
          text: 'OK',
          onPress: () => {
            setmultiDelete(false);
            setSelectedCard([]);
          },
        },
      ]);
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
          title={I18n.t('my_recurring_rides')}
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
                    multiDelete={multiDelete}
                    ride={item}
                    onPressCard={() => {
                      if (multiDelete) {
                        setSelectedCard(item);
                      } else {
                        onPressCardItem(item);
                      }
                    }}
                    selectedCard={selectedCard}
                    setSelectedCard={item => {
                      setmultiDelete(true);
                      setSelectedCard(item);
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
        seats={seats}
        onPressdate={selectdDate}
        onPressrideType={selectRideType}
        onPressseats={item => dispatch(setAvailableSeats(item))}
        onPresstime={selectTime}
        onPressstatus={selectRideStatus}
        show={filterModalRef}
        selectedStatus={status}
        selectedRideType={ridetype}
        selectedSeats={availableSeats}
        onPressReset={resetFilter}
        onApply={() => {
          onApplyFilter();
        }}
      />
      <SortModal show={sortModalRef} onPress={getRidesByOrder} sortItems={sortRideritems} />
      {multiDelete && (
        <CancelRideModal
          onPressCancel={() => {
            onPressCancel();
          }}
          onPressClose={() => {
            setmultiDelete(false);
            setSelectedCard([]);
          }}
          show={multiDelete}
        />
      )}
    </>
  );
}

export default index;
