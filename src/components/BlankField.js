import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../utilities';

const BlankField = ({title, btnText, showBtn, onPress}) => {
  return (
    <View style={style.textContainer}>
      <Text style={style.h1}>{title} </Text>
      {showBtn && (
        <TouchableOpacity onPress={onPress} style={style.btnConatiner}>
          <Text style={style.btnText}>{btnText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BlankField;

const style = StyleSheet.create({
  btnConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
  },
  btnText: {
    fontSize: 18,
    color: colors.white,
  },
  h1: {
    fontSize: 20,
    color: colors.black,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
