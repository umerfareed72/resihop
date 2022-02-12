import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {fonts} from '../theme/theme';
import {appIcons, appImages, colors} from '../utilities';
import StarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CallIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeartIcon from 'react-native-vector-icons/AntDesign';
import Star from 'react-native-vector-icons/FontAwesome';
import {RatingCardModal} from '../components/Modal/RatingModal/RatingModal';
import {useNavigation} from '@react-navigation/core';
import {DeleteCardModal} from './Modal/DeleteCard/DeleteCardModal';
import I18n from '../utilities/translations';
import {AddWalletModal} from '.';
import {drawerIcons} from '../utilities/images';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {CancelRide} from '../redux/actions/map.actions';
import {Loader} from '../components';

const RideStatusCards = ({statusType, ride, calendarSheetRef}) => {
  let navigation = useNavigation();
  let dispatch = useDispatch();

  const nearestDriver = useSelector(state => state.map.nearestDriver);

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [currentRide, setCurrentRide] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(false);
  const [rating, setRating] = useState(0);
  const [seats, setSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const walletRef = useRef(null);

  useEffect(() => {
    if (ride?.requiredSeats) {
      for (let i = 0; i < ride.requiredSeats; i++) {
        seats[i] = i;
      }
    }
  }, []);

  const handleCancelRide = () => {
    dispatch(
      CancelRide(ride._id, setIsLoading, response => {
        console.log('Cancel Ride', response);
      }),
    );
  };

  if (statusType === 'WAITING_FOR_MATCH') {
    return (
      <View style={styles.waitcontainer}>
        <View style={styles.heading}>
          <Text style={styles.bookedTxt}>{I18n.t('booked_passengers')}</Text>
          <View style={styles.seatContainer}>
            {seats.map(() => (
              <Image
                source={appImages.seatGreen}
                resizeMode="contain"
                style={styles.seat}
              />
            ))}
          </View>
        </View>
        <View
          style={[
            styles.statusContainer,
            {borderColor: getStatusColor(statusType)},
          ]}>
          <Text style={[styles.statusTxt, {color: getStatusColor(statusType)}]}>
            {statusType}
          </Text>
        </View>
        <View style={[styles.btnWrapper, {width: '90%'}]}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => navigation.navigate('UpdateRide', {ride: ride})}>
            <Text style={styles.btnTxt}>{I18n.t('update')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => calendarSheetRef.current.open()}>
            <Text style={styles.btnTxt}>{I18n.t('copy')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => handleCancelRide()}>
            <Text style={styles.btnTxt}>{I18n.t('cancel')}</Text>
          </TouchableOpacity>
        </View>
        {isLoading && <Loader />}
      </View>
    );
  }

  if (currentRide) {
    return (
      <View style={styles.currentRideContainer}>
        <Text style={styles.destinationTxt}>{I18n.t('destination10_km')}</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.addressTxt}>
            123 abc apartment abc street abc...
          </Text>
          <View style={styles.addressCircle} />
        </View>
        <View style={[styles.addressContainer, {marginTop: 21}]}>
          <Text style={styles.addressTxt}>
            123 abc apartment abc street abc...
          </Text>
          <View style={styles.addressSquare} />
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.addressContainer}>
          <Text style={styles.addressTxt}>
            {nearestDriver?.drive?.startDes}
          </Text>
          <View style={styles.addressCircle} />
        </View>
        <View style={[styles.addressContainer, {marginTop: 21}]}>
          <Text style={styles.addressTxt}>{nearestDriver?.drive?.destDes}</Text>
          <View style={styles.addressSquare} />
        </View>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateTimeTxt}>
            {moment(ride.tripDate).format('DD MMM, hh:mm a')}
          </Text>
          {statusType === 'CONFIRMED' && (
            <View style={styles.confirmedWrapper}>
              <Text style={styles.confirmedTxt}>{I18n.t('confirmed')}</Text>
            </View>
          )}
          <View style={styles.seats}>
            {seats.map(seat => (
              <Image
                key={seat}
                source={appImages.seatGreen}
                resizeMode="contain"
                style={styles.greenSeat}
              />
            ))}
          </View>
        </View>
        <View style={styles.driverInfoContainer}>
          <View style={styles.driverInfo}>
            <Image
              source={appImages.driver}
              resizeMode="cover"
              style={styles.driver}
            />
            <View style={{width: '80%'}}>
              <View style={styles.nameRating}>
                <Text
                  style={
                    styles.driverName
                  }>{`${nearestDriver?.drive.user.firstName} ${nearestDriver?.drive.user.lastName}`}</Text>
                <View style={styles.ratingContainer}>
                  <StarIcon name="star" size={17} color={colors.white} />
                  <Text style={styles.ratingTxt}>4.5</Text>
                </View>
                <Image
                  source={appImages.car}
                  resizeMode="contain"
                  style={styles.car}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text
                  style={
                    styles.fair
                  }>{`SEK ${nearestDriver?.drive.costPerSeat}`}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.carDetails}>
                    {nearestDriver?.drive?.user.vehicle.vehicleCompanyName}
                  </Text>
                  <Text style={[styles.carDetails, {color: colors.txtBlack}]}>
                    {`, ${nearestDriver?.drive?.user?.vehicle?.color}, ${nearestDriver?.drive?.user?.vehicle?.licencePlateNumber}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {statusType === 'Confirmed' || statusType === 'MATCHING_DONE' ? (
          <>
            <View style={styles.borderBtnMainContainer}>
              <TouchableOpacity
                style={styles.borderBtnContainer}
                disabled={statusType === 'Confirmed'}>
                <CallIcon
                  name="call"
                  size={18}
                  color={statusType === 'Confirmed' ? colors.g1 : colors.black}
                />
                <Text
                  style={[
                    styles.borderBtnTxt,
                    {
                      color:
                        statusType === 'Confirmed' ? colors.g1 : colors.black,
                    },
                  ]}>
                  {I18n.t('call_now')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.borderBtnContainer}>
                <Image
                  source={appImages.pin}
                  resizeMode="contain"
                  style={{height: 19, width: 19}}
                />
                <Text style={styles.borderBtnTxt}>Pickup Info</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.warnTxt}>{I18n.t('calls_allowed_txt')}</Text>
            <View style={styles.btnMainContainer}>
              <TouchableOpacity style={styles.btnContainer}>
                <Text style={styles.btnTxt}>{I18n.t('copy')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(true);
                }}
                style={styles.btnContainer}>
                <Text style={styles.btnTxt}>{I18n.t('cancel')}</Text>
              </TouchableOpacity>
            </View>
            {statusType === 'Matching Done' && (
              <TouchableOpacity
                style={styles.startTripContainer}
                onPress={() => setCurrentRide(true)}>
                <Icon
                  name="angle-double-right"
                  size={30}
                  color={colors.white}
                />
                <Text style={styles.startTripTxt}>{I18n.t('start_trip')}</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            <View style={styles.rideEndedbtns}>
              <TouchableOpacity style={styles.favBtnContainer}>
                <HeartIcon name="heart" size={15} color={'red'} />
                <Text style={styles.favTxt}>{I18n.t('add_to_favourite')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rateBtnContainer}
                onPress={() => setShowRatingModal(true)}>
                <Star name="star" size={18} color={colors.black} />
                <Text style={styles.rateTxt}>{I18n.t('rate_driver')}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.passengerHomeBtn}
              onPress={() => navigation.navigate('PassengerHome')}>
              <Text style={styles.homeTxt}>{I18n.t('passenger_home')}</Text>
            </TouchableOpacity>
          </>
        )}
        <RatingCardModal
          show={showRatingModal}
          h1={'Rate your Ride Experience'}
          onPressHide={setShowRatingModal}
          rating={rating}
          onSelectRating={setRating}
        />
      </View>
      {showModal && (
        <DeleteCardModal
          image={appIcons.cancel}
          onPressHide={() => {
            setShowModal(false);
          }}
          selected={selected}
          h1={I18n.t('delete_h1')}
          h2={I18n.t('delete_h2')}
          btn1Text={I18n.t('yes')}
          btn2Text={I18n.t('no')}
          show={showModal}
          bgColor={colors.green}
          textColor={colors.white}
          onPressYes={() => {
            setSelected(true);
            setShowModal(false);
            walletRef.current.open();
          }}
          onPressNo={() => {
            setSelected(false);
            setShowModal(false);
          }}
        />
      )}
      <AddWalletModal
        height={Dimensions.get('screen').height / 2.7}
        show={walletRef}
        onSuccess={true}
        onPress={() => {
          walletRef?.current?.close();
          navigation.navigate('PassengerHome');
        }}
        icon={drawerIcons.my_payment_methods}
        h1={'Refund Amount'}
        h2={'Amount will be refunded to your card within 7 working days.'}
        btnText={'OK'}
      />
    </>
  );
};

export default RideStatusCards;

const styles = StyleSheet.create({
  container: {
    //height: 491,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  addressContainer: {
    height: 42,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    marginTop: 23,
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  addressTxt: {
    fontSize: 13,
    lineHeight: 20,
    paddingLeft: 40,
    fontFamily: fonts.regular,
    color: colors.g4,
  },
  addressCircle: {
    height: 16,
    width: 16,
    borderRadius: 16 / 2,
    backgroundColor: colors.green,
    position: 'absolute',
    left: 13,
  },
  addressSquare: {
    height: 16,
    width: 16,
    borderRadius: 5,
    backgroundColor: colors.blue,
    position: 'absolute',
    left: 13,
  },
  greenSeat: {
    height: 25,
    width: 18.75,
    marginLeft: 9,
  },
  dateTimeTxt: {
    fontSize: 15,
    lineHeight: 30,
    color: colors.txtBlack,
    fontFamily: fonts.regular,
  },
  confirmedTxt: {
    fontSize: 16,
    lineHeight: 16,
    color: colors.green,
    textTransform: 'uppercase',
    fontFamily: fonts.bebasBold,
  },
  confirmedWrapper: {
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    height: 23,
    justifyContent: 'center',
    borderColor: colors.green,
    marginLeft: 40,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  seats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driver: {
    height: 58,
    width: 58,
    borderRadius: 58 / 2,
    marginRight: 14,
    borderColor: colors.purple,
    borderWidth: 2,
  },
  driverInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 24,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    paddingHorizontal: 5,
    backgroundColor: colors.green,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginRight: 50,
  },
  ratingTxt: {
    fontSize: 13,
    marginLeft: 3,
    //lineHeight: 37,
    color: colors.white,
  },
  driverName: {
    fontSize: 18,
    lineHeight: 22,
    color: colors.txtBlack,
    marginBottom: 7,
    fontFamily: fonts.regular,
  },
  nameRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //width: '81%',
  },
  fair: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 22,
    color: colors.txtBlack,
  },
  carDetailsTxt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carDetails: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.txtGray,
    fontFamily: fonts.regular,
  },
  car: {
    height: 24.82,
    width: 52.45,
  },
  borderBtnContainer: {
    height: 47,
    width: 143,
    borderWidth: 1,
    borderColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    flexDirection: 'row',
  },
  borderBtnMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
  borderBtnTxt: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 26,
    color: colors.txtBlack,
    marginLeft: 8,
  },
  warnTxt: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 22,
    color: colors.txtGray,
    textAlign: 'center',
    marginTop: 15,
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
    fontSize: 15,
    lineHeight: 26,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  btnMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 25,
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
  },
  startTripTxt: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 26,
    color: colors.white,
    marginLeft: 17,
  },
  passengerHomeBtn: {
    height: 56,
    width: 300,
    backgroundColor: colors.green,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  homeTxt: {
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 22,
    color: colors.white,
  },
  favBtnContainer: {
    height: 43,
    width: 156,
    borderWidth: 1,
    borderColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    flexDirection: 'row',
  },
  favTxt: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 26,
    color: colors.txtBlack,
    marginLeft: 6,
  },
  rateBtnContainer: {
    height: 43,
    width: 156,
    borderWidth: 1,
    borderColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    flexDirection: 'row',
  },
  rateTxt: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 26,
    color: colors.txtBlack,
    marginLeft: 6,
  },
  rideEndedbtns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: ' 90%',
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 25,
  },
  currentRideContainer: {
    height: 229,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  destinationTxt: {
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 22,
    color: colors.txtBlack,
    marginHorizontal: 22,
    marginTop: 30,
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
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  bookedTxt: {
    fontFamily: fonts.regular,
    fontSize: 20,
    lineHeight: 26,
    color: colors.txtBlack,
  },
  seatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seat: {
    height: 25,
    width: 18,
    marginLeft: 9,
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
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '60%',
    alignSelf: 'center',
  },
  statusTxt: {
    fontFamily: fonts.bebasBold,
    fontSize: 16,
    lineHeight: 16,
  },
});

const getStatusColor = status => {
  if (status === 'Fully Booked') {
    return colors.green;
  }
  if (status === 'MATCHING_DONE') {
    return colors.blue;
  }
  if (status === 'WAITING_FOR_MATCH') {
    return colors.orange;
  }
};
