import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {norway_flag, tick_green_bg, uk} from '../assets';
import {lang} from '../screens/shared-types';

import {theme} from '../theme';

const ChooseLanguage = ({onSelected, english, norway, selectedLang}) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.selectCon, selectedLang == 'sw' && styles.selectedCon]}
        onPress={() => {
          onSelected('sw');
        }}>
        <Text
          style={[
            theme.Text.h4Normal,
            selectedLang == 'sw' && styles.selectedText,
          ]}>
          {norway}
        </Text>
        <SvgXml xml={selectedLang == 'sw' ? tick_green_bg : norway_flag} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.selectCon, selectedLang == 'en' && styles.selectedCon]}
        onPress={() => {
          onSelected('en');
        }}>
        <Text
          style={[
            theme.Text.h4Normal,
            selectedLang == 'en' && styles.selectedText,
          ]}>
          {english}
        </Text>
        <SvgXml xml={selectedLang == 'en' ? tick_green_bg : uk} />
      </TouchableOpacity>
    </View>
  );
};

export default ChooseLanguage;

const styles = StyleSheet.create({
  selectCon: {
    borderRadius: 50,
    padding: 15,
    paddingHorizontal: 15,
    width: '100%',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: theme.colors.borderColor,
    marginVertical: 10,
    marginBottom: 20,
  },
  selectedCon: {
    borderWidth: 0,
    backgroundColor: theme.colors.btn_highlight,
  },
  selectedText: {
    color: theme.colors.white,
  },
});
