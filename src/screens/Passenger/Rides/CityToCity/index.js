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
import {colors, appIcons, appImages} from '../../../../utilities';
import {useNavigation} from '@react-navigation/core';
import HeartIcon from 'react-native-vector-icons/EvilIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import FavouriteLocations from '../../../FavouriteLocations';
import {CustomHeader} from '../../../../components';
import CalendarSheet from '../../../CalendarSheet';
import styles from './styles';

const CreateRide = () => {
  let navigation = useNavigation();
  const favourteLocationRef = useRef(null);
  const calendarSheetRef = useRef(null);

  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [noLaterTime, setNoLaterTime] = useState('');
  const [date, setDate] = useState('');
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={'Create Ride'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.tripBtnWrapper}>
          <TouchableOpacity style={styles.tripBtnContainer}>
            <Text style={styles.btnTxt}>Single Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tripBtnContainer}>
            <Text style={styles.btnTxt}>Recurring Ride</Text>
          </TouchableOpacity>
        </View>

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
            <HeartIcon
              name="heart"
              size={30}
              color={colors.btnGray}
              onPress={() => favourteLocationRef.current.open()}
            />
            <View style={styles.locationSwitch} />
            <HeartIcon
              onPress={() => favourteLocationRef.current.open()}
              name="heart"
              size={30}
              color={colors.btnGray}
            />
          </View>
        </View>
        <Text style={styles.bookSeatsTxt}>Book Your Seats</Text>
        <View style={styles.seatsWrapper}>
          {seats.map(seat => (
            <Image
              key={seat}
              source={appIcons.seatBlue}
              resizeMode="contain"
              style={styles.seat}
            />
          ))}
        </View>
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={styles.nextBtnContainer}
          onPress={() => navigation.navigate('StartLocation')}>
          <Text style={styles.nextTxt}>Next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateRide;
