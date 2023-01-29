import React from 'react';
import {
  FlatList, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  colors,
  family, size, WP
} from '../../../utilities';
import I18n from '../../../utilities/translations';


export const SortModal = ({ show, onPress, sortItems  }) => {
  //Onpress Sort Order Item
  const onItemPress = item => {
    onPress(item);
    show?.current?.close();
  };

  const renderItems = ({ item }) => {
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
          <Text style={styles.headerStyle}>{I18n.t('sort_by')}</Text>
        </View>
        <FlatList data={sortItems} renderItem={renderItems} />
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
