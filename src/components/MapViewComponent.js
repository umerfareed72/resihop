import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  PermissionsAndroid,
  Platform,
  View,
  Text,
  Image,
  TextInput,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {appIcons, appImages, colors, HP} from '../utilities';
import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CustomHeader} from './Header/CustomHeader';
import StartMatchingSheet from './StartMatchingSheet';
import NearestDriverCard from './NearestDriverCard';
import AvailableDrivers from './AvailableDriversCard';
import {Icon} from 'react-native-elements';

const MapViewComponent = ({
  modalName,
  addfavrouiteAddressRef,
  rideModals,
  setModal,
  onPress,
  title,
}) => {
  let navigation = useNavigation();

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [destination, setDestination] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [noLaterTime, setNoLaterTime] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);

  useEffect(() => {
    getLocation();
  }, []);

  let customMarkers = [
    {
      id: 1,
      latitude: 31.526219,
      longitude: 74.342077,
      text: '20 SEK | 20 M',
    },
    {
      id: 2,
      latitude: 31.523227,
      longitude: 74.34243,
      text: '20 SEK | 20 M',
    },
    {
      id: 3,
      latitude: 31.525761,
      longitude: 74.346379,
      text: '20 SEK | 20 M',
    },
    {
      id: 4,
      latitude: 31.523259,
      longitude: 74.347673,
      text: '20 SEK | 20 M',
    },
  ];

  const getLocation = async () => {
    let permission;

    try {
      if (Platform.OS === 'ios') {
        permission = Geolocation.requestAuthorization('whenInUse');
      } else {
        permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
      if (permission && permission === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            console.log('Position', position);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 31.524909,
          longitude: 74.34291,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
        //onRegionChange={regionChanged}
        zoomEnabled={true}
        zoomControlEnabled={true}
        style={{...StyleSheet.absoluteFillObject}}>
        <Marker
          coordinate={{
            latitude: 31.524909,
            longitude: 74.34291,
          }}>
          <View style={styles.currenLocation} />
        </Marker>
        {customMarkers.map(item => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}>
            <View style={styles.driverMarker}>
              <Text style={{color: colors.white}}>{item.text}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {modalName === 'startLocation' ||
      modalName === 'startCity' ||
      modalName === 'destination' ||
      modalName === 'destinationCity' ||
      modalName === 'returnTrip' ? (
        <View style={styles.upperModalContainer}>
          <CustomHeader
            backButton={true}
            navigation={navigation}
            title={
              modalName === 'startLocation'
                ? 'Start Location'
                : modalName === 'returnTrip'
                ? 'Return Trip'
                : modalName === 'startCity'
                ? 'Start City'
                : modalName === 'destinationCity'
                ? 'Destination City'
                : 'Destination'
            }
          />
          <View style={styles.startInputWrapper}>
            {modalName === 'returnTrip' ? (
              <View style={styles.locationMainWrapper}>
                <View>
                  <View style={{marginBottom: 20}}>
                    <TextInput
                      placeholder="Start Location"
                      placeholderTextColor={colors.inputTxtGray}
                      value={startLocation}
                      onChangeText={setStartLocation}
                      style={styles.txtInput}
                    />
                    <View style={styles.startDot} />
                  </View>
                  <View>
                    <TextInput
                      placeholder="Destination"
                      placeholderTextColor={colors.inputTxtGray}
                      value={destination}
                      onChangeText={setDestination}
                      style={styles.txtInput}
                    />
                    <View style={styles.destSquare} />
                  </View>
                </View>
              </View>
            ) : (
              <>
                <TextInput
                  placeholder="123 abc apartment abc street abc..."
                  placeholderTextColor={colors.inputTxtGray}
                  value={startLocation}
                  onChangeText={setStartLocation}
                  style={styles.txtInput}
                />
                <View
                  style={
                    modalName === 'startLocation'
                      ? styles.startDot
                      : modalName === 'startCity'
                      ? styles.startDot
                      : styles.destSquare
                  }
                />
              </>
            )}
          </View>

          {modalName === 'startLocation' && (
            <Text style={styles.favLocation}>
              {' '}
              Add this Location to Favorite Locations
            </Text>
          )}
          {modalName === 'startCity' && (
            <Text style={styles.favLocation}> Add to Favorites Location</Text>
          )}
          {modalName === 'destinationCity' && (
            <Text style={styles.favLocation}> Add to Favorites Location</Text>
          )}

          <View style={styles.faveBtnWrapper}>
            <TouchableOpacity style={styles.favLocationBtn}>
              <Text style={styles.favLocationBtnTxt}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.favLocationBtn}>
              <Text style={styles.favLocationBtnTxt}>Office</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.favLocationBtn}
              onPress={() => addfavrouiteAddressRef.current.open()}>
              <Text style={styles.favLocationBtnTxt}>Other</Text>
            </TouchableOpacity>
          </View>
          {modalName === 'startLocation' ? (
            <>
              <Text style={styles.bookSeatsTxt}>Book Your Seats</Text>
              <View style={styles.seatsWrapper}>
                {seats.map(seat => (
                  <Image
                    key={seat}
                    source={appImages.seatBlue}
                    resizeMode="contain"
                    style={styles.seat}
                  />
                ))}
              </View>
            </>
          ) : modalName === 'returnTrip' ? (
            <>
              <View style={{marginLeft: 26}}>
                <Text style={styles.returntimeTxt}>
                  Departure Time (Return)
                </Text>
              </View>
              <View style={[styles.selectionInputWrapper, {marginBottom: 20}]}>
                <TextInput
                  placeholder="XX:XX"
                  placeholderTextColor={colors.btnGray}
                  value={noLaterTime}
                  onChangeText={setNoLaterTime}
                  style={styles.noLater}
                />
                <Text>To</Text>
                <TextInput
                  placeholder="XX:XX"
                  placeholderTextColor={colors.btnGray}
                  value={noLaterTime}
                  onChangeText={setNoLaterTime}
                  style={styles.noLater}
                />
              </View>
            </>
          ) : modalName === 'startCity' ? (
            <>
              <Text style={styles.bookSeatsTxt}>Available Seats</Text>
              <View style={styles.seatsWrapper}>
                {seats.map(seat => (
                  <Image
                    key={seat}
                    source={appImages.seatBlue}
                    resizeMode="contain"
                    style={styles.seat}
                  />
                ))}
              </View>
            </>
          ) : (
            <>
              {modalName === 'destination' && (
                <View style={styles.selectWrapper}>
                  <Text style={[styles.selectTxt, {marginRight: 23}]}>
                    Need to arrive no later than
                  </Text>
                  <Text style={styles.selectTxt}>Select Date</Text>
                </View>
              )}
              {modalName === 'destinationCity' && (
                <View style={styles.selectWrapper}>
                  <Text style={[styles.selectTxt, {marginRight: 23}]}>
                    Departure Time
                  </Text>
                  <Text style={styles.selectTxt}>
                    {' '}
                    {'                      '} Select Date
                  </Text>
                </View>
              )}
              <View style={styles.selectionInputWrapper}>
                <TextInput
                  placeholder="XX:XX"
                  placeholderTextColor={colors.btnGray}
                  value={noLaterTime}
                  onChangeText={setNoLaterTime}
                  style={styles.noLater}
                />
                <TextInput
                  placeholder="Date"
                  placeholderTextColor={colors.btnGray}
                  value={date}
                  onChangeText={setDate}
                  style={[styles.noLater, {marginRight: 11}]}
                />
                <Image
                  source={appImages.calendar}
                  resizeMode="contain"
                  style={styles.calendarIcon}
                />
              </View>
            </>
          )}

          <TouchableOpacity
            style={[
              styles.nextBtnContainer,
              {
                marginTop:
                  modalName === 'startLocation'
                    ? 35
                    : modalName === 'returnTrip'
                    ? 20
                    : 25,
              },
            ]}
            onPress={onPress}>
            <Text style={styles.nextTxt}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : modalName === 'selectRoute' ? (
        <TouchableOpacity
          style={{
            width: HP('8'),
            height: HP('8'),
            borderRadius: 100,
            marginVertical: HP('3'),
            marginHorizontal: HP('3'),
            zIndex: 100,
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={'arrowleft'}
            type={'antdesign'}
            size={25}
            color={colors.black}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
      {rideModals === 'startMatching' ? (
        <StartMatchingSheet setModal={setModal} />
      ) : rideModals === 'finding' ? (
        <NearestDriverCard setModal={setModal} />
      ) : rideModals === 'available' ? (
        <AvailableDrivers
          title={title}
          btnText={title === 'Book Now' ? 'Book Now' : 'Send Request'}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  upperModalContainer: {
    //height: 467,
    paddingBottom: 26,
    width: '100%',
    position: 'absolute',
    backgroundColor: colors.white,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
  },
  backArrow: {
    width: 20,
    height: 15,
    marginRight: 19,
  },
  chooseLocationHeader: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 21,
  },
  headerTxt: {
    fontSize: 20,
    lineHeight: 24,
  },
  txtInput: {
    height: 44,
    width: 326,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    borderRadius: 10,
    paddingLeft: 45,
    color: colors.inputTxtGray,
  },
  startDot: {
    height: 16,
    width: 16,
    borderRadius: 16 / 2,
    backgroundColor: colors.green,
    position: 'absolute',
    top: 14,
    left: 15,
  },
  startInputWrapper: {
    alignSelf: 'center',
  },
  favLocation: {
    fontSize: 14,
    lineHeight: 24,
    marginLeft: 25,
    color: colors.txtBlack,
    marginTop: 26,
  },
  favLocationBtn: {
    height: 32,
    paddingHorizontal: 20,
    backgroundColor: colors.btnGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  faveBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginLeft: 25,
    marginTop: 20,
  },
  favLocationBtnTxt: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.white,
  },
  bookSeatsTxt: {
    fontSize: 14,
    lineHeight: 24,
    marginTop: 27,
    marginLeft: 28,
  },
  seat: {
    height: 31,
    width: 24,
    marginRight: 20,
  },
  seatsWrapper: {
    flexDirection: 'row',
    marginLeft: 27,
    marginTop: 25,
  },
  nextBtnContainer: {
    height: 56,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 15,
    alignSelf: 'center',
  },
  nextTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
  },
  destSquare: {
    height: 16,
    width: 16,
    backgroundColor: colors.blue,
    position: 'absolute',
    top: 14,
    left: 15,
    borderRadius: 4,
  },
  selectWrapper: {
    flexDirection: 'row',
    marginTop: 26,
    marginLeft: 20,
  },
  selectTxt: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.txtBlack,
  },
  noLater: {
    height: 44,
    width: 140,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    borderRadius: 10,
    paddingLeft: 16,
    fontSize: 16,
    lineHeight: 24,
    color: colors.inputTxtGray,
  },
  calendarIcon: {
    height: 18,
    width: 18,
    position: 'absolute',
    right: 22,
    top: 11,
  },
  selectionInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  locationMainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  returntimeTxt: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.txtBlack,
    marginTop: 20,
  },
  currenLocation: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: colors.blueLocation,
    borderWidth: 2,
    borderColor: colors.white,
  },
  driverMarker: {
    height: 28,
    paddingHorizontal: 10,
    backgroundColor: colors.blue,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapViewComponent;
