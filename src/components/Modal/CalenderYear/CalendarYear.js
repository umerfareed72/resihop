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

export const CalendarYear = ({show, onPress}) => {
  useEffect(() => {
    console.log('items in useEffect is  ', items);
  }, [items]);

  const [items, setItems] = useState([
    {
      id: 1,
      title: '2020',
      selected: false,
      //   onPress: () => {
      //     show?.current?.close();
      //   },
    },
    {
      id: 2,
      title: '2019',
      selected: false,

      //   onPress: () => {
      //     show?.current?.close();
      //   },
    },
    {
      id: 3,
      title: '2018',
      selected: false,

      //   onPress: () => {
      //     show?.current?.close();
      //   },
    },
    {
      id: 4,
      title: '2017',
      selected: false,

      //   onPress: () => {
      //     // show?.current?.close();
      //   },
    },
  ]);

  const onYearPress = id => {
    console.log('enter in year ', id);
    setItems(
      items.map(data => {
        if (data.id === id) {
          return {
            ...data,
            selected: !data?.selected,
          };
        } else {
          return {
            ...data,
            selected: false,
          };
        }
      }),
    );
    console.log('items is  ', items);
  };

  const renderItems = ({item}) => {
    console.log('enter in render Item', item);
    return (
      <TouchableOpacity
        onPress={() => onYearPress(item?.id)}
        style={[
          styles.itemContainer,
          {
            backgroundColor:
              item.selected === true ? colors.blue : colors.white,
          },
        ]}>
        <Text
          style={
            ([styles.itemText],
            {
              color: item.selected === true ? colors.white : colors.light_black,
              fontSize: size.xxlarge,
              fontFamily: family.product_sans_bold,
            })
          }>
          {item?.title}
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
          //   contentContainerStyle={{width: '100%', flex: 1}}
          data={items}
          renderItem={renderItems}
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
