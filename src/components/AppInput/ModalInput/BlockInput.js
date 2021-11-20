import React from 'react';
import {Platform} from 'react-native';
import {I18nManager} from 'react-native';
import {TextInput} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {family, colors, WP, size} from '../../../utilities';

export const BlockInput = ({
  title,
  placeholder,
  placeholderTextColor,
  keyboardType,
  onChangeText,
  touched,
  error,
  value,
  onBlur,
  blurOnSubmit,
  disableFullscreenUI,
  autoCapitalize,
  onSubmitEditing,
  maxLength,
  returnKeyType,
  editable,
  country,
  inputWidth,
  inputColor,
  onEndEditing,
  autoFocus,
  ref,
}) => {
  return (
    <View style={styles.conatiner}>
      <View style={[styles.inputContainer]}>
        <TextInput
          ref={ref}
          placeholder={placeholder}
          autoFocus={autoFocus}
          editable={editable}
          keyboardType={keyboardType}
          placeholderTextColor={placeholderTextColor}
          style={[styles.inputStyle, {fontSize: size.h6}]}
          onChangeText={onChangeText}
          value={value}
          onBlur={onBlur}
          blurOnSubmit={blurOnSubmit}
          disableFullscreenUI={disableFullscreenUI}
          autoCapitalize={autoCapitalize}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          onEndEditing={onEndEditing}
        />
      </View>
      {touched && error && (
        <View>
          <Text style={styles.errorStyle}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    paddingVertical: 30,
  },

  title: {
    fontSize: size.small,
    color: colors.b2,
    textAlign: 'left',
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: colors.light_black,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    borderRadius: 14,
    paddingHorizontal: 10,
  },
  inputStyle: {
    fontSize: size.small,
    paddingVertical: 0,
    width: '100%',
    color: colors.black,
  },
  inputStyle1: {
    fontSize: size.small,
    paddingHorizontal: 0,
  },
  errorStyle: {
    fontSize: size.xsmall,
    color: colors.red,
    padding: 5,
    textAlign: 'left',
    // fontFamily: family.Poppins_SemiBold,
  },
  aiCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
