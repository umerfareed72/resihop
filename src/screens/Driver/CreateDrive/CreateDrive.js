import React, {useState, useRef, useEffect} from 'react';
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
} from 'react-native';
import {colors, appIcons, appImages} from '../../../utilities';
import {useNavigation} from '@react-navigation/core';
import HeartIcon from 'react-native-vector-icons/EvilIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import FavouriteLocations from '../../FavouriteLocations';
import {CustomHeader} from '../../../components';
import CalendarSheet from '../../CalendarSheet';
import {fonts} from '../../../theme/theme';
import I18n from '../../../utilities/translations';
import {useSelector, useDispatch} from 'react-redux';
import {
  setAvailableSeats,
  setOrigin,
  setMapDestination,
  CreateDriveRequest,
  setDateTimeStamp,
  setTime,
  SetRidesResponse,
} from '../../../redux/actions/map.actions';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import {Loader} from '../../../components/Loader/Loader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CreateDrive = () => {
  let navigation = useNavigation();
  let dispatch = useDispatch();

  const favourteLocationRef = useRef(null);
  const calendarSheetRef = useRef(null);

  const origin = useSelector(state => state.map.origin);
  const destinationMap = useSelector(state => state.map.destination);
  const availableSeats = useSelector(state => state.map.availableSeats);
  const dateTimeStamp = useSelector(state => state.map.dateTimeStamp);
  const time = useSelector(state => state.map.time);

  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [noLaterTime, setNoLaterTime] = useState('');
  const [date, setDate] = useState('');
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [screen, setScreen] = useState(false);
  const [favPress, setFavPress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [normalTime, setnormalTime] = useState();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '20', value: 20},
    {label: '30', value: 30},
    {label: '40', value: 40},
  ]);

  useEffect(() => {
    return () => {
      dispatch(setAvailableSeats(0));
      dispatch(setOrigin(null));
      dispatch(setMapDestination(null));
      dispatch(setDateTimeStamp(null));
      dispatch(SetRidesResponse(null));
    };
  }, []);

  const handleCreateDrive = () => {
    const stamp = moment(`${dateTimeStamp}T${time}`).valueOf();

    const body = {
      startLocation: [origin.location.lat, origin.location.lng],
      destinationLocation: [
        destinationMap.location.lat,
        destinationMap.location.lng,
      ],
      date: stamp,
      availableSeats: availableSeats,
      path: 0,
      costPerSeat: value,
      interCity: false,
      startDes: origin.description,
      destDes: destinationMap.description,
    };

    dispatch(
      CreateDriveRequest(body, setIsLoading, response => {
        console.log('Create Drive', response);
      }),
    );

    navigation.navigate('SelectRoute');
  };

  const showTimePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    dispatch(setTime(moment(date).format('HH:mm')));
    setnormalTime(moment(date).format('hh:mm a'));
    hideTimePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={I18n.t('create_drive')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.tripBtnWrapper}>
          <TouchableOpacity
            onPress={() => {
              setScreen(false);
            }}
            style={[
              styles.tripBtnContainer,
              {backgroundColor: screen ? colors.btnGray : colors.green},
            ]}>
            <Text style={styles.btnTxt}>{I18n.t('single_trip')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setScreen(true);
              navigation?.navigate('DRecurringRides');
            }}
            style={[
              styles.tripBtnContainer,
              {backgroundColor: screen ? colors.green : colors.btnGray},
            ]}>
            <Text style={styles.btnTxt}>{I18n.t('recurring_ride')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.locationMainWrapper}>
          <View>
            <View style={{marginBottom: 20}}>
              <TouchableOpacity
                style={styles.txtInput}
                onPress={() =>
                  navigation.navigate('StartLocationDriver', {
                    type: 'startLocation',
                  })
                }>
                <Text style={styles.locationTxt}>
                  {origin !== null
                    ? origin.description
                    : I18n.t('start_location')}
                </Text>
              </TouchableOpacity>
              <View style={styles.startDot} />
            </View>
            <View>
              <TouchableOpacity
                style={styles.txtInput}
                onPress={() =>
                  navigation.navigate('StartLocationDriver', {
                    type: 'destination',
                  })
                }>
                <Text style={styles.locationTxt}>
                  {destinationMap !== null
                    ? destinationMap.description
                    : I18n.t('destination')}
                </Text>
              </TouchableOpacity>
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

            <Image source={appIcons.mobiledata} style={styles.locationSwitch} />

            <HeartIcon
              onPress={() => favourteLocationRef.current.open()}
              name="heart"
              size={30}
              color={colors.btnGray}
            />
          </View>
        </View>
        <Text style={styles.bookSeatsTxt}>{I18n.t('availableSeats')}</Text>
        <View style={styles.seatsWrapper}>
          {seats.map(seat => (
            <TouchableOpacity
              key={seat}
              onPress={() => dispatch(setAvailableSeats(seat))}>
              <Image
                source={
                  seat <= availableSeats
                    ? appImages.seatGreen
                    : appImages.seatBlue
                }
                resizeMode="contain"
                style={styles.seat}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.selectWrapper}>
          <Text style={[styles.selectTxt, {marginRight: 23}]}>
            {I18n.t('need_to_arrive')}
          </Text>
          <Text style={[styles.selectTxt, {marginLeft: 8}]}>
            {I18n.t('select_date')}
          </Text>
        </View>
        <View style={styles.selectionInputWrapper}>
          <TouchableOpacity
            onPress={() => showTimePicker()}
            style={[styles.noLater, {justifyContent: 'center'}]}>
            <Text style={styles.dateTxt}>{time ? time : `XX:XX`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => calendarSheetRef.current.open()}
            style={[
              styles.noLater,
              {justifyContent: 'center', marginRight: 11},
            ]}>
            <Text style={styles.dateTxt}>
              {dateTimeStamp !== null
                ? moment(dateTimeStamp).format('DD MMM')
                : 'Date'}
            </Text>
          </TouchableOpacity>
          <Image
            source={appImages.calendar}
            resizeMode="contain"
            style={styles.calendarIcon}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            is24Hour={true}
            locale="en_GB"
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideTimePicker}
          />
        </View>
        <Text style={styles.presetTxt}>{I18n.t('cost_percentage')}</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{width: '90%', alignSelf: 'center'}}
          dropDownContainerStyle={{width: '90%', alignSelf: 'center'}}
        />
        <View style={styles.returnTripWrapper}>
          <Text style={styles.returnTxt}>{I18n.t('return_trip')}</Text>
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
                    placeholder={I18n.t('start_location')}
                    placeholderTextColor={colors.inputTxtGray}
                    value={startLocation}
                    onChangeText={setStartLocation}
                    style={styles.txtInput}
                  />
                  <View style={styles.startDot} />
                </View>
                <View>
                  <TextInput
                    placeholder={I18n.t('destination')}
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
              <Text style={styles.returntimeTxt}>
                {I18n.t('departure_time')}
              </Text>
              <Text style={styles.timeBracketTxt}>
                {I18n.t('departure_time_desc')}
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
              <Text style={styles.to}>{I18n.t('to')}</Text>
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
        <FavouriteLocations
          favourteLocationRef={favourteLocationRef}
          favPress={favPress}
        />
        {isLoading ? <Loader /> : null}
      </ScrollView>
      <KeyboardAvoidingView
        //keyboardVerticalOffset={15}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={styles.nextBtnContainer}
          disabled={
            origin === null ||
            destination === null ||
            availableSeats === null ||
            dateTimeStamp === null
          }
          onPress={() => handleCreateDrive()}>
          <Text style={styles.nextTxt}>{I18n.t('next')}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backArrow: {
    height: 15,
    width: 20,
    marginRight: 19,
  },
  createHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 21,
  },
  rideTxt: {
    fontSize: 20,
    lineHeight: 24,
  },
  tripBtnContainer: {
    height: 39,
    width: 145,
    backgroundColor: colors.btnGray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripBtnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '85%',
    alignSelf: 'center',
  },
  btnTxt: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.white,
    fontFamily: fonts.regular,
  },
  txtInput: {
    height: 44,
    width: 291,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    borderRadius: 10,
    paddingLeft: 45,
    color: colors.inputTxtGray,
    justifyContent: 'center',
    fontFamily: fonts.regular,
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
  destSquare: {
    height: 16,
    width: 16,
    backgroundColor: colors.blue,
    position: 'absolute',
    top: 14,
    left: 15,
    borderRadius: 4,
  },
  locationSwitch: {
    height: 25,
    width: 25,
    backgroundColor: colors.green,
    borderRadius: 25 / 2,
    marginVertical: 11,
  },
  switchWrapper: {
    alignItems: 'center',
  },
  locationMainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 19,
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  bookSeatsTxt: {
    fontSize: 14,
    lineHeight: 24,
    marginTop: 37,
    color: colors.txtBlack,
    marginLeft: 21,
    fontFamily: fonts.regular,
  },
  seat: {
    height: 31,
    width: 24,
    marginRight: 20,
  },
  seatsWrapper: {
    flexDirection: 'row',
    marginLeft: 21,
    marginTop: 25,
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
    fontFamily: fonts.regular,
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
    fontFamily: fonts.regular,
  },
  calendarIcon: {
    height: 18,
    width: 18,
    position: 'absolute',
    right: 22,
    top: 13,
  },
  selectionInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  returnTxt: {
    fontSize: 16,
    lineHeight: 29,
    color: colors.txtBlack,
    fontFamily: fonts.regular,
  },
  returnTripWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 31,
    width: '87%',
    alignSelf: 'center',
  },
  returntimeTxt: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.txtBlack,
    marginTop: 20,
    fontFamily: fonts.regular,
  },
  timeBracketTxt: {
    fontSize: 12,
    lineHeight: 24,
    color: colors.btnGray,
    fontFamily: fonts.regular,
  },
  nextBtnContainer: {
    height: 56,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 15,
    marginBottom: 20,
    alignSelf: 'center',
  },
  nextTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  dateTxt: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.g1,
    fontFamily: fonts.regular,
  },
  presetCostContainer: {
    height: 44,
    width: '90%',
    borderWidth: 1,
    borderColor: colors.greyBorder,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  presetTxt: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 24,
    color: colors.black,
    marginVertical: 25,
    marginHorizontal: 22,
  },
  locationTxt: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.g4,
  },
  to: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 24,
    color: colors.txtBlack,
  },
});

export default CreateDrive;
