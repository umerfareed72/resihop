import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {colors, appIcons, appImages} from '../../../utilities';
import HeartIcon from 'react-native-vector-icons/EvilIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import FavouriteLocations from '../../FavouriteLocations';
import {CustomHeader} from '../../../components';
import CalendarSheet from '../../CalendarSheet';
import {useNavigation} from '@react-navigation/core';
import {fonts} from '../../../theme/theme';
import I18n from '../../../utilities/translations';

const UpdateRide = () => {
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
        title={'Update Ride'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.locationMainWrapper}>
          <View>
            <View style={{marginBottom: 20}}>
              <TouchableOpacity
                style={styles.txtInput}
                onPress={() =>
                  navigation.navigate('StartLocation', {
                    modalName: 'startLocation',
                  })
                }>
                <Text style={styles.startTxt}>{I18n.t('start_location')}</Text>
              </TouchableOpacity>
              <View style={styles.startDot} />
            </View>
            <View>
              <TouchableOpacity
                style={styles.txtInput}
                onPress={() =>
                  navigation.navigate('StartLocation', {
                    modalName: 'destination',
                  })
                }>
                <Text style={styles.startTxt}>{I18n.t('destination')}</Text>
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
        <Text style={styles.bookSeatsTxt}>{I18n.t('book_seat')}</Text>
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
          <Text style={[styles.selectTxt, {marginRight: 23}]}>
            {I18n.t('need_to_arrive')}
          </Text>
        </View>
        <View style={styles.selectionInputWrapper}>
          <TextInput
            placeholder="XX:XX"
            placeholderTextColor={colors.btnGray}
            value={noLaterTime}
            onChangeText={setNoLaterTime}
            style={styles.noLater}
          />
        </View>
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
                  <TouchableOpacity
                    style={styles.txtInput}
                    onPress={() =>
                      navigation.navigate('StartLocation', {
                        modalName: 'startLocation',
                      })
                    }>
                    <Text style={styles.startTxt}>
                      {I18n.t('start_location')}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.startDot} />
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.txtInput}
                    onPress={() =>
                      navigation.navigate('StartLocation', {
                        modalName: 'destination',
                      })
                    }>
                    <Text style={styles.startTxt}>{I18n.t('destination')}</Text>
                  </TouchableOpacity>
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
        <TouchableOpacity style={styles.nextBtnContainer}>
          <Text style={styles.nextTxt}>{I18n.t('update')}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UpdateRide;

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
  },
  txtInput: {
    height: 44,
    width: 291,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    borderRadius: 10,
    paddingLeft: 45,
    color: colors.inputTxtGray,
    fontFamily: fonts.regular,
    justifyContent: 'center',
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
  },
  startTxt: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.g4,
  },
});
