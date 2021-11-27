import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, size, WP} from '../../utilities';

const RideTitle = () => {
  return (
    <View style={styles.alignRow}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
          alignItems: 'center',
        }}>
        <View style={styles.circleStyle} />
        <Text style={{color: colors.g4, fontSize: size.xxsmall}}>
          123 abc apartment abc street abc...
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.rectangleStyle} />
        <Text style={{color: colors.g4, fontSize: size.xxsmall}}>
          123 abc apartment abc street abc...
        </Text>
      </View>
    </View>
  );
};

export default RideTitle;

const styles = StyleSheet.create({
  alignRow: {padding: 5},
  circleStyle: {
    height: 12,
    width: 12,
    borderRadius: 12,
    backgroundColor: colors.green,
    marginRight: 15,
  },
  rectangleStyle: {
    height: 12,
    width: 12,
    borderRadius: 4,
    backgroundColor: colors.blue,
    marginRight: 15,
  },
});
