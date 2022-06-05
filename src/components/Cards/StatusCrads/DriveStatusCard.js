import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fonts} from '../../../theme';
import {appImages, colors, header} from '../../../utilities';
import CallIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/core';
import I18n from '../../../utilities/translations';
import {useSelector, useDispatch} from 'react-redux';
import {get} from '../../../services';
import {DRIVE_CONST} from '../../../utilities/routes';
import {create_agoral_channel} from '../../../redux/actions/app.action';

export const DriveStatusCard = ({
  status,
  setModal,
  onPressCancel,
  onPressCopyDrive,
}) => {
  const driveItem = useSelector(state => state.map);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch(null);
  let navigation = useNavigation();
  const startDrive = async () => {
    try {
      const startDriveResponse = await get(
        `${DRIVE_CONST}/start/${driveItem?.idToUpdateDrive?.id}`,
        await header(),
      );
      navigation?.navigate('DriverHome');
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  const onCallPress = item => {
    const requestBody = {
      to: item?.user?._id,
    };
    console.log(requestBody);
    dispatch(
      create_agoral_channel(requestBody, res => {
        navigation?.navigate('CallNow', {
          firstName: item?.user?.firstName,
          lastName: item?.user?.lastName,
          picture: item?.user?.picture?.url,
        });
      }),
    );
  };

  if (status === 'WAITING_FOR_MATCH') {
    return (
      <View style={styles.waitcontainer}>
        <View style={styles.heading}>
          <Text style={styles.bookedTxt}>{I18n.t('booked_passengers')}</Text>
          <View style={styles.seatContainer}>
            {new Array(driveItem?.idToUpdateDrive?.availableSeats)
              .fill(driveItem?.idToUpdateDrive?.availableSeats)
              .map(() => (
                <Image
                  source={appImages.seatBlue}
                  resizeMode="contain"
                  style={styles.seat}
                />
              ))}
          </View>
        </View>
        <View
          style={[
            styles.statusContainer,
            {borderColor: getStatusColo(status)},
          ]}>
          <Text style={[styles.statusTxt, {color: getStatusColo(status)}]}>
            {status?.split('_')?.join(' ')}
          </Text>
        </View>
        <View style={[styles.btnWrapper, {width: '90%'}]}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => navigation.navigate('UpdateDrive')}>
            <Text style={styles.btnTxt}>{I18n.t('update')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressCopyDrive}
            style={styles.btnContainer}>
            <Text style={styles.btnTxt}>{I18n.t('copy')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCancel} style={styles.btnContainer}>
            <Text style={styles.btnTxt}>{I18n.t('cancel')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (status === 'ON_THE_WAY') {
    setModal('offerReturnDrive');
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.bookedTxt}>{I18n.t('booked_passengers')}</Text>
        <View style={styles.seatContainer}>
          {new Array(driveItem?.idToUpdateDrive?.availableSeats)
            .fill(driveItem?.idToUpdateDrive?.availableSeats)
            .map(() => (
              <Image
                source={appImages.seatBlue}
                resizeMode="contain"
                style={styles.seat}
              />
            ))}
        </View>
      </View>
      <View
        style={[styles.statusContainer, {borderColor: getStatusColo(status)}]}>
        <Text style={[styles.statusTxt, {color: getStatusColo(status)}]}>
          {status?.split('_')?.join(' ')}
        </Text>
      </View>
      <View>
        <FlatList
          data={driveItem?.idToUpdateDrive?.rides}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <PassengerInfoCard
              onPressCard={() => {
                navigation?.navigate('AddFavourites');
              }}
              onPressCall={() => onCallPress(item)}
              item={item}
            />
          )}
        />
      </View>
      <Text style={styles.warnTxt}>{I18n.t('calls_allowed_txt')}</Text>
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={onPressCopyDrive}>
          <Text style={styles.btnTxt}>{I18n.t('copy')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer} onPress={onPressCancel}>
          <Text style={styles.btnTxt}>{I18n.t('cancel')}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.startTripContainer}
        onPress={() => {
          startDrive();
        }}>
        <Icon name="angle-double-right" size={30} color={colors.white} />
        <Text style={styles.startTripTxt}>{I18n.t('start_drive')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const PassengerInfoCard = ({item, onPressCard, onPressCall}) => {
  return (
    <View style={styles.passengerInfoContainer}>
      <TouchableOpacity onPress={onPressCard} style={styles.nameContainer}>
        <Text style={{fontFamily: fonts.regular}}>
          {item?.user?.firstName} {item?.user?.lastName}
        </Text>
        <Image
          source={appImages.driver}
          resizeMode="cover"
          style={styles.driver}
        />
      </TouchableOpacity>
      <Text style={styles.pickUp}>{I18n.t('coming_to_start_location')}</Text>
      <View style={styles.btnMainContainer}>
        <Text style={{fontFamily: fonts.regular}}>{item.time}</Text>
        <TouchableOpacity onPress={onPressCall} style={styles.callNowContainer}>
          <CallIcon name="call" size={15} color={colors.white} />
          <Text style={styles.callNowTxt}>{I18n.t('call_now')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 452,
    width: '100%',
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  seat: {
    height: 25,
    width: 18,
    marginLeft: 2,
  },
  seatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookedTxt: {
    fontFamily: fonts.regular,
    fontSize: 20,
    lineHeight: 26,
    color: colors.txtBlack,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  statusTxt: {
    fontFamily: fonts.bebasBold,
    fontSize: 16,
    lineHeight: 16,
  },
  statusContainer: {
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    height: 23,
    justifyContent: 'center',
    marginHorizontal: 25,
    alignSelf: 'flex-start',
    marginTop: 18,
  },
  passengerInfoContainer: {
    height: 107,
    borderWidth: 1,
    borderColor: colors.g1,
    borderRadius: 10,
    width: 211,
    marginLeft: 20,
    marginTop: 18,
  },
  driver: {
    height: 41,
    width: 41,
    borderRadius: 41 / 2,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  callNowContainer: {
    height: 25,
    width: 82,
    backgroundColor: colors.green,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callNowTxt: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.white,
    lineHeight: 26,
    marginLeft: 3,
  },
  btnMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    width: '90%',
    alignSelf: 'center',
  },
  pickUp: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.txtBlack,
    marginLeft: 10,
  },
  warnTxt: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 22,
    textAlign: 'center',
    color: colors.g1,
    marginTop: 20,
  },
  btnContainer: {
    height: 36,
    width: 100,
    backgroundColor: colors.txtBlack,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 26,
    color: colors.white,
  },
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '60%',
    alignSelf: 'center',
  },
  startTripContainer: {
    height: 56,
    width: 300,
    backgroundColor: colors.green,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 25,
    flexDirection: 'row',
    paddingLeft: 25,
    marginTop: 20,
  },
  startTripTxt: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 26,
    color: colors.white,
    marginLeft: 17,
  },
  waitcontainer: {
    height: 217,
    width: '100%',
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
});

const getStatusColo = status => {
  if (status === 'FULLY_BOOKED') {
    return colors.green;
  }
  if (status === 'PARTIALLY_BOOKED') {
    return colors.blue;
  }
  if (status === 'WAITING_FOR_MATCH') {
    return colors.orange;
  }
};
