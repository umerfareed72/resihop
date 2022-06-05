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
  Alert,
} from 'react-native';
import {
  colors,
  appIcons,
  appImages,
  total_seats,
  size,
  family,
  header,
} from '../../../utilities';
import {useNavigation} from '@react-navigation/core';
import HeartIcon from 'react-native-vector-icons/EvilIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import FavouriteLocations from '../../FavouriteLocations';
import {
  CustomHeader,
  CalendarSheet,
  ReturnCalendarSheet,
  Loader,
  AppButton,
  DateTimePickerCard,
  LocationInput,
} from '../../../components';
import {fonts} from '../../../theme/theme';
import I18n from '../../../utilities/translations';
import HeartFilled from 'react-native-vector-icons/Foundation';
import {useSelector, useDispatch} from 'react-redux';
import {
  setAvailableSeats,
  setDateTimeStamp,
  setTime,
  setReturnFirstTime,
  setMapSegment,
  setUpdateDrive,
  CreateDriveRequest,
} from '../../../redux/actions/map.actions';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './styles';
import {post} from '../../../services';
const UpdateDrive = () => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  const favourteLocationRef = useRef(null);
  const calendarSheetRef = useRef(null);
  const returnCalendarSheetRef = useRef(null);
  const {
    origin,
    availableSeats,
    dateTimeStamp,
    returnDateTimeStamp,
    returnOrigin,
    settings,
  } = useSelector(state => state.map);

  const time = useSelector(state => state.map.time);
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [favPress, setFavPress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [normalTime, setnormalTime] = useState(new Date());
  const [firstReturnTimePicker, setFirstReturnTimePicker] = useState(false);
  const destinationMap = useSelector(state => state.map.destination);
  const returnTime = useSelector(state => state.map);
  const returnDestinationMap = useSelector(
    state => state.map.returnDestination,
  );
  const [cost, setcost] = useState(null);
  const [costConfirmation, setcostConfirmation] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '20 NOK', value: 20},
    {label: '30 NOK', value: 30},
    {label: '40 NOK', value: 40},
    {label: '50 NOK', value: 50},
    {label: '60 NOK', value: 60},
    {label: '70 NOK', value: 70},
    {label: '80 NOK', value: 80},
  ]);
  useEffect(() => {
    setValue(returnTime?.cost_per_seat);
    dispatch(setDateTimeStamp(returnTime?.idToUpdateDrive?.date));
    setDate(returnTime?.idToUpdateDrive?.date);
    setnormalTime(returnTime?.idToUpdateDrive?.date);
    setcost(returnTime?.idToUpdateDrive?.costPerSeat);
    // dispatch(setSeats(total_seats));
  }, []);
  //Handle Update Drive
  const handleCreateDrive = () => {
    if (costConfirmation) {
      let totalCost;
      if (cost != returnTime?.idToUpdateDrive?.costPerSeat) {
        totalCost = cost + availableSeats * settings?.adminCommission;
      } else {
        totalCost = cost;
      }

      setIsLoading(true);
      const date = moment(dateTimeStamp).format('YYYY-MM-DD');
      try {
        const body = {
          startLocation: {
            latitude: origin?.location.lat,
            longitude: origin?.location?.lng,
          },
          destinationLocation: {
            latitude: destinationMap?.location?.lat,
            longitude: destinationMap?.location?.lng,
          },
          date: moment(`${date}T${time}`).valueOf(),
          availableSeats: availableSeats,
          path: 0,
          costPerSeat: returnTime?.idToUpdateDrive?.interCity
            ? totalCost.toFixed(0)
            : value,
          startDes: origin?.description,
          destDes: destinationMap?.description,
        };
        dispatch(
          setUpdateDrive(returnTime?.idToUpdateDrive?.id, body, response => {
            Alert.alert('Success', 'Ride Updated Successfully', [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('DriverHome');
                  setIsLoading(false);
                  setcost(0);
                },
              },
            ]);
          }),
        );
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      Alert.alert('Message!', 'Please confirm total cost per seat!');
    }
  };
  const showTimePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    dispatch(setTime(moment(date).format('HH:mm')));
    setnormalTime(date);
    hideTimePicker();
  };
  const onPressCost = async () => {
    if (
      origin?.location?.lat &&
      origin?.location?.lng &&
      destinationMap?.location?.lat &&
      destinationMap?.location?.lng
    ) {
      const body = {
        startLocation: [origin?.location.lat, origin?.location?.lng],
        destinationLocation: [
          destinationMap?.location?.lat,
          destinationMap?.location?.lng,
        ],
      };
      const res = await post(`drives/city`, body, await header());
      if (res?.data) {
        setcost(res?.data?.price);
        navigation?.navigate('CostPerSeat', {data: res.data});
      }
    } else {
      Alert.alert('Error!', 'Please add start and sestination location!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={'Update Drive'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LocationInput
          onPressStart={() =>
            navigation.navigate('StartLocationDriver', {
              type: 'startLocation',
            })
          }
          titleStart={
            origin !== null ? origin.description : I18n.t('start_location')
          }
          onPressDes={() =>
            navigation.navigate('StartLocationDriver', {
              type: 'destination',
            })
          }
          titleDes={
            destinationMap !== null
              ? destinationMap.description
              : I18n.t('destination')
          }
          onPressFavStart={() => {
            setFavPress('startLocation');
            favourteLocationRef.current.open();
          }}
          onPressFavDes={() => {
            setFavPress('destination');
            favourteLocationRef.current.open();
          }}
          onFavPress={() => {
            favourteLocationRef.current.open();
          }}
          favPress={favPress}
        />

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
          <View
            style={{
              backgroundColor: colors.green,
              padding: 10,
              borderRadius: 20,
            }}>
            <Text style={{color: colors.white}}>
              {!availableSeats ? 0 : availableSeats}
            </Text>
          </View>
        </View>

        <DateTimePickerCard
          datetitle={I18n.t('select_dates')}
          timeTitle={I18n.t('need_to_arrive')}
          onPressDate={() => calendarSheetRef.current.open()}
          dateText={
            dateTimeStamp !== null
              ? moment(dateTimeStamp).format('DD MMM')
              : moment(new Date()).format('DD MMM')
          }
          onPressTime={() => showTimePicker()}
          timeText={time ? time : moment(new Date()).format('HH:mm')}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          is24Hour={true}
          locale="en_GB"
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
          date={new Date(normalTime)}
        />
        <CalendarSheet
          calendarSheetRef={calendarSheetRef}
          date={dateTimeStamp || new Date()}
        />

        <Text style={styles.presetTxt}>{I18n.t('cost_percentage')}</Text>
        {returnTime?.idToUpdateDrive?.interCity ? (
          <TouchableOpacity
            onPress={() => {
              onPressCost();
              setcostConfirmation(true);
            }}
            style={[
              styles.dropBtn,
              {
                backgroundColor:
                  cost != returnTime?.idToUpdateDrive?.costPerSeat
                    ? colors.navy_blue
                    : colors.g1,
              },
            ]}>
            <Text style={styles.dropText}>
              {cost ? `${cost.toFixed()} NOK` : I18n.t('cost_per_seat')}
            </Text>
          </TouchableOpacity>
        ) : (
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            dropDownDirection={'TOP'}
            setItems={setItems}
            style={{width: '90%', alignSelf: 'center'}}
            dropDownContainerStyle={{width: '90%', alignSelf: 'center'}}
          />
        )}

        <FavouriteLocations
          favourteLocationRef={favourteLocationRef}
          favPress={favPress}
          setFavPress={setFavPress}
        />
        {isLoading ? <Loader /> : null}
      </ScrollView>
      <KeyboardAvoidingView
        //keyboardVerticalOffset={15}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <AppButton
          bgColor={handleColor(
            origin,
            destinationMap,
            availableSeats,
            dateTimeStamp,
            time,
            value,
          )}
          disabled={
            origin === null ||
            destination === null ||
            availableSeats === null ||
            dateTimeStamp === null
          }
          title={I18n.t('update')}
          onPress={() => {
            if (toggleEnabled) {
              handleReturnCreateDrive();
            }
            handleCreateDrive();
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const handleColor = (
  origin,
  destinationMap,
  availableSeats,
  dateTimeStamp,
  time,
  cost,
) => {
  if (
    !origin ||
    !dateTimeStamp ||
    !availableSeats ||
    !destinationMap ||
    !time ||
    !cost
  ) {
    return colors.btnGray;
  }
  return colors.green;
};

export default UpdateDrive;
