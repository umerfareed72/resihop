import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {colors, appIcons, appImages, family} from '../../../../utilities';
import {useNavigation} from '@react-navigation/core';
import HeartIcon from 'react-native-vector-icons/EvilIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  CityRideList,
  CustomHeader,
  PaymentButtons,
  RideInputCard,
  WarningModal,
} from '../../../../components';
import styles from './styles';
import FavouriteLocations from '../../../FavouriteLocations';
import CalendarSheet from '../../../CalendarSheet';

const DriverCityToCity = () => {
  let navigation = useNavigation();
  const favourteLocationRef = useRef(null);
  const calendarSheetRef = useRef(null);
  const warningSheet = useRef(null);
  const [toggleEnabled1, setToggleEnabled1] = useState(false);
  const [toggleEnabled2, setToggleEnabled2] = useState(false);
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [noLaterTime, setNoLaterTime] = useState('');
  const [date, setDate] = useState('');
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);

  return (
    <>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={'City To City Drives'}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.tripBtnWrapper}>
          <TouchableOpacity style={styles.tripBtnContainer}>
            <Text style={styles.btnTxt}>Single Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tripBtnContainer}>
            <Text style={styles.btnTxt}>Recurring Ride</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.locationMainWrapper}>
          <RideInputCard
            p1={'Start City'}
            p2={'Destination City'}
            onPressStart={() => navigation.navigate('StartLocation')}
            onPressDes={() => navigation.navigate('StartLocation')}
          />

          <View style={styles.switchWrapper}>
            <HeartIcon
              name="heart"
              size={30}
              color={colors.btnGray}
              onPress={() => favourteLocationRef.current.open()}
            />
            <Image style={styles.locationSwitch} source={appIcons.mobiledata} />
            <HeartIcon
              onPress={() => favourteLocationRef.current.open()}
              name="heart"
              size={30}
              color={colors.btnGray}
            />
          </View>
        </View>
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
        <View style={styles.selectWrapper}>
          <Text style={[styles.selectTxt]}>Departure Time</Text>
          <Text style={[styles.selectTxt]}>Select Date</Text>
        </View>
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
            onPressOut={() => calendarSheetRef.current.open()}
            onPressIn={() => Keyboard.dismiss()}
            style={[styles.noLater, {marginRight: 11}]}
          />
          <Image
            source={appImages.calendar}
            resizeMode="contain"
            style={styles.calendarIcon}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <PaymentButtons
            width={'45%'}
            bgColor={colors.navy_blue}
            txtColor={colors.white}
            title={'Cost Per Seat'}
            fontFamily={family.product_sans_bold}
          />
          <PaymentButtons
            width={'45%'}
            bgColor={colors.light_black}
            txtColor={colors.white}
            title={'Allergies'}
            fontFamily={family.product_sans_bold}
          />
        </View>
        <CityRideList />
        <View style={styles.returnTripWrapper}>
          <Text style={styles.returnTxt}>Return Trip</Text>
          <ToggleSwitch
            isOn={toggleEnabled}
            onColor={colors.green}
            offColor={colors.btnGray}
            size="small"
            onToggle={isOn => setToggleEnabled(isOn)}
          />
        </View>
        <CalendarSheet calendarSheetRef={calendarSheetRef} setDate={setDate} />
        {toggleEnabled ? (
          <>
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
              <View style={styles.switchWrapper}>
                <HeartIcon name="heart" size={30} color={colors.btnGray} />
                <View style={{marginVertical: 23}} />
                <HeartIcon name="heart" size={30} color={colors.btnGray} />
              </View>
            </View>
            <View style={{marginLeft: 26}}>
              <Text style={styles.returntimeTxt}>Departure Time (Return)</Text>
              <Text style={styles.timeBracketTxt}>
                (Add a time bracket when you want ride for return)
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
        ) : null}
        <FavouriteLocations favourteLocationRef={favourteLocationRef} />
      </ScrollView>
      <KeyboardAvoidingView
        //keyboardVerticalOffset={15}
        style={{backgroundColor: colors.white}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={styles.nextBtnContainer}
          onPress={() => warningSheet?.current?.open()}>
          <Text style={styles.nextTxt}>Next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <WarningModal
        h1={'Smoke Free Car?'}
        h2={'Animal Free Car?'}
        show={warningSheet}
        toggleEnabled={toggleEnabled1}
        onToggle={setToggleEnabled1}
        toggleEnabled1={toggleEnabled2}
        onToggle1={setToggleEnabled2}
        onPress={() => {
          warningSheet?.current?.close();
          navigation?.navigate('CostPerSeat');
        }}
      />
    </>
  );
};

export default DriverCityToCity;
