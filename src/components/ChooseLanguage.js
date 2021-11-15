import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {norway_flag, tick_green_bg, uk} from '../assets';

import {theme} from '../theme';

const ChooseLanguage = ({onSelected}) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.selectCon, /* selectedNorsk && */ styles.selectedCon]}
        onPress={() => {
        //   setSelected(norsk);
        //   onSelected(norsk);
        }}>
        <Text
          style={[theme.Text.h4Normal, /* selectedNorsk && */ styles.selectedText]}>
          {/* {norsk} */}
        </Text>
        <SvgXml xml={/* selectedNorsk ? tick_green_bg : */ norway_flag} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.selectCon, /* selectedEnglish && */ styles.selectedCon]}
        onPress={() => {
        //   setSelected(eng);
        //   onSelected(eng);
        }}>
        <Text
          style={[theme.Text.h4Normal, /* selectedEnglish && */ styles.selectedText]}>
          {/* {eng} */}
        </Text>
        <SvgXml xml={/* selectedEnglish ? tick_green_bg : */ uk} />
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
