import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {colors, WP, appIcons, size} from '../../utilities';
import MyStatusBar from './statusBar';
export const CustomHeader = ({
  title,
  backButton,
  navigation,
  text,
  btnText,
  btnImage,
  onPress,
  onPressBtn,
  btnImage1,
  onPress1,
  barColor,
  headerColor,
  tintColor3,
  bg3Color,
  height3,
  width3,
}) => {
  return (
    <>
      <MyStatusBar
        backgroundColor={barColor ? barColor : colors.white}
        barStyle={'dark-content'}
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor: headerColor ? headerColor : colors?.white,
          },
        ]}>
        <View style={styles.wrapper}>
          <View style={styles.contentContainer}>
            {backButton ? (
              <TouchableOpacity
                style={styles.headerContainer}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image source={appIcons.backArrow} style={styles.imageStyle} />
              </TouchableOpacity>
            ) : (
              false
            )}
            <Text style={styles.header}>{title}</Text>
          </View>
          {btnText ? (
            <TouchableOpacity onPress={onPressBtn} hitSlop={styles.hitSlope}>
              <Text style={styles.heading2}>{text}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity disabled={true}>
              <Text style={styles.disable}>{text}</Text>
            </TouchableOpacity>
          )}
          <View style={styles.wrapper2}>
            {btnImage ? (
              <TouchableOpacity
                onPress={onPress1}
                hitSlop={styles.hitSlope}
                style={styles.btnImageContainer1}>
                <Image style={[styles.headerImage1]} source={btnImage} />
              </TouchableOpacity>
            ) : (
              false
            )}
            {btnImage1 ? (
              <TouchableOpacity
                onPress={onPress}
                hitSlop={styles.hitSlope}
                style={[
                  styles.btnImageContainer,
                  {backgroundColor: bg3Color ? bg3Color : colors.green},
                ]}>
                <Image
                  style={[
                    styles.headerImage,
                    {
                      tintColor: tintColor3 ? tintColor3 : colors?.white,
                      height: height3,
                      width: width3,
                    },
                  ]}
                  source={btnImage1}
                />
              </TouchableOpacity>
            ) : (
              false
            )}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: WP('17'),
    justifyContent: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: WP('5'),
  },
  wrapper2: {
    alignItems: 'center',
    paddingTop: 10,
    flexDirection: 'row',
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerContainer: {
    paddingRight: 20,
    paddingTop: 5,
  },
  header: {
    color: colors.black,
    fontSize: size.xxlarge,
    fontWeight: 'bold',
  },
  imageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  heading2: {
    fontSize: 16,
    color: colors.white,
  },
  headerImage1: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  headerImage: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  hitSlope: {
    top: 30,
    left: 30,
    right: 30,
  },
  disable: {
    opacity: 0.5,
    fontSize: 16,
    color: colors.white,
  },
  btnImageContainer: {
    backgroundColor: colors.green,
    borderRadius: 25,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnImageContainer1: {
    backgroundColor: colors.green,
    borderRadius: 25,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
