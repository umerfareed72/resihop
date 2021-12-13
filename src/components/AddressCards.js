import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {CustomHeader} from './Header/CustomHeader';
import {appImages, colors, family, size} from '../utilities';
import {useNavigation} from '@react-navigation/core';
import CalendarSheet from '../screens/CalendarSheet';

const AddressCards = ({modalName, addfavrouiteAddressRef, onPress, mode}) => {
  let navigation = useNavigation();
  const calenderSheetRef = useRef(null);

  const [destination, setDestination] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [noLaterTime, setNoLaterTime] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);

  return (
    <>
      {modalName === 'startLocation' ||
      modalName === 'destination' ||
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
                      : styles.destSquare
                  }
                />
              </>
            )}
          </View>
          <Text style={styles.favLocation}>
            {' '}
            Add this Location to Favorite Locations
          </Text>
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
              <Text style={styles.bookSeatsTxt}>
                {mode === 'driver' ? ' Available Seats' : 'Book Your Seats'}
              </Text>
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
          ) : (
            <>
              <View style={styles.selectWrapper}>
                <Text style={[styles.selectTxt, {marginRight: 23}]}>
                  Need to arrive no later than
                </Text>
                <Text style={styles.selectTxt}>Select Date</Text>
              </View>
              <View style={styles.selectionInputWrapper}>
                <TextInput
                  placeholder="XX:XX"
                  placeholderTextColor={colors.btnGray}
                  value={noLaterTime}
                  onChangeText={setNoLaterTime}
                  style={styles.noLater}
                />
                <TouchableOpacity
                  onPress={() => {
                    calenderSheetRef.current.open();
                  }}
                  style={[styles.noLater, {marginRight: 11}]}>
                  <Text
                    style={{
                      fontFamily: family.product_sans_regular,
                      fontSize: size.normal,
                      color: colors.btnGray,
                    }}>
                    Date
                  </Text>
                  <Image
                    source={appImages.calendar}
                    resizeMode="contain"
                    style={styles.calendarIcon}
                  />
                </TouchableOpacity>
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
      ) : null}
      <CalendarSheet calendarSheetRef={calenderSheetRef} setDate={setDate} />
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
    fontFamily: family.product_sans_regular,
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
    fontFamily: family.product_sans_regular,
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
    fontFamily: family.product_sans_regular,
  },
  bookSeatsTxt: {
    fontSize: 14,
    lineHeight: 24,
    marginTop: 27,
    marginLeft: 28,
    fontFamily: family.product_sans_regular,
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
    fontFamily: family.product_sans_bold,
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
    fontFamily: family.product_sans_regular,
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
    fontFamily: family.product_sans_regular,
    justifyContent: 'center',
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
    fontFamily: family.product_sans_regular,
  },
});

export default AddressCards;
