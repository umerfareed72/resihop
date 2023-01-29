import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Linking, SafeAreaView, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from 'react-redux';
import {
  BlankTrip,
  CancelRideModal,
  CustomHeader,
  Loader,
  RecurringRideCard,
  RideFilterModal,
  SortModal
} from '../../../components';
import {
  MyDrivesFiltering,
  MyRidesSortOrder,
  setAvailableSeats,
  setOrigin,
  setReturnMapDestination
} from '../../../redux/actions/map.actions';
import * as Types from '../../../redux/types/map.types';
import { get, post } from '../../../services';
import {
  appIcons, colors,
  header,
  WP
} from '../../../utilities';
import { checkAppPermission } from '../../../utilities/helpers/permissions';
import { DRIVE_CONST } from '../../../utilities/routes';
import I18n from '../../../utilities/translations';




function index(props) {
  const filterModalRef = useRef(null);
  const sortModalRef = useRef(null);
  const [time, settime] = useState('');
  const [date, setdate] = useState('');
  const [ridetype, setRideType] = useState('');
  const [status, setStatus] = useState('');
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const {recurring_drive, availableSeats} = useSelector(state => state.map);
  const [isLoading, setisLoading] = useState(false);
  const [multiDelete, setmultiDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState([]);

  //Redux States
  const dispatch = useDispatch(null);


   const sortItemsDriver = [
    {
      id: 1,
      title: I18n.t('sort_by_date_as'),
  
      value: 'date:asc',
    },
    {
      id: 2,
      title: I18n.t('sort_by_date_ds'),
  
      value: 'date:desc',
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
  



  const selectRideStatus = val => {
    setStatus(val);
  };
  const selectRideType = val => {
    setRideType(val);
  };

  const getDrivesByOrder = item => {
    dispatch(
      MyRidesSortOrder('drives?recurring=true&', item?.value, res => {
        dispatch({
          type: Types.Get_Reccuring_Drives_Success,
          payload: res,
        });
      }),
    );
  };
  //Get All Rides Data
  useEffect(() => {
    get_recurring_drives();
    return () => {
      dispatch(setAvailableSeats(0));
    };
  }, []);

  const get_recurring_drives = async () => {
    setisLoading(true);
    try {
      const res = await get(
        `drives?recurring=true&status_in=WAITING_FOR_MATCH&status_in=MATCHING_DONE&status_in=CONFIRMED&status_in=ON_THE_WAY`,
        await header(),
      );
      if (res.data) {
        setisLoading(false);
        dispatch({
          type: Types.Get_Reccuring_Drives_Success,
          payload: res.data,
        });
      }
    } catch (error) {
      setisLoading(false);
      dispatch({
        type: Types.Get_Reccuring_Drives_Failure,
        payload: null,
      });
    }
  };
  //On Press Drives
  const onPressDrive = item => {
    props?.navigation?.navigate('DRecurringRideDetail', {
      drive: item,
    });
  };
  // Get Location
  const getLocation = async route => {
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
              props?.navigation.navigate(route, {recurring: true});
            })
            .catch(error => console.warn(error));
        },
        error => {
          // See error code charts below.
          // console.log(error.code, error.message);
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
  const onPressCancel = async () => {
    try {
      setisLoading(true);
      let uniqueitems = [...new Set(selectedCard)];
      const requestBody = {
        drives: [].concat(...uniqueitems?.map(item => item?.drives_)),
      };
      const res = await post(
        `${DRIVE_CONST}/cancel`,
        requestBody,
        await header(),
      );
      if (res.data) {
        setisLoading(false);
        Alert.alert('Success', 'Drives deleted successfully', [
          {
            text: 'OK',
            onPress: () => {
              setmultiDelete(false);
              setSelectedCard([]);
              get_recurring_drives();
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
  const resetFilter = () => {
    settime('');
    setdate('');
    setRideType('');
    dispatch(setAvailableSeats(0));
    setStatus('');
  };
  const onApplyFilter = () => {
    dispatch(
      MyDrivesFiltering(
        'drives?recurring=true&',
        ridetype?.value,
        availableSeats,
        status?.value,
        res => {
          filterModalRef.current.close();
          sortModalRef.current.close();
          dispatch({
            type: Types.Get_Reccuring_Drives_Success,
            payload: res,
          });
        },
      ),
    );
  };
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <CustomHeader
          onPressbtnImage={() => sortModalRef.current.open()}
          onPressbtnImage1={() => filterModalRef.current.open()}
          btnImage={appIcons.mobiledata}
          btnImage1={appIcons.filter}
          title={I18n.t('my_recurring_drives')}
          navigation={props?.navigation}
          backButton={true}
        />
        <View style={{flex: 1}}>
          {recurring_drive != '' ? (
            <FlatList
              style={{height: '80%'}}
              showsVerticalScrollIndicator={false}
              data={recurring_drive}
              renderItem={({item}) => {
                return (
                  <RecurringRideCard
                    multiDelete={multiDelete}
                    ride={item}
                    onPressCard={() => {
                      if (multiDelete) {
                        setSelectedCard(item);
                      } else {
                        onPressDrive(item);
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
                icon={appIcons.driver_home}
                text={I18n.t('create_first_drive')}
                onPress={() => getLocation('CreateDrive')}
                role={'driver'}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
      <RideFilterModal
        seats={seats}
        onPressrideType={selectRideType}
        onPressseats={item => dispatch(setAvailableSeats(item))}
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
      <SortModal
        sortItems={sortItemsDriver}
        show={sortModalRef}
        onPress={getDrivesByOrder}
      />
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
      {isLoading && <Loader />}
    </>
  );
}

export default index;
