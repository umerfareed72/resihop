import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ScrollView,
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
import {PaymentButtons} from '../../Buttons/Payment/PaymentButtons';

export const DRideFilterModal = ({
  h1,
  h2,
  show,
  onApply,
  time,
  rideType,
  seats,
  onPresstime,
  onPressrideType,
  onPressseats,
  selectedTime,
  selectedSeats,
  selectedRideType,
  onPressReset,
}) => {
  const showTime = data => {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.listh1}>{data?.title}</Text>
        <FlatList
          data={data?.items}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    onPresstime(item);
                  }}
                  style={[
                    styles.listbtnContainer,
                    {
                      backgroundColor:
                        item === selectedTime ? colors.green : colors.g1,
                    },
                  ]}>
                  <Text style={styles.listbtnText}>{item?.text}</Text>
                </TouchableOpacity>
              </>
            );
          }}
        />
      </View>
    );
  };

  const showRideTypes = data => {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.listh1}>{data?.title}</Text>
        <FlatList
          data={data?.items}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    onPressrideType(item);
                  }}
                  style={[
                    styles.listbtnContainer,
                    {
                      backgroundColor:
                        item === selectedRideType ? colors.green : colors.g1,
                    },
                  ]}>
                  <Text style={styles.listbtnText}>{item?.text}</Text>
                </TouchableOpacity>
              </>
            );
          }}
        />
      </View>
    );
  };
  const showSeats = data => {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.listh1}>{data?.title}</Text>
        <FlatList
          data={data?.items}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <>
                <TouchableOpacity
                  style={styles.itemImageContainer}
                  onPress={() => {
                    onPressseats(item);
                  }}>
                  <Image
                    style={[
                      styles.itemImageStyle,
                      {
                        tintColor:
                          item === selectedSeats ? colors.green : colors.blue,
                      },
                    ]}
                    source={item?.icon}
                  />
                </TouchableOpacity>
              </>
            );
          }}
        />
      </View>
    );
  };
  return (
    <RBSheet
      ref={show}
      height={500}
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
        <View style={styles.alignRow}>
          <Text style={styles.h1}>{h1}Filters</Text>
          <TouchableOpacity onPress={onPressReset}>
            <Text style={styles.h2}>{h2}Reset</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 30}}>
          {showTime(time)}
          {showRideTypes(rideType)}
          {showSeats(seats)}

          <View style={{padding: 20}}>
            <PaymentButtons
              onPress={onApply}
              title={'Apply'}
              bgColor={colors.green}
              txtColor={colors.white}
            />
          </View>
        </ScrollView>
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: WP('5'),
  },
  alignRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  h1: {
    fontFamily: family.product_sans_regular,
    fontSize: size.xxlarge,
    color: colors.light_black,
  },
  h2: {
    fontFamily: family.product_sans_regular,
    fontSize: size.xxlarge,
    color: colors.green,
    top: 1,
  },
  listContainer: {
    paddingVertical: 10,
  },
  listh1: {
    fontSize: size.normal,
    color: colors.light_black,
    paddingVertical: 10,
    fontFamily: family.product_sans_regular,
  },
  listbtnContainer: {
    backgroundColor: colors.g1,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  listbtnText: {
    fontFamily: family.product_sans_regular,
    fontSize: size.xsmall,
    color: colors.white,
  },
  itemImageStyle: {
    height: 31,
    width: 24,
    resizeMode: 'contain',
  },
  itemImageContainer: {
    margin: 5,
    padding: 5,
  },
});
