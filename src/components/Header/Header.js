import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Header as RneHeader, Icon, Text} from 'react-native-elements';
import {fonts, theme} from '../../theme/theme';

const Header = ({
  showRight = true,
  showLeft = true,
  showCenter = true,
  leftText,
  rightIcon,
  rightIcon2,
  rightIconProps,
  rightIcon2Props,
  bgColor = 'white',
  rightText,
  rightAction,
  leftAction,
  marginTop
}) => {
  return (
    <RneHeader
      barStyle={'dark-content'}
      containerStyle={{backgroundColor: bgColor}}
      leftComponent={
        showLeft ? (
          <View
            style={[
              styles.HeaderLeftContainer,
              leftText && {
                width: 300,
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: marginTop
              },
            ]}>
            <Icon
              name={'arrowleft'}
              type={'antdesign'}
              color={theme.colors.black}
              onPress={leftAction}
              style={{padding: 10}}
              size={22}
            />
            {leftText && (
              <Text
                style={[
                  theme.Text.h4Normal,
                  {
                    fontSize: 20,
                    // fontFamily: fonts.bold,
                  },
                ]}>
                {leftText}
              </Text>
            )}
          </View>
        ) : (
          <View />
        )
      }
      centerComponent={
        showCenter ? (
          <View style={styles.HeaderCenterContainer}></View>
        ) : (
          <View />
        )
      }
      rightComponent={
        rightText ? (
          <View style={styles.HeaderRightContainer}>
            <TouchableOpacity onPress={rightAction}>
              <Text style={[theme.Text.h4Normal, {fontSize: 14}]}>
                {rightText}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {rightIcon && (
              <Icon
                name={rightIconProps.name}
                type={rightIconProps.type}
                size={rightIconProps.size}
                color={rightIconProps.color}
                reverse={rightIconProps.reverse}
                reverseColor={rightIconProps.reverseColor}
                containerStyle={styles.iconCon}
              />
            )}
            {rightIcon2 && (
              <Icon
                name={rightIcon2Props.name}
                type={rightIcon2Props.type}
                size={rightIcon2Props.size}
                color={rightIcon2Props.color}
                reverse={rightIcon2Props.reverse}
                reverseColor={rightIcon2Props.reverseColor}
                containerStyle={styles.iconCon}
              />
            )}
          </View>
        )
      }
    />
  );
};

export {Header};

const styles = StyleSheet.create({
  HeaderLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftIconStyle: {
    width: 7.06,
    height: 12.95,
  },
  HeaderCenterContainer: {
    justifyContent: 'center',
  },
  HeaderRightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '120%',
    flex: 1,
  },
  iconCon: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    marginHorizontal: 5,
  },
});
