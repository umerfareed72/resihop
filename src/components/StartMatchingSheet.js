import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {appIcons, appImages, colors} from '../utilities';
import {fonts} from '../theme';
import I18n from '../utilities/translations';
import {useSelector} from 'react-redux';

const StartMatchingSheet = ({setModal, setHeight, mapRef}) => {
  const [sliderValue, setSliderValue] = useState(0);

  const searchDrivesResponse = useSelector(
    state => state.map.searchDriveResponse,
  );

  useEffect(() => {
    setHeight(Dimensions.get('screen').height - 200);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.walkDistaceTxt}>{I18n.t('walk_to_pickUp')}</Text>
        <Text style={styles.distance}>500 M</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={500}
        thumbImage={appIcons.sliderImage}
        minimumTrackTintColor={colors.green}
        maximumTrackTintColor={colors.g1}
        onValueChange={value => setSliderValue(parseInt(value))}
      />
      <View style={styles.startEndDistanceContainer}>
        <Text style={styles.intDistance}>{`${sliderValue} M`}</Text>
        <Text style={styles.intDistance}>500 M</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.btnWrapper,
          {
            backgroundColor:
              searchDrivesResponse === null || searchDrivesResponse.length === 0
                ? colors.g1
                : colors.green,
          },
        ]}
        disabled={
          searchDrivesResponse === null || searchDrivesResponse.length === 0
        }
        onPress={() => setModal('finding')}>
        <Text style={styles.btnTxt}>{I18n.t('start_matching')}</Text>
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
    fontFamily: fonts.regular,
  },
  distance: {
    fontSize: 18,
    lineHeight: 24,
    color: colors.green,
    fontFamily: fonts.bold,
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
    fontFamily: fonts.regular,
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
    fontFamily: fonts.bold,
  },
});

export default StartMatchingSheet;
