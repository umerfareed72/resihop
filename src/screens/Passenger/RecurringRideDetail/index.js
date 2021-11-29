import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import {CustomHeader, DeleteCardModal} from '../../../components';
import {useNavigation} from '@react-navigation/core';
import {appIcons, appImages, colors} from '../../../utilities';
import HeartIcon from 'react-native-vector-icons/EvilIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import CalendarSheet from '../../CalendarSheet';
import {theme, fonts} from '../../../theme';
import I18n from '../../../utilities/translations';

function index() {
  let navigation = useNavigation();
  const favourteLocationRef = useRef(null);
  const calendarSheetRef = useRef(null);

  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [noLaterTime, setNoLaterTime] = useState('');
  const [date, setDate] = useState('08:00');
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={'Details'}
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
            <HeartIcon name="heart" size={30} color={colors.btnGray} />
            <Image source={appIcons.mobiledata} style={styles.locationSwitch} />
            <HeartIcon name="heart" size={30} color={colors.btnGray} />
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
          <Text style={[styles.selectTxt, {marginRight: 23}]}>
            Need to arrive no later than
          </Text>
          <Text style={styles.selectTxt}>Select Date</Text>
        </View>
        <View style={styles.selectionInputWrapper}>
          <TextInput
            editable={false}
            placeholderTextColor={colors.btnGray}
            value={date}
            onChangeText={setDate}
            // onPressOut={() => calendarSheetRef.current.open()}
            // onPressIn={() => Keyboard.dismiss()}
            style={[styles.noLater, {marginRight: 11}]}
          />
          <Image
            source={appImages.calendar}
            resizeMode="contain"
            style={styles.calendarIcon}
          />
          <TouchableOpacity
            onPress={() => calendarSheetRef.current.open()}
            activeOpacity={0.8}>
            <View style={styles.noLater}>
              <Text>{'Date'}</Text>
            </View>
          </TouchableOpacity>
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
        <View style={{marginTop: '35%'}}>
          <Button
            title={'Update'}
            onPress={() => navigation.navigate('UpdateRide')}
            buttonStyle={[theme.Button.buttonStyle]}
            titleStyle={[theme.Button.titleStyle]}
            disabledTitleStyle={theme.Button.disabledTitleStyle}
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginTop: '5%',
            }}
          />
          <Button
            title={'Delete Rides'}
            onPress={() => setShow(true)}
            buttonStyle={[theme.Button.buttonStyle, {backgroundColor: 'black'}]}
            titleStyle={[theme.Button.titleStyle]}
            disabledTitleStyle={theme.Button.disabledTitleStyle}
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginTop: '5%',
            }}
          />
        </View>
      </ScrollView>
      {show && (
        <DeleteCardModal
          img={appIcons.dumpBox}
          onPressHide={() => {
            setShow(false);
          }}
          selected={selected}
          h1={I18n.t('delete_h1')}
          h2={I18n.t('delete_h2')}
          btn1Text={I18n.t('yes')}
          btn2Text={I18n.t('no')}
          show={show}
          bgColor={colors.green}
          textColor={colors.white}
          onPressYes={() => {
            setSelected(true);
          }}
          onPressNo={() => {
            setSelected(false);
            setShow(false);
          }}
        />
      )}
    </SafeAreaView>
  );
}

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
  txtInput: {
    height: 44,
    width: 300,
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
  destSquare: {
    height: 16,
    width: 16,
    backgroundColor: colors.blue,
    position: 'absolute',
    top: 14,
    left: 15,
    borderRadius: 4,
  },
  switchWrapper: {
    alignItems: 'center',
  },
  locationSwitch: {
    height: 25,
    width: 25,
    resizeMode: 'center',
    marginVertical: 11,
  },
  bookSeatsTxt: {
    fontSize: 14,
    lineHeight: 24,
    marginTop: 37,
    color: colors.txtBlack,
    marginLeft: 21,
    fontFamily: fonts.regular,
  },
  seatsWrapper: {
    flexDirection: 'row',
    marginLeft: 21,
    marginTop: 25,
  },
  seat: {
    height: 31,
    width: 24,
    marginRight: 20,
  },
  selectWrapper: {
    flexDirection: 'row',
    marginTop: 26,
    marginLeft: 25,
  },
  selectTxt: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.txtBlack,
  },
  selectionInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  calendarIcon: {
    height: 18,
    width: 18,
    position: 'absolute',
    right: 22,
    top: 13,
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
    justifyContent: 'center',
  },
  returnTripWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 31,
    width: '87%',
    alignSelf: 'center',
  },
  returnTxt: {
    fontSize: 16,
    lineHeight: 29,
    color: colors.txtBlack,
  },
  returntimeTxt: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.txtBlack,
    marginTop: 20,
  },
  timeBracketTxt: {
    fontSize: 12,
    lineHeight: 24,
    color: colors.btnGray,
  },
});
