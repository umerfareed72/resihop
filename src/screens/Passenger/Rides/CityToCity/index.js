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
import {colors, appIcons, appImages, family, size} from '../../../../utilities';
import {useNavigation} from '@react-navigation/core';
import HeartIcon from 'react-native-vector-icons/EvilIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import FavouriteLocations from '../../../FavouriteLocations';
import {CustomHeader, PaymentButtons} from '../../../../components';
import CalendarSheet from '../../../CalendarSheet';
import styles from './styles';
import {FlatList} from 'react-native';

const index = ({navigation}) => {
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
        title={'City to City Rides'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <Image style={styles.locationSwitch} source={appIcons.mobiledata} />
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
              source={appImages.seatBlue}
              resizeMode="contain"
              style={styles.seat}
            />
          ))}
        </View>
        <View style={styles.selectWrapper}>
          <Text style={styles.selectTxt}>Select Date</Text>
        </View>
        <View style={styles.selectionInputWrapper}>
          <TouchableOpacity
            onPressOut={() => calendarSheetRef.current.open()}
            onPressIn={() => Keyboard.dismiss()}
            style={[styles.noLater, {marginRight: 11}]}>
            <Text
              style={{
                color: colors.inputTxtGray,
                fontFamily: family.product_sans_regular,
                fontSize: size.normal,
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
        <View style={{padding: 30}}>
          <PaymentButtons
            bgColor={colors.light_black}
            txtColor={colors.white}
            fontFamily={family.product_sans_bold}
            title={'Allergies'}
          />
        </View>
        <View>
          <Text style={{marginLeft: 21}}>How many bags?</Text>
          <FlatList
            contentContainerStyle={{paddingVertical: 10}}
            data={[1, 2]}
            renderItem={({item}) => {
              return (
                <View style={styles.listContainer}>
                  <Text>Hand Carry</Text>
                  <TouchableOpacity style={styles.btnContainer}>
                    <Text style={styles.btnText}>Add</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
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
                    // value={startLocation}
                    // onChangeText={setStartLocation}
                    style={styles.txtInput}
                  />
                  <View style={styles.startDot} />
                </View>
                <View>
                  <TextInput
                    placeholder="Destination"
                    placeholderTextColor={colors.inputTxtGray}
                    // value={destination}
                    // onChangeText={setDestination}
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
                <Image
                  style={styles.locationSwitch}
                  source={appIcons.mobiledata}
                />
                <HeartIcon
                  onPress={() => favourteLocationRef.current.open()}
                  name="heart"
                  size={30}
                  color={colors.btnGray}
                />
              </View>
            </View>
          </>
        ) : null}
        <View style={styles.selectWrapper}>
          <Text style={styles.selectTxt}>Sekect Return Date</Text>
        </View>
        <View style={styles.selectionInputWrapper}>
          <TouchableOpacity
            onPressOut={() => calendarSheetRef.current.open()}
            onPressIn={() => Keyboard.dismiss()}
            style={[styles.noLater, {marginRight: 11}]}>
            <Text
              style={{
                color: colors.inputTxtGray,
                fontFamily: family.product_sans_regular,
                fontSize: size.normal,
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
        <FavouriteLocations favourteLocationRef={favourteLocationRef} />
      </ScrollView>
      <KeyboardAvoidingView
        //keyboardVerticalOffset={15}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={styles.nextBtnContainer}
          onPress={() => navigation.navigate('StartLocation')}>
          <Text style={styles.nextTxt}>Start Matching</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default index;
