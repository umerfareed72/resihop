import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors, appImages} from '../../../utilities';

export const RecurringRideCard = () => {
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');

  return (
    <>
      <TouchableOpacity style={styles.container}>
        <View style={styles.cardStyle}>
          <View style={{marginBottom: 20}}>
            <TextInput
              placeholder="123 abc apartment abc street abc..."
              placeholderTextColor={colors.inputTxtGray}
              value={startLocation}
              onChangeText={setStartLocation}
              style={styles.txtInput}
            />
            <View style={styles.startDot} />
          </View>
          <View>
            <TextInput
              placeholder="123 abc apartment abc street abc..."
              placeholderTextColor={colors.inputTxtGray}
              value={destination}
              onChangeText={setDestination}
              style={styles.txtInput}
            />
            <View style={styles.destSquare} />
          </View>
          <View style={styles.filterContainer}>
            <Text>{'12 June - 22 June | 08:00'}</Text>
            <View style={styles.seatsContainer}>
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
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '4%',
            }}>
            <>
              <Text>Single Trip</Text>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>SEK 20</Text>
            </>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    width: '90%',
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 10,
    padding: '5%',
    borderRadius: 15,
  },
  container: {
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
  },
  txtInput: {
    height: 44,
    width: '100%',
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
  ellipsesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ellipses: {
    height: 25,
    width: 25,
    borderRadius: 25,
    marginRight: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: '4%',
    alignItems: 'center',
  },
  seatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '12%',
    justifyContent: 'space-between',
  },
  greenSeat: {
    height: 21.85,
    width: 16.38,
  },
  seatTxt: {
    fontSize: 13,
    lineHeight: 22,
    color: colors.txtBlack,
    marginLeft: 7,
  },
});
