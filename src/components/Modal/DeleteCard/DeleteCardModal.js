import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  colors,
  WP,
  appIcons,
  size,
  family,
  appImages,
} from '../../../utilities';
import Modal from 'react-native-modal';
export const DeleteCardModal = ({
  h1,
  h2,
  image,
  onPress,
  selected,
  show,
  onPressHide,
  btn1Text,
  btn2Text,
  width,
  onPressYes,
  bgColor,
  textColor,
  onPressNo,
  img
}) => {
  return (
    <View style={styles.container}>
      <Modal isVisible={show} onBackdropPress={onPressHide}>
        <View style={styles.modalContainer}>
          <Image style={styles.imageStyle} source={img} />
          <Image style={styles.imageStyle} source={image} />
          <Text style={styles.h1}>{h1} </Text>
          <Text style={styles.h2}> {h2}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onPressYes}
              style={[
                styles.btnContainer,
                {
                  borderBottomLeftRadius: 22,
                  backgroundColor: selected ? bgColor : colors.g1,
                },
              ]}>
              <Text
                style={[
                  styles.btnText,
                  {color: selected ? textColor : colors.black},
                ]}>
                {btn1Text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressNo}
              style={[
                styles.btnContainer,
                {
                  borderBottomRightRadius: 22,
                  backgroundColor: !selected ? bgColor : colors.g1,
                },
              ]}>
              <Text
                style={[
                  styles.btnText,
                  {color: !selected ? textColor : colors.black},
                ]}>
                {btn2Text}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    height: WP('80'),
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: 22,
    marginHorizontal: 30,
    paddingTop: 30,
  },
  h1: {
    fontSize: size.large,
    color: colors.black,
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  h2: {
    fontSize: size.small,
    color: colors.black,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 30,
  },
  imageStyle: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  btnContainer: {
    backgroundColor: colors.green,
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: colors.white,
    fontSize: size.small,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
