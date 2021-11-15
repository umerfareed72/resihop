import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {colors, WP, appIcons, size} from '../../utilities';
import MyStatusBar from './statusBar';
export const Header = ({
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
}) => {
  return (
    <>
      <MyStatusBar backgroundColor={'black'} />
      <View style={styles.container}>
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
                onPress={onPress}
                hitSlop={styles.hitSlope}
                style={[styles.btnImageContainer]}>
                <Image style={styles.headerImage} source={btnImage} />
              </TouchableOpacity>
            ) : (
              false
            )}
            {btnImage1 ? (
              <TouchableOpacity
                onPress={onPress1}
                hitSlop={styles.hitSlope}
                style={styles.btnImageContainer1}>
                <Image style={styles.headerImage1} source={btnImage1} />
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
    height: WP('15'),
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: WP('5'),
  },
  wrapper2: {
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
    height: 25,
    width: 25,
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
    borderRadius: 30,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  btnImageContainer1: {
    backgroundColor: colors.green,
    borderRadius: 30,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
