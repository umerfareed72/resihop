import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {colors} from '../utilities';
import {fonts} from '../theme';
import {useNavigation} from '@react-navigation/core';
import I18n from '../utilities/translations';

const OfferReturnDriveCard = () => {
  let navigation = useNavigation();

  const [toggleEnabled, setToggleEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.returnTxt}>{I18n.t('offer_return')}</Text>
        <ToggleSwitch
          isOn={toggleEnabled}
          onColor={colors.green}
          offColor={colors.btnGray}
          size="small"
          onToggle={isOn => {
            setToggleEnabled(isOn);
            if (isOn) {
              navigation.navigate('StartLocationDriver', {type: 'returnTrip'});
            }
          }}
        />
      </View>
      <Text style={styles.estimatedTxt}>{I18n.t('estimated')}</Text>
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
    </View>
  );
};

export default OfferReturnDriveCard;

const styles = StyleSheet.create({
  container: {
    height: 261,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.white,
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
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  returnTxt: {
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 29,
    color: colors.txtBlack,
  },
  estimatedTxt: {
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 29,
    color: colors.txtBlack,
    marginHorizontal: 21,
    marginTop: 20,
  },
});
