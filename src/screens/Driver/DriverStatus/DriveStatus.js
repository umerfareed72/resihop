import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {colors, appIcons} from '../../../utilities';
import MapViewComponent from '../../../components/MapViewComponent';
import {fonts} from '../../../theme';
import {useNavigation} from '@react-navigation/core';
import {CopyRideModal, DeleteCardModal} from '../../../components';
import I18n from '../../../utilities/translations';
import {
  setOrigin,
  setMapDestination,
  setIDToUpdateDrive,
  CancelRide,
  SetRidesResponse,
  setReturnOrigin,
  setReturnMapDestination,
  setReturnFirstTime,
  setDateTimeStamp,
  setAvailableSeats,
  CreateDriveRequest,
  setTime,
  setCostPerSeat,
} from '../../../redux/actions/map.actions';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';
import CalendarSheet from '../../CalendarSheet';
import moment from 'moment';
import CreateDrive from '../CreateDrive/CreateDrive';

const DriveStatus = ({route}) => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  const calendarSheetRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setshow] = useState(false);
  const [selected, setSelected] = useState(false);
  const [modal, setModal] = useState('driveStatus');
  const {
    status,
    startLocation,
    destinationLocation,
    startDes,
    destDes,
    id,
    availableSeats,
    cost,
    drive_date,
    bookedSeats,
  } = route.params;
  const [isLoading, setisLoading] = useState(false);
  const {dateTimeStamp} = useSelector(state => state.map);

  useEffect(() => {
    dispatch(
      setOrigin({
        location: {lat: startLocation.latitude, lng: startLocation.longitude},
        description: startDes,
      }),
    );
    dispatch(
      setMapDestination({
        location: {
          lat: destinationLocation.latitude,
          lng: destinationLocation.longitude,
        },
        description: destDes,
      }),
    );
    dispatch(
      setReturnOrigin({
        location: {
          lat: destinationLocation.latitude,
          lng: destinationLocation.longitude,
        },
        description: destDes,
      }),
    );

    dispatch(
      setReturnMapDestination({
        location: {lat: startLocation.latitude, lng: startLocation.longitude},
        description: startDes,
      }),
    );
    dispatch(setAvailableSeats(availableSeats));
    dispatch(setCostPerSeat(cost));
    dispatch(setTime(moment(drive_date).format('HH:mm')));
    dispatch(setDateTimeStamp(drive_date));

    return () => {
      dispatch(setAvailableSeats(0));
      dispatch(setOrigin(null));
      dispatch(setMapDestination(null));
      dispatch(setDateTimeStamp(null));
      dispatch(SetRidesResponse(null));
      dispatch(setReturnOrigin(null));
      dispatch(setReturnMapDestination(null));
      dispatch(setReturnFirstTime(null));
    };
  }, []);

  const handleCancelRide = () => {
    dispatch(
      CancelRide(id, 'drives', setisLoading, response => {
        setSelected(true);
        setshow(false);
        Alert.alert('Success', 'Drive Cancelled Successfully', [
          {
            text: 'Ok',
            onPress: () => {
              navigation?.navigate('DriverHome');
            },
          },
        ]);
      }),
    );
  };
  const handleCopyDrive = () => {
    calendarSheetRef?.current?.close();
    setModalVisible(false);
    const stamp = moment(
      `${dateTimeStamp}T${moment(drive_date).format('HH:mm')}`,
    ).valueOf();
    const body = {
      startLocation: [startLocation?.latitude, startLocation?.longitude],
      destinationLocation: [
        destinationLocation?.latitude,
        destinationLocation?.longitude,
      ],
      date: stamp,
      availableSeats: availableSeats + bookedSeats,
      path: 0,
      costPerSeat: cost,
      interCity: false,
      startDes: startDes,
      destDes: destDes,
    };
    console.log(body);
    dispatch(
      CreateDriveRequest(body, setisLoading, response => {
        navigation?.navigate('DriverHome');
      }),
    );
  };

  return (
    <>
      <View style={styles.container}>
        <MapViewComponent
          rideModals={modal}
          status={status}
          setModal={setModal}
          onPressCancel={() => {
            setshow(true);
          }}
          onPressCopyDrive={() => {
            calendarSheetRef?.current?.open();
          }}
        />
        <TouchableOpacity
          style={styles.arrowBackCircle}
          onPress={() => navigation.goBack()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={appIcons.backArrow}
              resizeMode="contain"
              style={styles.arrowBack}
            />
            <Text style={styles.driver}>{I18n.t('drivers')}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {show && (
        <DeleteCardModal
          image={appIcons.cancel}
          onPressHide={() => {
            setshow(false);
          }}
          selected={selected}
          h1={I18n.t('delete_h1')}
          h2={I18n.t('delete_h2')}
          btn1Text={I18n.t('yes')}
          btn2Text={I18n.t('no')}
          show={show}
          bgColor={colors.green}
          textColor={colors.white}
          onPressYes={() => {
            handleCancelRide();
          }}
          onPressNo={() => {
            setSelected(false);
            setshow(false);
          }}
        />
      )}
      <CalendarSheet
        calendarSheetRef={calendarSheetRef}
        setModalVisible={setModalVisible}
      />
      <CopyRideModal
        title={'Do you want to copy this Drive to selected date?'}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleCopyRide={handleCopyDrive}
      />
    </>
  );
};

export default DriveStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  arrowBack: {
    height: 15,
    width: 15,
  },
  arrowBackCircle: {
    height: 42,
    width: '85%',
    backgroundColor: colors.white,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    top: 50,
    marginLeft: 18,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowColor: colors.dropShadow2,
    borderRadius: 10,
    paddingLeft: 14,
  },
  driver: {
    fontSize: 16,
    fontFamily: fonts.regular,
    lineHeight: 26,
    color: colors.txtBlack,
    marginLeft: 16,
  },
});
