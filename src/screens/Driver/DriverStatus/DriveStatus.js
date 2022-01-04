import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {colors, appIcons} from '../../../utilities';
import MapViewComponent from '../../../components/MapViewComponent';
import {fonts} from '../../../theme';
import {useNavigation} from '@react-navigation/core';
import {DeleteCardModal} from '../../../components';
import I18n from '../../../utilities/translations';
import {
  setOrigin,
  setMapDestination,
  setIDToUpdateDrive,
} from '../../../redux/actions/map.actions';
import {useDispatch} from 'react-redux';

const DriveStatus = ({route}) => {
  let navigation = useNavigation();
  let dispatch = useDispatch();

  const [show, setshow] = useState(false);
  const [selected, setSelected] = useState(false);
  const [modal, setModal] = useState('driveStatus');
  const {status} = route.params;

  useEffect(() => {
    const {startLocation, destinationLocation, startDes, destDes, id} =
      route.params;

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

    return () => {
      dispatch(setOrigin(null));
      dispatch(setMapDestination(null));
    };
  }, []);

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
            <Text style={styles.driver}>Driver's</Text>
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
            setSelected(true);
            setshow(false);
          }}
          onPressNo={() => {
            setSelected(false);
            setshow(false);
          }}
        />
      )}
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
