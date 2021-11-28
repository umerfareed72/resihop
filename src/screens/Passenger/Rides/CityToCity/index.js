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
import HeartIcon from 'react-native-vector-icons/EvilIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import FavouriteLocations from '../../../FavouriteLocations';
import {
  CityRideList,
  CustomHeader,
  PaymentButtons,
  RideInputCard,
  WarningModal,
} from '../../../../components';
import CalendarSheet from '../../../CalendarSheet';
import styles from './styles';
import {FlatList} from 'react-native';
import MapViewComponent from '../../../../components/MapViewComponent';

const index = ({navigation}) => {
  const favourteLocationRef = useRef(null);
  const calendarSheetRef = useRef(null);
  const warningSheetRef = useRef(null);

  const [date, setDate] = useState('');
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [toggleEnabled1, setToggleEnabled1] = useState(false);
  const [toggleEnabled2, setToggleEnabled2] = useState(false);
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);

  return (
    <>
      <CustomHeader
        backButton={true}
        title={'City to City Rides'}
        navigation={navigation}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.locationMainWrapper}>
          <RideInputCard
            p1={'Start City'}
            p2={'Destination City'}
            onPressStart={() =>
              navigation.navigate('StartLocation', {modalName: 'startCity'})
            }
            onPressDes={() =>
              navigation.navigate('StartLocation', {
                modalName: 'destinationCity',
              })
            }
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
              <RideInputCard
                p1={'Start City'}
                p2={'Destination City'}
                onPressStart={() =>
                  navigation.navigate('StartLocation', {modalName: 'startCity'})
                }
                onPressDes={() =>
                  navigation.navigate('StartLocation', {
                    modalName: 'destinationCity',
                  })
                }
              />
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
          </>
        ) : null}
      </ScrollView>
      <KeyboardAvoidingView
        style={{backgroundColor: colors.white}}
        //keyboardVerticalOffset={15}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          onPress={() => {
            warningSheetRef?.current?.open();
          }}
          style={styles.nextBtnContainer}>
          <Text style={styles.nextTxt}>Start Matching</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <WarningModal
        h1={'Smoke Free Car?'}
        matter={true}
        h2={'Animal Free Car?'}
        show={warningSheetRef}
        toggleEnabled={toggleEnabled1}
        onToggle={setToggleEnabled1}
        toggleEnabled1={toggleEnabled2}
        onToggle1={setToggleEnabled2}
        onPress={() => {
          warningSheetRef?.current?.close();
          navigation?.navigate('StartMatching', {modalName: 'finding'});
        }}
      />
    </>
  );
};

export default index;
