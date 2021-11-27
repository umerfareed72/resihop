import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {CustomHeader} from '../../components/Header/CustomHeader';
import {appImages, colors, HP} from '../../utilities';
import StarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReturnBookSheet from '../../components/ReturnBookSheet';

const AvailablePassengerList = () => {
  let navigation = useNavigation();

  const [startLocation, setStartLocation] = useState();
  const returnBookSheetRef = useRef(null);

  const data = [1, 2, 3, 4, 5, 6, 7];

  return (
    <View style={styles.container}>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={'Available Drivers'}
      />

      <FlatList
        data={data}
        renderItem={({item}) => (
          <View key={item} style={styles.driversCard}>
            <View style={styles.startInputWrapper}>
              <>
                <TextInput
                  placeholder="123 abc apartment abc street abc..."
                  placeholderTextColor={colors.inputTxtGray}
                  value={startLocation}
                  onChangeText={setStartLocation}
                  style={styles.txtInput}
                />
                <View style={styles.destSquare} />
              </>
              <>
                <TextInput
                  placeholder="123 abc apartment abc street abc..."
                  placeholderTextColor={colors.inputTxtGray}
                  value={startLocation}
                  onChangeText={setStartLocation}
                  style={styles.txtInput}
                />
                <View style={styles.startDot} />
              </>
            </View>
            <View style={styles.driverInfoContainer}>
              <View style={styles.driverInfo}>
                <Image
                  source={appImages.driver}
                  resizeMode="cover"
                  style={styles.driver}
                />
                <View>
                  <Text style={styles.driverName}>John Deo</Text>
                  <View style={styles.ratingContainer}>
                    <StarIcon name="star" size={17} color={colors.white} />
                    <Text style={styles.ratingTxt}>4.5</Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={styles.imagesContainer}>
                  <Image
                    source={appImages.seatGreen}
                    resizeMode="contain"
                    style={styles.greenSeat}
                  />
                  <Image
                    source={appImages.seatGreen}
                    resizeMode="contain"
                    style={styles.greenSeat}
                  />
                </View>

                <Text style={styles.dateStyle}>12 June, 08:00</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => returnBookSheetRef.current.open()}>
                <Text style={styles.btnTxt}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnContainerReplica}
                onPress={() => returnBookSheetRef.current.open()}>
                <Text style={styles.btnTxt}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <ReturnBookSheet returnBookSheetRef={returnBookSheetRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  imagesContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenSeat: {
    width: 18.75,
    height: 25,
    marginHorizontal: 5,
  },
  startDot: {
    height: 16,
    width: 16,
    borderRadius: 16 / 2,
    backgroundColor: colors.green,
    position: 'absolute',
    top: 8,
    left: 15,
    marginHorizontal: HP('2'),
    marginVertical: HP('2'),
  },
  destSquare: {
    height: 16,
    width: 16,
    backgroundColor: colors.blue,
    position: 'relative',
    top: 40,
    left: 30,
    borderRadius: 4,
  },
  txtInput: {
    height: 44,
    width: 326,
    borderWidth: 1,
    marginHorizontal: HP('2'),
    marginTop: HP('1'),
    // marginVertical: HP('1'),
    borderColor: colors.greyBorder,
    borderRadius: 10,
    paddingLeft: 45,
    color: colors.inputTxtGray,
  },
  locationMainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },

  driver: {
    height: 58,
    width: 58,
    borderRadius: 58 / 2,
    marginRight: 14,
  },
  driverInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 24,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startInputWrapper: {
    alignSelf: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    paddingHorizontal: 5,
    backgroundColor: colors.green,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  ratingTxt: {
    fontSize: 13,
    marginLeft: 3,
    //lineHeight: 37,
    color: colors.white,
  },
  driverName: {
    fontSize: 18,
    lineHeight: 22,
    color: colors.txtBlack,
    marginBottom: 7,
  },
  seatGreen: {
    height: 16,
    width: 12,
  },
  rideDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 17,
  },
  seatDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carDetailsTxt: {
    flexDirection: 'row',
    alignItems: 'center',
    //width: '50%',
  },
  seatNum: {
    fontSize: 13,
    lineHeight: 22,
    color: colors.txtBlack,
    marginLeft: 6,
  },
  carDetails: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.txtGray,
  },
  availableMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '90%',
    marginTop: 20,
  },
  availableBox: {
    height: 24,
    width: 82,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  availableTxt: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.white,
  },
  date: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.txtBlack,
  },
  btnContainer: {
    height: 42,
    backgroundColor: colors.green,
    width: '40%',
    marginHorizontal: HP('2'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 25,
  },
  btnContainerReplica: {
    height: 42,
    backgroundColor: colors.black,
    width: '40%',
    marginHorizontal: HP('2'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 25,
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
  },
  driversCard: {
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    borderColor: colors.greyBorder,
    paddingBottom: 25,
    marginBottom: 20,
  },
});

export default AvailablePassengerList;
