import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {fonts} from '../../../theme';
import {appIcons, colors} from '../../../utilities';
import HeartFilled from 'react-native-vector-icons/Foundation';
import HeartIcon from 'react-native-vector-icons/EvilIcons';

export const ReturnLocationInput = ({
  onPressStart,
  onPressDes,
  titleDes,
  titleStart,
  favPress,
  onPressFavStart,
  onPressFavDes,
  onPressFavReturn,
  onPressReturnDes,
  onFavPress,
}) => {
  return (
    <View style={styles.locationMainWrapper}>
      <View>
        <View style={{marginBottom: 20}}>
          <TouchableOpacity style={styles.txtInput} onPress={onPressStart}>
            <Text style={styles.locationTxt}>{titleStart}</Text>
          </TouchableOpacity>
          <View style={styles.startDot} />
        </View>
        <View>
          <TouchableOpacity style={styles.txtInput} onPress={onPressDes}>
            <Text style={styles.locationTxt}>{titleDes}</Text>
          </TouchableOpacity>
          <View style={styles.destSquare} />
        </View>
      </View>
      <View style={styles.switchWrapper}>
        {favPress === 'returnstartLocation' ? (
          <HeartFilled
            name="heart"
            size={24}
            color={'red'}
            onPress={onFavPress}
          />
        ) : (
          <HeartIcon
            name="heart"
            size={30}
            color={colors.btnGray}
            onPress={onPressFavStart}
          />
        )}

        <Image source={appIcons.mobiledata} style={styles.locationSwitch} />
        {favPress === 'returndestination' ? (
          <HeartFilled
            name="heart"
            size={24}
            color={'red'}
            onPress={onFavPress}
          />
        ) : (
          <HeartIcon
            onPress={onPressFavDes}
            name="heart"
            size={30}
            color={colors.btnGray}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: 291,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    borderRadius: 10,
    paddingLeft: 45,
    color: colors.inputTxtGray,
    justifyContent: 'center',
    fontFamily: fonts.regular,
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
  btnTxt: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.white,
    fontFamily: fonts.regular,
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
  locationTxt: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.g4,
  },
});
