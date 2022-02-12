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
import I18n from '../../../utilities/translations';

export const SortModal = ({show, onPress}) => {
  const items = [
    {
      id: 1,
      title: I18n.t('sort_by_date_as'),
      value: 'tripDate:asc',
    },
    {
      id: 2,
      title: I18n.t('sort_by_date_ds'),
      value: 'tripDate:desc',
    },
    {
      id: 3,
      title: I18n.t('sort_by_date_ao'),
      value: 'destDes:asc',
    },
    {
      id: 4,
      title: I18n.t('sort_by_date_oa'),
      value: 'destDes:desc',
    },
  ];

  //Onpress Sort Order Item
  const onItemPress = item => {
    console.log(item);
    onPress(item);
    show?.current?.close();
  };

  const renderItems = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          onItemPress(item);
        }}>
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
