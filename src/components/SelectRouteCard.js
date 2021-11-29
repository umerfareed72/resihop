import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {appImages, colors} from '../utilities';
import {fonts} from '../theme/theme';

const SelectRouteCard = ({setModal}) => {
  const [data, setData] = useState([1, 2, 3, 4]);

  return (
    <View style={styles.container}>
      <Text style={styles.detail}>24 min (15.6 km) | 14 Passenger</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTxt}>
          123 abc apartment abc street abc...
        </Text>
        <View style={styles.addressCircle} />
      </View>
      <View style={[styles.addressContainer, {marginTop: 21}]}>
        <Text style={styles.addressTxt}>
          123 abc apartment abc street abc...
        </Text>
        <View style={styles.addressSquare} />
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateTxt}>12 June, 08:00</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {data.map(() => (
            <Image
              source={appImages.seatGreen}
              resizeMode="contain"
              style={styles.green}
            />
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => setModal('availablePassenger')}>
        <Text style={styles.btnTxt}>Select Route</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectRouteCard;

const styles = StyleSheet.create({
  container: {
    height: 343,
    width: '100%',
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  addressContainer: {
    height: 42,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    marginTop: 23,
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  addressTxt: {
    fontSize: 13,
    lineHeight: 20,
    paddingLeft: 40,
    fontFamily: fonts.regular,
    color: colors.txtBlack,
  },
  addressCircle: {
    height: 16,
    width: 16,
    borderRadius: 16 / 2,
    backgroundColor: colors.green,
    position: 'absolute',
    left: 13,
  },
  addressSquare: {
    height: 16,
    width: 16,
    borderRadius: 5,
    backgroundColor: colors.blue,
    position: 'absolute',
    left: 13,
  },
  detail: {
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 38,
    color: colors.txtBlack,
    marginHorizontal: 21,
    marginTop: 20,
  },
  green: {
    height: 25,
    width: 18,
    marginLeft: 9,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  dateTxt: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 30,
    color: colors.txtBlack,
  },
  btnContainer: {
    height: 56,
    width: 300,
    backgroundColor: colors.green,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  btnTxt: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
  },
});
