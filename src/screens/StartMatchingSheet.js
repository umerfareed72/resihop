import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import {colors} from '../utilities';
import {useNavigation} from '@react-navigation/core';

const StartMatchingSheet = ({setNearestDriver}) => {
  let navigation = useNavigation();

  const [sliderValue, setSliderValue] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.walkDistaceTxt}>
          Walk Distance to pick up Location
        </Text>
        <Text style={styles.distance}>300 M</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={3000}
        minimumTrackTintColor={colors.green}
        maximumTrackTintColor={colors.g1}
        onValueChange={value => setSliderValue(parseInt(value))}
      />
      <View style={styles.startEndDistanceContainer}>
        <Text style={styles.intDistance}>{`${sliderValue} M`}</Text>
        <Text style={styles.intDistance}>3000 M</Text>
      </View>
      <TouchableOpacity
        style={styles.btnWrapper}
        onPress={() => setNearestDriver(true)}>
        <Text style={styles.btnTxt}>Start Matching</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },

  headingContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    alignSelf: 'center',
  },
  walkDistaceTxt: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.txtBlack,
    flexWrap: 'wrap',
  },
  distance: {
    fontSize: 18,
    lineHeight: 24,
    color: colors.green,
    fontWeight: 'bold',
  },
  slider: {
    width: '88%',
    marginTop: 24,
    alignSelf: 'center',
  },
  startEndDistanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    alignSelf: 'center',
    marginTop: 8,
  },
  intDistance: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.g1,
  },
  btnWrapper: {
    height: 56,
    width: '80%',
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 25,
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
  },
});

export default StartMatchingSheet;
