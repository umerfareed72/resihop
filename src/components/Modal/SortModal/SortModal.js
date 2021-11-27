import React, {useState} from 'react';
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
} from '../../../utilities';

export const SortModal = ({show, onPress}) => {
  const items = [
    {
      id: 1,
      title: 'Sort by Date (Ascending Order)',
      onPress: () => {
        show?.current?.close();
      },
    },
    {
      id: 2,
      title: 'Sort by Date (Descending Order)',
      onPress: () => {
        show?.current?.close();
      },
    },
    {
      id: 3,
      title: 'Sort by Destination (A-Ö)',
      onPress: () => {
        show?.current?.close();
      },
    },
    {
      id: 4,
      title: 'Sort by Destination (Ö-A)',
      onPress: () => {
        show?.current?.close();
      },
    },
  ];
  const renderItems = ({item}) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={item?.onPress}>
        <Text style={styles.itemText}>{item?.title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <RBSheet
      ref={show}
      height={329}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(16,16,16,0.5)',
        },
        container: {
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
        },
      }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerStyle}>Sort By</Text>
        </View>
        <FlatList data={items} renderItem={renderItems} />
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: WP('5'),
  },
  headerStyle: {
    fontFamily: family.product_sans_regular,
    fontSize: size.xxlarge,
    color: colors.light_black,
  },
  headerContainer: {
    paddingVertical: 10,
  },
  itemContainer: {
    paddingVertical: 15,
  },
  itemText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
});
