import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  size,
  color,
  WP,
  colors,
  family,
  appImages,
  appIcons,
  HP,
} from '../../../utilities';
import I18n from '../../../utilities/translations';

export const CalendarYear = ({show, onPress, current_year, setYear}) => {
  const onYearPress = year => {
    setYear(year);
  };

  const renderItems = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onYearPress(item)}
        style={[
          styles.itemContainer,
          {
            backgroundColor: item === current_year ? colors.blue : colors.white,
          },
        ]}>
        <Text
          style={
            ([styles.itemText],
            {
              color: item === current_year ? colors.white : colors.light_black,
              fontSize: size.xxlarge,
              fontFamily: family.product_sans_bold,
            })
          }>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <RBSheet
      ref={show}
      //   height={329}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(16,16,16,0.5)',
        },
        container: {
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
          height: 400,
        },
      }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerStyle}>
            {I18n.t('select_calender_year')}
          </Text>
        </View>
        <FlatList
          style={{height: 250}}
          //   contentContainerStyle={{width: '100%', flex: 1}}
          data={Array.from(Array(new Date().getFullYear() - 1999), (_, i) =>
            (i + 2000).toString(),
          )}
          renderItem={renderItems}
          inverted={true}
        />

        <TouchableOpacity
          onPress={() => show?.current?.close()}
          style={styles.button}>
          <Text style={styles.buttonText}>{I18n.t('ok')}</Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: WP('5'),
    // alignItems: 'center',
  },
  button: {
    borderRadius: 14,
    marginHorizontal: HP('2.5'),
    height: HP('7'),
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: HP('2'),
  },
  buttonText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_bold,
    color: colors.white,
  },
  headerStyle: {
    fontFamily: family.product_sans_bold,
    fontSize: size.h5,
    color: colors.light_black,
    marginVertical: HP('1'),
  },
  headerContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  itemContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
  itemText: {
    fontSize: size.xxlarge,
    fontFamily: family.product_sans_bold,
    color: colors.light_black,
  },
});
